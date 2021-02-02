<script>
    import ButtonSelect from '../ButtonSelect/ButtonSelect.svelte'
    import ContactForm from '../ContactForm/ContactForm.svelte'
    import {submitLead} from '../../lib/api'

    export let agent
    let step = 'looking_for'
    let label = 'contact_agent'
    let contact_step = false
    let complete_steps = false
    let data = {buying: {}, selling: {}, agent: agent.id}


    let labels = {
        contact_agent: 'Contact Agent',
        home_type_to_sell: 'What type of home are you looking to sell?',
        how_much_to_sell: 'How much are you looking to sell for?',
        how_soon_to_sell: 'How soon are you looking to sell?',
        home_type_to_buy: 'What type of home are you looking to buy?',
        how_much_to_buy: 'How much are you looking to spend?',
        how_soon_to_buy: 'How soon are you looking to buy?',
        why_interested: 'Why are you interested in '+agent.full_name+'?',
    }

    let steps = {
        looking_for: ['Sell a Home', 'Buy a Home', 'Both'], 
        home_type: ['Single Family','Condominium','Townhouse','Manufactured','Multi-family','Land'], 
        how_much: ['$0 - 200K','$200 - 400K','$400 - 600K','$600 - 800K','$800K - 1M','$1M+'], 
        how_soon: ['ASAP','6-12 months','1-3 months','12+ months','3-6 months'],
        interest_reason: ['I’m researching agents', `I’m considering working with ${agent.full_name}`,`I have a question for ${agent.full_name}`]
    }

    function bsAttr(attr){
        if(data.looking_for == 'Both'){
            if(data.selling[attr]){
                return 'buy'
            }else{
                return 'sell'
            }
        }else if(data.looking_for == 'Buy a Home'){
            return 'buy'
        }else {
            return 'sell'
        }
    }

    function nextStep(evt){

        label = ''
        switch (step) {
            case 'looking_for':
                step = 'home_type'
                data.looking_for = evt.detail
                
                break;
            case 'home_type':
                step = 'how_much'
                data[bsAttr(step)+'ing'].home_type = evt.detail
                
                break;
            case 'how_much':
                step = 'how_soon'
                data[bsAttr(step)+'ing'].how_much = evt.detail
                break;
            
            case 'how_soon':
                data[bsAttr(step)+'ing'].how_soon = evt.detail
                if(data.looking_for == 'Both' && !Object.keys(data.buying).length){
                    step = 'home_type'
                }else{
                    step = 'interest_reason'
                    label = 'why_interested'
                }
                break;
            
            case 'interest_reason':
                data.interest_reason = evt.detail
                contact_step = true
                break;
        
            default:
                break;
        }

        // set next label
        label = label||`${step}_to_${bsAttr(step)}`

    }

    
    async function submitContact(){
        data.home_type = data.selling.home_type
        data.home_type_buyer = data.buying.home_type
        data.how_much = data.selling.how_much
        data.how_much_buyer = data.buying.how_much
        data.how_soon = data.selling.how_soon
        data.how_soon_buyer = data.buying.how_soon
        data.lead_type = data.looking_for == "Both" ? 'both' : data.looking_for.includes('Buy') ? 'buying' : 'selling'
        // send data to server
        await submitLead(data)
        complete_steps = true
    }
</script>

<div class="contact-lead">
    {#if complete_steps}
        <div class="complete">
            <h2>
                Complete!
            </h2>
            <div>
                {agent.full_name} will contact you shortly :)
            </div>
        </div>
    {:else if !contact_step}
        <ButtonSelect options={steps[step]} label={labels[label]} on:next={nextStep} />
    {:else}
        <ContactForm bind:data on:submit={submitContact} />
    {/if}
</div>

<style src="./contact-lead.scss"></style>