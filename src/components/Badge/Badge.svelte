<script>
    export let badge;
</script>

<div class="badge">
    <svg viewBox="0 0 210 210">
        <g stroke="none" fill="none">
            <path d="M22,104.5 C22,58.9365081 58.9365081,22 104.5,22 C150.063492,22 187,58.9365081 187,104.5" id="top"></path>
            <path d="M22,104.5 C22,150.063492 58.9365081,187 104.5,187 C150.063492,187 187,150.063492 187,104.5" id="bottom"></path>
        </g>
				<circle cx="105" cy="105" r="62" stroke="currentColor" stroke-width="1" fill="none" />
        <text width="200" font-size="20" fill="currentColor">
            <textPath startOffset="50%" text-anchor="middle" alignment-baseline="middle" xlink:href="#top">
                Agentstat
            </textPath>
        </text>
        <text width="200" font-size="20" fill="currentColor">
            <textPath startOffset="50%" text-anchor="middle" alignment-baseline="middle" xlink:href="#bottom">
                {badge.city}
            </textPath>
        </text>
    </svg>
    <span>Top {badge.agent_percentage} %</span>
</div>


<style src="./badge.scss"></style>
