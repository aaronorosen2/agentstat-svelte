<script>
    import UploadImage from '../UploadImage/UploadImage.svelte'
    export let complete = null
    let agent = {
        full_name: '',
        email: '',
        phone: '',
        brokerage_name: '',
        id_picture: '',
        real_estate_license: ''
    }
    let submitting = false
    let error = false
    function submit(){
        error = false
        for(let k in agent){
            if(!agent[k]){
                error = true
                return
            }
        }
        submitting = true
        complete && complete(agent)
    }

    async function getImgB64(file){
        return new Promise(resolve =>{
            let reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        })
    }

    async function setPhotoId(evt){
        agent.id_picture = await getImgB64(evt.detail.file)
    }

    async function setLicense(evt){
        agent.real_estate_license = await getImgB64(evt.detail.file)
    }

</script>

<div class="dispute-form">
    <label for="Full Name">Full Name</label>
    <input class="input" placeholder="Full Name" bind:value={agent.full_name}>
    
    <label for="Email">Email</label>
    <input type="email" class="input" placeholder="Email" bind:value={agent.email}>

    <label for="Phone">Phone</label>
    <input class="input" placeholder="Phone" bind:value={agent.phone}>

    <label for="Brokerage Name">Brokerage Name</label>
    <input class="input" placeholder="Brokerage Name" bind:value={agent.brokerage_name}>
    
    <label for="Photo ID">Photo ID</label>
    <UploadImage on:input={setPhotoId} />

    
    <label for="Real Estate License">Real Estate License</label>
    <UploadImage on:input={setLicense} />
    
</div>
{#if error}
    <div class="error">
        All fields are required
    </div>
{/if}

<div class="center">
    <button class="btn" class:disabled={submitting} on:click={submit}>{submitting ? 'Submitting...' : 'Submit Proof'}</button>
</div>

<style src="./dispute-form.scss"></style>