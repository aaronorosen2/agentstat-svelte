<script>
    import BarChart from './BarChart.svelte'
    import {trackReport} from '../../lib/api/reports'

    const impressions = {
        label: 'Impressions',
        data: [250, 300, 1050, 600, 1000, 1500, 1700, 2000],
        header: ['01/2020', '02/2020', '03/2020', '04/2020', '05/2020', '06/2020', '07/2020', '08/2020'],
    }

    let filter = {"days":"6","start_date":"2021-02-23","end_date":"2021-03-1"}

    async function fetchReport(){
        let res = await trackReport(filter)
        console.log(res)
    }

    fetchReport()

</script>

<div class="traffic-report">
    <div class="head">
        <div class="summary">
            <div class="info selected">
                Impressions
                <h2 class="num">4</h2>
            </div>
            <div class="info">
                Profile Views
                <h2 class="num">0</h2>
            </div>
        </div>
        <div class="filter">
            <select>
                <option value="6">Last 7 Days</option>
                <option value="29">Last 30 Days</option>
                <option value="this">This Month</option>
                <option value="last">Last Month</option>
                <option value="365">Year To Date</option>
            </select> 
        </div>
    </div>
    <div class="stat">
        <div class="location">
            <h2 class="title">
                Location
            </h2>
            <div class="details">
                <div>CITY</div>
                <div>ZIPCODE</div>
                <div>N/A (4) </div>
                <div>N/A (4) </div>
            </div>
        </div>
        <div class="charts">
            <div>
                <h3>Impressions Over Time</h3>
                <BarChart props={impressions} />
            </div>
            
        </div>
    </div>

</div>

<style src="./traffic-report.scss"></style>
