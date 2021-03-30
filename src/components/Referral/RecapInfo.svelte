<script>
    import { modal } from "../../stores/modal";
    import Agreement from "./Agreement.svelte";


    export let ref
    export let agent
    export let complete

    function info(str){
        if(!str) return ""
        return str.split('\n')[0]
    }

    function next(){
        $modal = {
            show: true,
            cmp: Agreement,
            complete,
            title: 'REFERRAL AGREEMENT',
            props: {
                ref,
                agent
            }
        }
    }
</script>

<div class="recap-info">
    <div class="grid-2">
        <h4>Referral Information</h4>
        <h4>Agent Information</h4>
        <div class="grid-2 border-r">

            <div class="label">Referral Type:</div>
            <div>{ref.type}</div>
            
            <div class="label">First Name:</div>
            <div>{ref.first_name}</div>
            
            <div class="label">Last Name:</div>
            <div>{ref.last_name}</div>
            
            <div class="label">Email:</div>
            <div>{ref.email}</div>
            
            <div class="label">Phone:</div>
            <div>{ref.phone}</div>
            
            <div class="label">Address:</div>
            <div>{ref.street_address}</div>
            
            <div class="label">City:</div>
            <div>{ref.city}</div>
            
            <div class="label">State:</div>
            <div>{ref.state}</div>
            
            <div class="label">Zipcode:</div>
            <div>{ref.zipcode}</div>
            
            <div class="label">Price Min:</div>
            <div>{ref.price_min}</div>
            
            <div class="label">Price Max:</div>
            <div>{ref.price_max}</div>
            
            <div class="label">Referral Fee:</div>
            <div>{ref.referral_fee_percentage} %</div>
            
            <div class="label">Acceptance Deadline:</div>
            <div>{ref.acceptance_deadline_nice}</div>
            
            <div class="label">Notes:</div>
            <div>{ref.notes}</div>

        </div>

        <div class="grid-2">
            
            <div class="label">Agent Name:</div>
            <div>{agent.agent_full_name}</div>
            
            <div class="label">Brokerage Name:</div>
            <div>{info(agent.agent_brokerage_info)}</div>
            
            <div class="label">Overall Success:</div>
            <div>100%</div>
            
            <div class="label">Seattle Success:</div>
            <div>100%</div>

        </div>
    </div>
    <div class="control">
        <button class="btn" on:click={next}>Next</button>
    </div>
</div>

<style src="./recap-info.scss"></style>