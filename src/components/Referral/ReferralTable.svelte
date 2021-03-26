<script>
    import util from "../../lib/util";


    export let referrals = []
</script>


<div class="referral">
    <table>
        <thead>
            <tr>
                <th>Referral Agreement</th>
                <th>Date</th>
                <th>Type</th>
                <th>Referral Name</th>
                <th>Agent Name</th>
                <th>Referral Fee</th>
                <th>Price</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {#each referrals as ref}
                <tr>
                    <td><i class="icon fas fa-file-download"></i> </td>
                    <td>{util.niceDate(ref.created_at)}</td>
                    <td>{ref.referral_type}</td>
                    <td>{ref.first_name} {ref.last_name}</td>
                    <td><a href="/profile/{ref.agent_obj.screen_name}" target="_blank">{ref.agent_obj.name}</a></td>
                    <td>{ref.referral_fee_percentage} %</td>
                    <td>{util.currencyFormat(ref.price_min)} - {util.currencyFormat(ref.price_max)}</td>
                    <td>{ref.status}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style src="./referral-table.scss"></style>