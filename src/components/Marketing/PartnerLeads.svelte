<script>
    export let data  = {}
    import {saveMarketingPartner} from '../../lib/api/marketing'
    import {show as showNotif} from '../../stores/notif'
    import Alert from '../Alert/Alert.svelte'

    let saving = false

    async function save(){
        saving = true
        let res = await saveMarketingPartner(data)
        saving = false
        showNotif("Marketing parner leads updated")    
    }
</script>

<div class="leads-form">
    <Alert msg="This is not a contract to buy leads or referrals. This is to notify referring agents and/or companies that you are interested in receiving lead/referrals, and what you are willing to compensate them." />
    <div class="table">
        <div class="head">
            Leads
        </div>
        <div class="head">
            Referals
        </div>
        <div class="body pkgs">
            <div></div>
            <div class="subtitle">Pay per close</div>
            <div class="subtitle">Pay per lead</div>
            <h2 class="m-title">Leads</h2>
            <div class="info">
                <h4>Gold Quality</h4>
                <div>Home owner has interest in selling and has selected you specifically, and want you to call them.
                    <br>
                    Non-forced registration. buyers chose to give their information and were not forced to.
                </div>
            </div>
            <div class="inputs">
                <h5 class="m-subtitle">Pay per close</h5>
                <label>
                    Buyer Lead
                    <input type="number" bind:value={data.lead_ppc_gold_buyer}> <span>%</span>
                </label>
                <label>
                    Seller Lead
                    <input type="number" bind:value={data.lead_ppc_gold_seller}> <span>%</span>
                </label>
            </div>
            <div class="inputs rev">
                <h5 class="m-subtitle">Pay per lead</h5>
                <label>
                    Buyer Lead
                    <span>$</span><input type="number" bind:value={data.lead_ppl_gold_buyer}>
                </label>
                <label>
                    Seller Lead
                    <span>$</span><input type="number" bind:value={data.lead_ppl_gold_seller}>
                </label>
            </div>
            <div class="info">
                <h4>Silver Quality</h4>
                <div>Home owner has interest in selling and has requested that a listing agent contact them.
                    <br>
                    Buyers were doing a search for a home and filled out a form.
                </div>
            </div>
            <div class="inputs">
                <h5 class="m-subtitle">Pay per close</h5>
                <label>
                    Buyer Lead
                    <input type="number" bind:value={data.lead_ppc_silver_buyer}> <span>%</span>
                </label>
                <label>
                    Seller Lead
                    <input type="number" bind:value={data.lead_ppc_silver_seller}> <span>%</span>
                </label>
            </div>
            <div class="inputs rev">
                <h5 class="m-subtitle">Pay per lead</h5>
                <label>
                    Buyer Lead
                    <span>$</span><input type="number"  bind:value={data.lead_ppl_silver_buyer}>
                </label>
                <label>
                    Seller Lead
                    <span>$</span><input type="number" bind:value={data.lead_ppl_silver_seller}>
                </label>
            </div>
            <div class="info">
                <h4>Bronze Quality</h4>
                <div>Home owner may have an interest in selling and has requested a value assessment.
                    <br>
                    Forced registration. buyer were passively looking and forced to fill out a form to view home details.
                </div>
            </div>
            <div class="inputs">
                <h5 class="m-subtitle">Pay per close</h5>
                <label>
                    Buyer Lead
                    <input type="number" bind:value={data.lead_ppc_bronze_buyer}> <span>%</span>
                </label>
                <label>
                    Seller Lead
                    <input type="number" bind:value={data.lead_ppc_bronze_seller}> <span>%</span>
                </label>
            </div>
            <div class="inputs rev">
                <h5 class="m-subtitle">Pay per lead</h5>
                <label>
                    Buyer Lead
                    <span>$</span><input type="number" bind:value={data.lead_ppl_bronze_buyer}>
                </label>
                <label>
                    Seller Lead
                    <span>$</span><input type="number" bind:value={data.lead_ppl_bronze_seller}>
                </label>
            </div>
        </div>
        
        <div class="body referrals">
            <h2 class="m-title border-t">Referrals</h2>
            <div class="subtitle">
                Pay per close
            </div>
            <div class="inputs">
                <h5 class="m-subtitle">Pay per close</h5>
                <label>
                    Buyer Lead
                    <input type="number" bind:value={data.referral_ppc_buyer}> <span>%</span>
                </label>
                <label>
                    Seller Lead
                    <input type="number" bind:value={data.referral_ppc_seller}> <span>%</span>
                </label>
            </div>
        </div>
    </div>
    <div class="control">
        <div class="msg">* This information is NOT displayed on your public profile, and will only be visible to industry professionals.</div>
        <button class="btn" on:click={save} class:disabled={saving}>Make it rain</button>
    </div>

    <div class="check-list">
        <h1>Receive Leads and Referrals</h1>
        <ul class="list">
            <li>
                <i class="fas fa-check-circle"></i>
                Get more referrals. Get more leads.
            </li>
            <li>
                <i class="fas fa-check-circle"></i>
                Stand out as the top referral agent in your city.
            </li>
            <li>
                <i class="fas fa-check-circle"></i>
                For Example:
                <ul class="sublist">
                    <li>
                        <b>- How it works:</b> Referring agents will not only be able to sort and filter by stats, but by the compensation offered. Be at the top of that list.
                    </li>
                    <li>
                        <b>- Need more business?</b> Increase what you are willing to pay to incentivise referring professionals to choose you.
                    </li>
                    <li>
                        <b>- Maximize your referral income</b> Pick the top producing agent that offers the most for your referral! (Coming soon to the Referrals tab)
                    </li>
                    <li>
                        <b>- More leads:</b> Agents, teams, and companies often have excess leads they can't handle. Let them know what you are willing to pay for them.
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>


<style src="./partner-leads.scss"></style>