<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function save() {
    dispatch("save");
  }
  export let agent;
  export let saving;
  let feeEnabled = !!agent.listing_fee;
  let rebateEnabled = !!agent.buyer_rebate;
  let serviceEnabled = !!agent.type_of_listing_service;

  function initAttr(attr){
      agent[attr] = ""
  }
</script>

<style src="./commission.scss">

</style>

<div class="commission">
  <label>
    <input type="checkbox" bind:checked={feeEnabled} on:click={() => initAttr('listing_fee')} />
    Listing fee
  </label>
  <select disabled={!feeEnabled} bind:value={agent.listing_fee}>
    <option selected disabled value="">Select</option>
    <option value={2}>Case by Case</option>
    <option value={1}>Negotiable</option>
    <option value={6}>Flat Fee</option>
    <option value={13}>1 - 1.5%</option>
    <option value={12}>1.5 - 2%</option>
    <option value={11}>2 - 2.5%</option>
    <option value={10}>2.5 - 3%</option>
    <option value={9}>3 - 3.5%</option>
    <option value={16}>3.5 - 4%</option>
    <option value={8}>4 - 4.5%</option>
    <option value={7}>4.5 - 5%</option>
    <option value={5}>5 - 5.5%</option>
    <option value={4}>5.5 - 6%</option>
    <option value={3}>6% Firm</option>
  </select>

  <label>
    <input
      type="checkbox"
      bind:checked={rebateEnabled} on:click={() => initAttr('buyer_rebate')} />
    Buyer Rebate
  </label>
  <select disabled={!rebateEnabled} bind:value={agent.buyer_rebate}>
    <option selected disabled value="">Select</option>
    <option value={1}>Never</option>
    <option value={2}>Negotiable</option>
    <option value={3}>0.0 - .25 point</option>
    <option value={4}>0.25 - 0.5 point</option>
    <option value={5}>0.5 - 0.75 point</option>
    <option value={6}>0.75 - 1 point</option>
    <option value={7}>Flat rate</option>
  </select>

  <label>
    <input
      type="checkbox"
      bind:checked={serviceEnabled} on:click={() => initAttr('type_of_listing_service')} />
    Type of listing services
  </label>
  <select disabled={!serviceEnabled} bind:value={agent.type_of_listing_service}>
    <option selected disabled value="">Select</option>
    <option value={1}>Full Service</option>
    <option value={2}>Limited Service</option>
    <option value={3}>Both</option>
  </select>

  <label>
    <input type="checkbox" bind:checked={agent.provide_cma} />
    I Provide CMAs
  </label>

  <div class="reverse">
    <button class="btn" class:disabled={saving} on:click={save}>{saving ? 'Saving...':'Save'}</button>
  </div>
</div>
