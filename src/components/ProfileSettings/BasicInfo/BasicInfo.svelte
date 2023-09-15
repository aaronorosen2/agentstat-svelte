<script>
    import Tooltip from '../../Tooltip/Tooltip.svelte'
    import UploadImage from '../../UploadImage/UploadImage.svelte'
    import Cropper from 'svelte-easy-crop'
    import {createEventDispatcher} from 'svelte'
    import getCroppedImg from '../../../lib/image'

    export let agent
    export let saving
    const dispatch = createEventDispatcher()

    async function save(){
        if(pf_img){
            agent.picture = await getCroppedImg(pf_img, cropArea)   
            pf_img = null
        }
        dispatch('save')
    }

    let pf_img
    let crop = {x: 10, y: 0}
    let zoom = 1
    let cropSize = {width: 200, height: 200 }
    let cropArea 

    function setCropArea(evt){
        cropArea = evt.detail.pixels
    }

    function setPfImg(evt){
        let reader = new FileReader();
        reader.onload = function (e) {
            pf_img = e.target.result;
        };
        reader.readAsDataURL(evt.detail.file);
    }
</script>

<div class="basic-info">
    <div>
        <label for="Full Name">Full Name</label>
        <div class="flex">
            <input class="input readonly" placeholder="First Name" bind:value={agent.first_name} readonly />
            <input class="input readonly" placeholder="Last Name" bind:value={agent.last_name} readonly />
        </div>
    </div>
    <div>
        <label for="Phone Number">Phone Number</label>
        <div class="flex">
            <input class="input" name="phone" placeholder="XXX XXX XXXX" bind:value={agent.phone_number} />
            <Tooltip>
                This is how other agents, as well as prospective buyers and sellers will be getting a hold of you.
            </Tooltip>
        </div>
    </div>
    <div class="flex items">
        <div class="auto">
            <label for="Email">Email</label>
            <input class="input readonly" placeholder="Email" bind:value={agent.email} readonly />

            <label for="Screen Name">Screen Name</label>
            <input class="input readonly" placeholder="Screen Name" bind:value={agent.screen_name} readonly />
            <div class="helper">Profile URL: https://agentstat.com/profile/{agent.screen_name}</div>
        </div>
        <div>
            {#if pf_img}
                <div class="img-container">
                    <Cropper cropShape="round" on:cropcomplete={setCropArea} showGrid={false} {cropSize}  image={pf_img} bind:crop bind:zoom />
                </div>
            {:else}
                <img src={agent.picture || '/images/blank-profile-pic.webp'} alt="profile pic" />
            {/if}
        </div>

    </div>

    <div>
        <UploadImage on:input={setPfImg} />
    </div>
    <div class="reverse">
        <button class="btn" class:disabled={saving} on:click={save}>{saving ? 'Saving...':'Save'}</button>
    </div>
</div>

<style src="./basic-info.scss"></style>