<script>

    import Util from '../../lib/util'
    import {marketingCustomLinks, deleteCustomLink} from '../../lib/api/marketing'
    import CustomLinkForm from './CustomLinkForm.svelte'
    import Pagination from '../Pagination/Pagination.svelte'
    import {modal} from '../../stores/modal'
    export let customLinks = {custom_links: []}
    export let cities = []
    
    let limit = 10
    let current = 1
    $: offset = (current-1)*limit

    $: links = customLinks.custom_links.slice(offset, offset+limit)

    const prefix = `/profile/${customLinks.agent_screen_name}`

    function link(cl){
        return `${prefix}/${cl.slug}`
    }

    let newLink = {
        street_address: '',
        property_type: '',
        address_city: '',
        address_zipcode: ''
    }

    async function reloadList(){
        customLinks = await marketingCustomLinks()
    }

    function showForm(){
        $modal = {
            show: true,
            cmp: CustomLinkForm,
            complete: (data) => reloadList(),
            title: 'Create your custom profile link',
            props: {
                cities,
                data: newLink,
                prefix
            }
        }
    }

    async function remove(id){
        if(confirm('Are you sure you want to delete this link ?')){
            await deleteCustomLink(id)
            reloadList()
        }
    }

    function addr(cl){
       return `${cl.street_address} ${cl.address_city} ${cl.address_zipcode} ${cl.property_type}`.trim().replace(/\s\s/g,' ').split(' ').join(', ')
    }

</script>

<div class="landing-pages">
    <div class="container">
        <div class="link" on:click={showForm}>+ Create your custom profile link</div>
        <table>
            <thead>
                <tr>
                    <th>
                        Creation Date
                    </th>
                    <th>
                        Link
                    </th>
                    <th>
                        Filters
                    </th>
                    <th>
                        Views
                    </th>
                    <th>
                        Contact Resquests
                    </th>
                    <th>
                        Unique Visitors
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each links as cl}
                    <tr>
                        <td>{Util.niceDate(cl.created_at)}</td>
                        <td><a target="_blank" href={link(cl)}>https://agentstat.com{link(cl)}</a></td>
                        <td>{addr(cl)}</td>
                        <td>{cl.total_view}</td>
                        <td>{cl.contact_request}</td>
                        <td>{cl.unique_visitor}</td>
                        <td><div role="button" class="link red" on:click={() => remove(cl.id)}>Delete</div></td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <div class="paginate">
            {#if customLinks.custom_links.length>limit}
                <Pagination perPage={limit} numItems={customLinks.custom_links.length} bind:current />
            {/if}
        </div>
    </div>

    <div class="check-list">
        <h1>Create Unique Landing Pages</h1>
        <ul class="list">
            <li>
                <i class="fas fa-check-circle"></i>
                 Win more listings
            </li>
            <li>
                <i class="fas fa-check-circle"></i>
                Showcase your strengths against your competitors
            </li>
            <li>
                <i class="fas fa-check-circle"></i>
                Here are some examples:
                <ul class="sublist">
                    <li>
                        <b>- Listing Appointments:</b> Enter the listing address, and win your listing appointment by showcasing your results vs your competition.
                    </li>
                    <li>
                        <b>- Generate Listing Leads: </b> Target traffic for a specific location by driving them to a unique landing page that showcases your dominance in that area.
                    </li>
                    <li>
                        <b>- Tracking!</b> Each link automatically tracks the number of views, unique visitors, and even contact requests (leads) that come from each one!
                    </li>
                    <li>
                        <b>- It's all free!</b> Agentstat does not take any fees, charges or commissions from leads that you generate from these links.
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>




<style src="./landing-pages.scss"></style>