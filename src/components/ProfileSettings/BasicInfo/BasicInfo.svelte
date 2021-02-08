<script>
    import Tooltip from '../../Tooltip/Tooltip.svelte'
    import UploadImage from '../../UploadImage/UploadImage.svelte'
    import Cropper from 'svelte-easy-crop'

    let pf_img
    let crop = {x: 10, y: 0}
    let zoom = 1
    let cropSize = {width: 200, height: 200 }

    function setPfImg(evt){
        var reader = new FileReader();
        reader.onload = function (e) {
            pf_img = e.target.result;
        };
        reader.readAsDataURL(evt.detail.file);
    }
</script>

<div class="basic-info">
    <div>
        <label>Full Name</label>
        <div class="flex">
            <input class="input" placeholder="First Name" />
            <input class="input" placeholder="Last Name" />
        </div>
    </div>
    <div>
        <label>Phone Number</label>
        <div class="flex">
            <input class="input" name="phone" placeholder="XXX XXX XXXX" />
            <Tooltip>
                This is how other agents, as well as prospective buyers and sellers will be getting a hold of you.
            </Tooltip>
        </div>
    </div>
    <div class="flex items">
        <div class="auto">
            <label>Email</label>
            <input class="input" placeholder="Email" />

            <label>Screen Name</label>
            <input class="input" placeholder="Screen Name" />
            <div class="helper">Profile URL: https://agentstat.com/profile/---</div>
        </div>
        <div>
            {#if pf_img}
                <div class="img-container">
                    <Cropper cropShape="round" showGrid={false} {cropSize}  image={pf_img} bind:crop bind:zoom />
                </div>
            {:else}
                <img src="/images/blank-profile-pic.webp" alt="profile pic" />
            {/if}
        </div>

    </div>

    <div>
        <UploadImage on:input={setPfImg} />
    </div>
    <div class="reverse">
        <button class="btn">Save</button>
    </div>
</div>

<style src="./basic-info.scss"></style>