<script>
    import UploadImage from '../UploadImage/UploadImage.svelte'
    export let complete = null
    let agent = {}
    function submit(){
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
    <label>Full Name</label>
    <input class="input" placeholder="Full Name" bind:value={agent.full_name}>
    
    <label>Email</label>
    <input type="email" class="input" placeholder="Email" bind:value={agent.email}>

    <label>Phone</label>
    <input class="input" placeholder="Phone" bind:value={agent.phone}>

    <label>Brokerage Name</label>
    <input class="input" placeholder="Brokerage Name" bind:value={agent.brokerage_name}>
    
    <label>Photo ID</label>
    <UploadImage on:input={setPhotoId} />

    
    <label>Real Estate License</label>
    <UploadImage on:input={setLicense} />
    
</div>

<button class="btn" on:click={submit}>Submit Proof</button>

<style src="./dispute-form.scss"></style>