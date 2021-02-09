<script>
  let feeEnabled = false
  let rebateEnabled = false
  let serviceEnabled = false
  
  function toggleFee(){
      feeEnabled = !feeEnabled
  }

  function toggleRebate(){
      rebateEnabled = !rebateEnabled
  }

  function toggleService(){
      serviceEnabled = !serviceEnabled
  }

</script>

<div class="commission">
  <label>
    <input type="checkbox" on:click={toggleFee} />
    Listing fee
  </label>
  <select disabled={!feeEnabled}>
    <option selected disabled value>Select</option>
    <option value="2">Case by Case</option>
    <option value="1">Negotiable</option>
    <option value="6">Flat Fee</option>
    <option value="13">1 - 1.5%</option>
    <option value="12">1.5 - 2%</option>
    <option value="11">2 - 2.5%</option>
    <option value="10">2.5 - 3%</option>
    <option value="9">3 - 3.5%</option>
    <option value="16">3.5 - 4%</option>
    <option value="8">4 - 4.5%</option>
    <option value="7">4.5 - 5%</option>
    <option value="5">5 - 5.5%</option>
    <option value="4">5.5 - 6%</option>
    <option value="3">6% Firm</option>
  </select>

  <label>
    <input type="checkbox" on:click={toggleRebate} />
    Buyer Rebate
  </label>
  <select disabled={!rebateEnabled}>
    <option selected disabled value>Select</option>
    <option value="1">Never</option>
    <option value="2">Negotiable</option>
    <option value="3">0.0 - .25 point</option>
    <option value="4">0.25 - 0.5 point</option>
    <option value="5">0.5 - 0.75 point</option>
    <option value="6">0.75 - 1 point</option>
    <option value="7">Flat rate</option>
  </select>

  <label>
    <input type="checkbox" on:click={toggleService} />
    Type of listing services
  </label>  
  <select disabled={!serviceEnabled}>
    <option selected disabled value>
      Select
    </option>
    <option value="1">Full Service</option>
    <option value="2">Limited Service</option>
    <option value="3">Both</option>
  </select>

  <label>
    <input type="checkbox" />
    I Provide CMAs
  </label> 

  <div class="reverse">
     <button class="btn">Save</button>
  </div>
</div>


<style src="./commission.scss"></style>