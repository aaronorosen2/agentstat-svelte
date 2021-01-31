<script>
    import Pagination from '../Pagination/Pagination.svelte'
    import SearchInput from '../SearchInput/SearchInput.svelte'
    import SortIcon from '../Icons/Sort.svelte'
    import Fuse from 'fuse.js'

    export let list // agent_list
    let searchVal

    let filter_list = list
    let limit = 10
    let current = 1
    
    $: offset = (current-1)*limit

    $: transactions = filter_list.slice( offset , offset+limit)

    function currencyFormat(num) {
        if(!num) return '-'
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function dateFormat(str, isFullYear=false) {
        let date = new Date(str);
        let day = date.getDate();
        let month = ("0" + (date.getMonth()+1)).slice(-2);
        let year = (isFullYear==false) ? date.getFullYear().toString().substr(-2) : date.getFullYear().toString();
        return month+'/'+day+'/'+year;
    }

    function arrowStyle(v){
        if (currencyFormat(v['sold_price_int']) >= currencyFormat(v['list_price_int'])) {
            return ' <i class="fas fa-long-arrow-alt-up" style="font-size:18px;color:green"></i>';
        } else {
            return ' <i class="fas fa-long-arrow-alt-down" style="font-size:18px;color:red"></i>';
        }
    }

    function soldPrice(v){
        if (v['status']=='Failed') {
            return '-';
        } else {
            return currencyFormat(v['sold_price_int']) + arrowStyle(v);
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
        home_type: "Home Type"
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

</script>

<div class="transactions">
    <div class="search">
        <h1>All Transactions</h1>
        <div>
            <SearchInput placeholder="Search" bind:value={searchVal} />
        </div>
    </div>
    <table>
        <thead>
            <tr>
                {#each Object.keys(head_values) as k}
                 <th on:click={()=> toggleSort(k)}><div class="flex">{head_values[k]}  <SortIcon selected={sortBy==k ? sortUp ? 'up':'down':false} /></div></th>
                {/each}
               
            </tr>
        </thead>
        <tbody>
            {#each transactions as tr}
                <tr>
                    <td class="status-{tr.status}">{tr.status||''}</td>
                    <td>{currencyFormat(tr.list_price_int)}</td>
                    <td><div class="no-wrap">{@html soldPrice(tr)}</div></td>
                    <td>{tr.days_on_market}</td>
                    <td>{dateFormat(tr.list_date)}</td>
                    <td><div class="no-wrap">{onlyAddress(tr.address_text)}</div></td>
                    <td>{tr.city}</td>
                    <td>{tr.zipcode}</td>
                    <td>{tr.year_built}</td>
                    <td>{homeType(tr)}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="paginate">
        <Pagination perPage={limit} numItems={filter_list.length} bind:current />
    </div>
</div>

<style src="./transaction-table.scss"></style>

