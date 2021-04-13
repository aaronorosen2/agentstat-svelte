<script>
    import BarChart from './BarChart.svelte'
    import {createEventDispatcher} from 'svelte'
    import ReportUtil from '../../lib/report'

    const dispatch = createEventDispatcher()
    let days = ReportUtil.getFilter()

    export let reports

    let selected = reports[0]

    function graphTimeData(report){
        let clnTimeGraph = JSON.parse(JSON.stringify(report.time_graph))
        let res = ReportUtil.fillMissingDates(clnTimeGraph, days)
        let graph = {
            label: 'Views',
            data: res.map(r => r.date_count),
            header: res.map(r => r.date)
        }
        return graph
    }

    function graphTypeData(report){
        let clnTypeGraph = JSON.parse(JSON.stringify(report.type_graph))
        let res = ReportUtil.fillMissingTypes(clnTypeGraph)
        let graph = {
            label: 'Views',
            data: res.map(r => r.type_count),
            header: res.map(r => r.q_type)
        }
        return graph
    }

    function graphPriceData(report){
        let clnPriceGraph = JSON.parse(JSON.stringify(report.price_graph))
        let res = ReportUtil.fillMissingPrices(clnPriceGraph, days)
        let graph = {
            label: 'Views',
            data: res.map(r => r.price_count),
            header: res.map(r => r.q_price_range)
        }
        return graph
    }

    let time_graph
    let type_graph
    let price_graph

    $: if(reports){
        selected = reports[0]
    }

    $: if(selected){
        time_graph = graphTimeData(selected)
        type_graph = graphTypeData(selected)
        price_graph = graphPriceData(selected)
    }

    function selectReport(report){
        selected = report
    }

    function filterReport(e){
        if(days !== e.currentTarget.value){
            days = e.currentTarget.value
            dispatch('filter',days)
        }
    }

</script>

<div class="traffic-report">
    <div class="head">
        <div class="summary">
            {#each reports as report}
                <div class="info" class:selected={report == selected} on:click={()=>selectReport(report)}>
                    {report.name}
                    <h2 class="num">{report.views}</h2>
                </div>
            {/each}
        </div>
        <div class="filter">
            <select value={days} on:blur={filterReport} on:change={filterReport}>
                <option value="6">Last 7 Days</option>
                <option value="29">Last 30 Days</option>
                <option value="this">This Month</option>
                <option value="last">Last Month</option>
                <option value="365">Year To Date</option>
            </select> 
        </div>
    </div>
    {#if selected}
        <div class="stat">
            <div class="location">
                <h2 class="title">
                    Location
                </h2>
                <div class="details">
                    <div>CITY</div>
                    <div>ZIPCODE</div>
                    {#each selected.cities as city}
                        <div>{city.q_city} ({city.region_count}) </div>
                        <div>
                            {#each city.zipcodes as zip}
                                <div>{zip.q_zip} ({zip.zip_count})</div>
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="charts">
                <div>
                    <h3>{selected.name} Over Time</h3>
                    {#if time_graph}
                        <BarChart props={time_graph} />
                    {/if}
                </div>
                <div>
                    <h3>{selected.name} by Property Type</h3>
                    {#if type_graph}
                        <BarChart props={type_graph} />
                    {/if}
                </div>
                <div>
                    <h3>{selected.name} by Price Point</h3>
                    {#if price_graph}
                        <BarChart props={price_graph} />
                    {/if}
                </div>
            </div>
        </div>
    {/if}

</div>

<style src="./report-details.scss"></style>
