<script>
    import { currentAgentDetails } from "../../lib/api/profile";
    import util from "../../lib/util";
    import SignaturePad from 'signature_pad'

    export let ref
    export let agent
    let signing = false
    let canvas
    let signaturePad
    let signatureImg

    ref.full_name = ref.first_name+' '+ref.last_name

    let c_agent = {}

    function info(str){
        if(!str) return ""
        return str.split('\n')[0]
    }

    async function setCurrentAgent(){
        c_agent = await currentAgentDetails()
    }

    function submit(){

    }

    function setCanvas(node){
        canvas = node 
        signaturePad = new SignaturePad(canvas);
    }

    function openToSign(){
        signing = true
    }

    function closeSign(){
        signing = false
    }

    function clearSign(){
        signaturePad.clear()
    }

    function sign(){
        console.log("is empty --> ",signaturePad.isEmpty())
        signatureImg = signaturePad.toDataURL();
        console.log(signatureImg)
        signing = false
    }

    setCurrentAgent()
</script>

<div class="agreement">
    <div class="flex">
        <div>Date:</div>
        <div class="holder">{util.niceDate()}</div>
    </div>
    <div class="title">REFEERAL FEE STRUCTURE:</div>
    <div class="flex">
        <input class="holder sm" type="text" bind:value={ref.referral_fee_percentage}>
        <div>% of Listing Firm Commission</div>
    </div>

    <div class="flex">
        <div class="holder sm"></div>
        <div>% of Selling Firm Commission</div>
    </div>

    <div class="title">REFEERING FIRM:</div>
    
    <div class="flex">
        <div>Broker Name:</div>
        <div class="holder auto">{info(c_agent.brokerage_info)}</div>
    </div>

    <div class="flex">
        <div>Address:</div>
        <div class="holder auto">{c_agent.street_address}, {c_agent.city}, {c_agent.state}, {c_agent.zip_code}</div>
    </div>

    <div class="flex">
        <div>Phone:</div>
        <div class="holder auto">{c_agent.agent_cell_phone}</div>
        <div>Email:</div>
        <div class="holder auto">{c_agent.profile_email||''}</div>
    </div>
        
    <div class="title">DESTINATION FIRM:</div>
    
    <div class="flex">
        <div>Broker Name:</div>
        <div class="holder auto">{info(agent.agent_brokerage_info)}</div>
    </div>    

    <div class="flex">
        <div>Address:</div>
        <div class="holder auto">{agent.agent_street_address}, {agent.agent_city}, {agent.agent_state}, {agent.agent_zip_code}</div>
    </div>

    <div class="flex">
        <div>Phone:</div>
        <div class="holder auto">{agent.agent_cell_phone}</div>
        <div>Email:</div>
        <div class="holder auto">{agent.agent_email||''}</div>
    </div>


    <div class="flex">
        <div class="title">PROSPECT INFORMATION:</div>
        <label class="ml flex">
            <input type="radio" bind:group={ref.type} value="seller">
            Seller
        </label>
        <label class="flex">
            <input type="radio" bind:group={ref.type} value="buyer">
            Buyer
        </label>
    </div>

    <div class="flex">
        <div>Name:</div>
        <input class="holder auto" type="text" bind:value={ref.full_name}>
    </div>

    <div class="flex">
        <div>Address:</div>
        <input class="holder auto" type="text" bind:value={ref.street_address}>
    </div>

    <div class="flex">
        <div>Phone:</div>
        <input class="holder auto" type="text" bind:value={ref.phone}>
        <div>Email:</div>
        <input class="holder auto" type="text" bind:value={ref.email}>
    </div>

    <div class="label">Comment</div>
    <textarea rows="3" placeholder="Write a message" bind:value={ref.notes}></textarea>

    <div class="title">TERMS OF REFERRAL:</div>
    <div>
        The Destination Firm accepts this referral. If within
    </div>

    <div>
        <select class="inline" bind:value={ref.acceptance_deadline}>
            <option value={1}>1 hour</option>
            <option value={3}>3 hours</option>
            <option value={6}>6 hours</option>
            <option value={12}>12 hours</option>
            <option value={24}>24 hours</option>
            <option value={48}>48 hours</option>
            <option value={72}>3 days</option>
            <option value={168}>7 days</option>
        </select>
        (if not filled in) of the date of this agreement, the Destination Firm receives a commission due to services provided to the prospect, Destination Firm agrees to send the Referring Firm
        <input class="inline sm" type="text" bind:value={ref.referral_fee_percentage}>
        % (of the gross commission)as a referral fee, and include commission details with the check.
    </div>


    <div class="signatures">
        <div on:click={openToSign}>
            <div>Click to sign</div>
            {#if signatureImg}
                <img src={signatureImg} alt="signature">
            {/if}
            <div class="info">Referring Firm (Signature)</div>
        </div>
        <div>
            <div>Click to sign</div>
            <div class="info">Destination Firm (Signature)</div>
        </div>
    </div>

    <div class="control">
        <button class="btn" on:click={submit}>Submit</button>
    </div>
</div>

{#if signing}
    <div class="sign"> 
        <div class="container">
            <div class="head">Draw Signature
                <i class="fas fa-times" on:click={closeSign}></i>
            </div>
            <div class="body">
                <canvas use:setCanvas></canvas>
            </div>
            <div class="footer">
                <button class="btn" on:click={sign}>Sign</button>
                <button class="btn" on:click={clearSign}>Clear</button>
            </div>
        </div>
    </div>
{/if}


<style src="./agreement.scss"></style>