<script>
    import { currentAgentDetails } from "../../lib/api/profile";
    import util from "../../lib/util";
    import SignaturePad from 'signature_pad'
    import { saveReferral } from '../../lib/api/referral'
    import { currentUser } from "../../lib/api/auth";

    export let ref
    export let agent
    export let complete
    export let receiver = false
    let submitting = false
    let signing = false
    let canvas
    let signaturePad
    let signatureImg
    let error;
    ref.full_name = ref.first_name+' '+ref.last_name

    if(receiver){
        ref.type = ref.referral_type
    }

    let c_agent = {}

    function info(str){
        if(!str) return ""
        return str.split('\n')[0]
    }

    async function setCurrentAgent(){
        c_agent = await currentAgentDetails()
    }

    async function submit(){
        error = false
        if(!signatureImg){
            error = true
            return
        }
        submitting = true
        if(!receiver){
            let refObj = {...ref, 
                address: ref.street_address,
                referral_fee_percentage: String(ref.referral_fee_percentage),
                sender_sign_img: signatureImg,
                owner: String(currentUser().profile_id),
                phone_number: ref.phone,
                referral_type: ref.type,
                sender_agent: String(currentUser().agent_id),
                agent: String(agent.agent_id)
            }
            
            await saveReferral(refObj)
        }else{
            ref.receiver_sign_img = signatureImg
        }
        complete && complete(ref)
    }

    function setCanvas(node){
        canvas = node 
        signaturePad = new SignaturePad(canvas);
    }

    function openToSign(agt){
        signing = (agt == 'receiver' && receiver) || (agt == 'sender' && !receiver)
    }

    function closeSign(){
        signing = false
    }

    function clearSign(){
        signaturePad.clear()
    }

    function sign(){
        signatureImg = signaturePad.toDataURL();
        signing = false
    }

    function deadlineTxt(n){
        if(n<24){
            return n+ ' hours'
        }
        return (n/24)+' Days'
    }

    function handleKeyDown() {}

    setCurrentAgent()
</script>

<div class="agreement">
    <div class="flex">
        <div>Date:</div>
        <div class="holder">{util.niceDate()}</div>
    </div>
    <div class="title">REFEERAL FEE STRUCTURE:</div>
    <div class="flex">
        {#if ref.type == 'seller'}
            {#if receiver}
                <div class="holder sm">{ref.referral_fee_percentage}</div>
            {:else}
                <input class="holder sm" type="text" bind:value={ref.referral_fee_percentage}>
            {/if}
        {:else}
            <div class="holder sm"></div>
        {/if}
        <div>% of Listing Firm Commission</div>
    </div>

    <div class="flex">
        {#if ref.type == 'buyer'}
            {#if receiver}
                <div class="holder sm">{ref.referral_fee_percentage}</div>
            {:else}
                <input class="holder sm" type="text" bind:value={ref.referral_fee_percentage}>
            {/if}
        {:else}
            <div class="holder sm"></div>
        {/if}
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
        <div class="flex no-wrap">
            <div>Phone:</div>
            <div class="holder auto">{c_agent.agent_cell_phone}</div>
        </div>
        <div class="flex no-wrap">
            <div>Email:</div>
            <div class="holder auto">{c_agent.profile_email||''}</div>
        </div>
    </div>
        
    <div class="title">DESTINATION FIRM:</div>
    
    <div class="flex">
        <div>Broker Name:</div>
        <div class="holder auto">{info(agent.agent_brokerage_info)||agent.name}</div>
    </div>    

    <div class="flex">
        <div>Address:</div>
        <div class="holder auto">
            {agent.address || `${agent.agent_street_address}, ${agent.agent_city}, ${agent.agent_state}, ${agent.agent_zip_code}`}
        </div>
        
    </div>

    <div class="flex">
        <div class="flex no-wrap">
            <div>Phone:</div>
            <div class="holder auto">{agent.agent_cell_phone||agent.phone}</div>
        </div>
        <div class="flex no-wrap">
            <div>Email:</div>
            <div class="holder auto">{agent.agent_email||agent.profile_email||''}</div>
        </div>
    </div>


    <div class="flex">
        <div class="title">PROSPECT INFORMATION:</div>
        <label class="ml flex">
            <input disabled={receiver&&ref.type=='buyer'} type="radio" bind:group={ref.type} value="seller">
            Seller
        </label>
        <label class="flex">
            <input disabled={receiver&&ref.type=='seller'} type="radio" bind:group={ref.type} value="buyer">
            Buyer
        </label>
    </div>

    <div class="flex">
        <div>Name:</div>
        {#if receiver}
            <div class="holder auto">{ref.full_name}</div>
        {:else}
            <input class="holder auto" type="text" bind:value={ref.full_name}>
        {/if}
    </div>

    <div class="flex">
        <div>Address:</div>
        <div class="holder auto">
            {`${ref.street_address||ref.address}, ${ref.city}, ${ref.state}, ${ref.zipcode}`}
        </div>
    </div>

    <div class="flex">
        <div class="flex no-wrap">
            <div>Phone:</div>
            {#if receiver}
                <div class="holder auto">{ref.phone_number}</div>
            {:else}
                <input class="holder auto" type="text" bind:value={ref.phone}>
            {/if}
        </div>
        <div class="flex no-wrap">
            <div>Email:</div>
            {#if receiver}
                <div class="holder auto">{ref.email}</div>
            {:else}
                <input class="holder auto" type="text" bind:value={ref.email}>
            {/if}
        </div>
    </div>

    <div class="label">Comment</div>
    <textarea readonly={receiver} class:white={receiver} rows="3" placeholder="Write a message" bind:value={ref.notes}></textarea>

    <div class="title">TERMS OF REFERRAL:</div>
    <div class="lh-2">
        The Destination Firm accepts this referral. If within
    </div>

    <div class="lh-2">
        {#if receiver}
            <div class="holder inline">{deadlineTxt(ref.acceptance_deadline)}</div>
        {:else}
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
        {/if}
        (if not filled in) of the date of this agreement, the Destination Firm receives a commission due to services provided to the prospect, Destination Firm agrees to send the Referring Firm
        {#if receiver}
            <div class="holder sm inline">{ref.referral_fee_percentage}</div>
        {:else}
            <input class="inline sm" type="text" bind:value={ref.referral_fee_percentage}>
        {/if}
        % (of the gross commission)as a referral fee, and include commission details with the check.
    </div>


    <div class="signatures">
        <div on:click={() => openToSign('sender')} on:keydown={handleKeyDown}>
            <div>Click to sign</div>
            {#if signatureImg || ref.sender_sign_img}
                <img src={(!receiver && signatureImg)||ref.sender_sign_img} alt="signature">
            {/if}
            <div class="info">Referring Firm (Signature)</div>
        </div>
        <div on:click={() => openToSign('receiver')} on:keydown={handleKeyDown}>
            <div>Click to sign</div>
            {#if receiver && signatureImg}
                <img src={signatureImg} alt="signature">
            {/if}
            <div class="info">Destination Firm (Signature)</div>
        </div>
    </div>

    {#if error}
        <div class="error">You need to sign before submitting</div>
    {/if}
    <div class="control">
        <button class="btn" class:disabled={submitting} on:click={submit}>Submit{submitting ? 'ting ...':''}</button>
    </div>
</div>

{#if signing}
    <div class="sign"> 
        <div class="container">
            <div class="head">Draw Signature
                <i class="fas fa-times" on:click={closeSign} on:keydown={handleKeyDown}></i>
            </div>
            <div class="body">
                <canvas use:setCanvas></canvas>
            </div>
            <div class="footer">
                <button class="btn green" on:click={sign}>Sign</button>
                <button class="btn red" on:click={clearSign}>Clear</button>
            </div>
        </div>
    </div>
{/if}


<style src="./agreement.scss"></style>