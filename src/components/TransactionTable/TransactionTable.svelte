<script>
    import Pagination from '../Pagination/Pagination.svelte'
    import SearchInput from '../SearchInput/SearchInput.svelte'
    import SortIcon from '../Icons/Sort.svelte'
    import TransactionForm from './TransactionForm.svelte'
    import Fuse from 'fuse.js'
    import {saveTransactionNote, salesTransactions} from '../../lib/api/sales'
    import {currentUser} from '../../lib/api/auth'
    import {show as showNotif} from '../../stores/notif'
    import {modal} from '../../stores/modal'
    import util from '../../lib/util';
    export let editable = false
    export let list // agent_list
    export let active = false
    export let noDetails = false
    export let noNote = false
    let searchVal

    let filter_list = list
    let limit = 10
    let current = 1
    
    $: offset = (current-1)*limit

    $: transactions = filter_list.slice( offset , offset+limit)

    // --- EDITABLE -- 
    let saving = false
    async function saveNote(tr){
        if(saving) return
        saving = true
        await saveTransactionNote({
            agent_list: String(tr.id),
            agent_profile_id: String(currentUser().profile_id),
            note: tr.note
        })
        saving = false
        showNotif("Transaction Note Updated") 

    }

    async function getTransactions(data){
        showNotif(`Transaction ${data.new ? 'Created': 'Updated'} Successfully`)
        $modal = {show: false}
        const transaction = await salesTransactions()
        filter_list = transaction.agent_lists
    }

    function reloadList(data){
        getTransactions(data)
    }

    function addTransaction(){
        $modal = {
            show: true,
            cmp: TransactionForm,
            complete: (data) => reloadList(data),
            title: 'Add Transaction',
            props: {
            }
        }
    }
    
    function editTransaction(){
        $modal = {
            show: true,
            cmp: TransactionForm,
            complete: (data) => reloadList(data),
            title: 'Edit Transaction',
            props: {tr: {...selected}}
        }
    }

    // END EDITABLE
    

    function dateFormat(str, isFullYear=false) {
        let date = new Date(str);
        let day = date.getDate();
        let month = ("0" + (date.getMonth()+1)).slice(-2);
        let year = (isFullYear==false) ? date.getFullYear().toString().substr(-2) : date.getFullYear().toString();
        return month+'/'+day+'/'+year;
    }

    function arrowStyle(v){
        if (util.currencyFormat(v['sold_price_int']) >= util.currencyFormat(v['list_price_int'])) {
            return ' <i class="fas fa-long-arrow-alt-up" style="font-size:18px;color:green"></i>';
        } else {
            return ' <i class="fas fa-long-arrow-alt-down" style="font-size:18px;color:red"></i>';
        }
    }

    function soldPrice(v){
        if (v['status']=='Failed') {
            return '-';
        } else {
            return util.currencyFormat(v['sold_price_int']) + arrowStyle(v);
        }
    }

    function onlyAddress(address) {
        return address.split(',')[0];
    }


    function homeType(v){
        if(!v.home_type) return ''
        return v.home_type.replace('_',' ').toLowerCase().replace(/(^.)/, (a,b) => b.toUpperCase())
    }

    const head_values = {
        status: "Status", 
        list_price_int: "List Price",
        sold_price_int: "Sold Price",
        days_on_market: "Days on Market",
        list_date: "List Date",
        address_text: "Address",
        city: "City",
        zipcode: "Zip",
        year_built: "Built",
        home_type: "Home Type",
        notes: "Notes"
    }

    const fuse = new Fuse(list, {
        keys: Object.keys(head_values)
    })

    let lsearchVal
    $:if(lsearchVal!=searchVal){
        if(searchVal ){
            filter_list = fuse.search(searchVal).map(r => r.item)
            sortBy = null
            current = 1
        }else{
            filter_list = [...list]
        }
        lsearchVal = searchVal
    }

    let sortUp = true
    let sortBy
    function toggleSort(sby){
        if(sby == sortBy){
            sortUp = !sortUp
            return
        }
        sortBy = sby
        sortUp = true
    }

    $: if(sortBy){
        filter_list = filter_list.sort((a,b) => a[sortBy]==b[sortBy] ? 0 : a[sortBy]>b[sortBy] ? (sortUp&&1)||-1 : (sortUp&&-1)||1)
    }

    let selected 

    function select(tr){
        if(selected == tr){
            selected = null
            return 
        }
        selected = tr
    }

    function unselect(){
        selected = null
    }

    function handleKeyDown() {}
</script>

<div class="transactions">
    <div class="search">
        {#if editable}
            <div class="link" on:click={addTransaction} on:keydown={handleKeyDown}>+ Add transaction</div>
        {:else}
            <h1>All Transactions</h1>
        {/if}
        <div class="input">
            <SearchInput placeholder="Search" bind:value={searchVal} />
        </div>
    </div>
    <div class="container">
        <table>
            <thead>
                <tr>
                    {#each Object.keys(head_values) as k}
                        {#if k == 'notes' && noNote}
                            <th></th>
                        {:else}
                            <th on:click={()=> toggleSort(k)}><div class="flex">{head_values[k]}  <SortIcon selected={sortBy==k ? sortUp ? 'up':'down':false} /></div></th>
                        {/if}
                    {/each}
                
                </tr>
            </thead>
            <tbody>
                {#each transactions as tr}
                    <tr on:click={() => select(tr)}>
                        <td class="status-{tr.status}">{active ? 'Active' : tr.status||''}</td>
                        <td>{util.currencyFormat(tr.list_price_int)}</td>
                        <td><div class="no-wrap">{@html soldPrice(tr)}</div></td>
                        <td>{tr.days_on_market||''}</td>
                        <td>{dateFormat(tr.list_date)}</td>
                        <td><div class="no-wrap">{onlyAddress(tr.address_text)}</div></td>
                        <td>{tr.city||''}</td>
                        <td>{tr.zipcode||''}</td>
                        <td>{tr.year_built||''}</td>
                        <td>{homeType(tr)||''}</td>
                        <td>
                            {#if tr.note && !editable}
                                <i class="icon far fa-sticky-note"></i>
                            {/if}
                            {#if editable}
                                {#if tr.note}
                                    <div role="button" class="btn btn-yellow"> 
                                        <i class="fas fa-edit"></i>
                                        Edit note
                                    </div>
                                {:else}
                                    <div role="button" class="btn">
                                        <i class="fas fa-plus"></i>
                                        Add note
                                    </div>
                                {/if}
                            {/if}
                            {#if tr.zpid}
                                <a href="/property-detail/{tr.zpid}" target="_blank">Details</a>
                            {/if}
                        </td>
                    </tr>
                    {#if selected == tr && !noDetails}
                        <tr>
                            <td class="no-p" colspan="11">
                                <div class="details">
                                    <i class="fas fa-times close" on:click={unselect} on:keydown={handleKeyDown}></i>
                                    {#if editable}
                                        <button class="btn" class:disabled={saving} on:click={() => saveNote(tr)}>Save</button>
                                        <textarea bind:value={tr.note} placeholder="Type your note" rows="5"></textarea>
                                    {:else}
                                        {#if tr.note}
                                            <p class="note">
                                                <b>Note:</b> {tr.note}
                                            </p>
                                        {/if}
                                    {/if}
                                    <div class="title">
                                        {tr.address_text}
                                        {#if editable}
                                            <button class="btn" on:click={editTransaction}>Edit</button>
                                        {/if}
                                    </div>
                                    <div class="flex">
                                        <div class="flex">
                                            <div >
                                                <div class="subtitle mb">Listed:</div>
                                                <div>{dateFormat(tr.list_date)}</div>
                                                <div>{util.currencyFormat(tr.list_price_int)}</div>
                                                <div class="elm">
                                                    <span class="subtitle">Days on Market:</span>
                                                    {tr.days_on_market}
                                                </div>
                                                <div class="elm">
                                                    <span class="subtitle">List to Sell Ratio:</span>
                                                    100% 
                                                </div>
                                            </div>
                                            <div>
                                                <div class="subtitle mb">Sold: </div>
                                                <div>{dateFormat(tr.sold_date)}</div>
                                                <div>{util.currencyFormat(tr.sold_price_int)}</div>
                                            </div>
                                        </div>
                                        <div class="grid">
                                            <div class="subtitle">Type</div>
                                            <div>{homeType(tr)}</div>
                                            <div class="subtitle">Heating</div>
                                            <div>{tr.heating||'None'}</div>
                                            <div class="subtitle">Beds</div>
                                            <div>{tr.beds||'None'}</div>
                                            <div class="subtitle">Cooling</div>
                                            <div>{tr.cooling||'None'}</div>
                                            <div class="subtitle">Baths</div>
                                            <div>{tr.baths||'None'}</div>
                                            <div class="subtitle">Parking</div>
                                            <div>{tr.parking||'None'}</div>
                                            <div class="subtitle">Sqft</div>
                                            <div>{tr.sqft||'None'}</div>
                                            <div class="subtitle">Basement</div>
                                            <div>{tr.basement||'None'}</div>
                                            <div class="subtitle">Lot</div>
                                            <div>{tr.lot||'None'}</div>
                                            <div class="subtitle">Flooring</div>
                                            <div>{tr.flooring||'None'}</div>
                                            <div class="subtitle">Year Built</div>
                                            <div>{tr.year_built||'None'}</div>
                                            <div class="subtitle">Roof</div>
                                            <div>{tr.roof||'None'}</div>
                                            <div class="subtitle">County</div>
                                            <div>{tr.county||'None'}</div>
                                            <div class="subtitle">Foundation</div>
                                            <div>{tr.foundation||'None'}</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
    <div class="paginate">
        <Pagination perPage={limit} numItems={filter_list.length} bind:current />
    </div>
</div>

<style src="./transaction-table.scss"></style>

