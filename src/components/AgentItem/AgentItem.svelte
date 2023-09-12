<script>
    export let agent = {};
    import page from "page";
    import {modal} from '../../stores/modal';
    import ConnectWith from "../ConnectWith/ConnectWith.svelte";

    let pinned = false;
    let selected_usernames =
        new URLSearchParams(window.location.search).get("selected_usernames") ==
        undefined
            ? ""
            : new URLSearchParams(window.location.search).get(
                  "selected_usernames"
              );

    let urlParamSelectedUsernames =
        new URLSearchParams(window.location.search).get("selected_usernames") ==
        undefined
            ? ""
            : new URLSearchParams(window.location.search).get(
                  "selected_usernames"
              );
    let usernames =
        urlParamSelectedUsernames == ""
            ? []
            : urlParamSelectedUsernames.split(",");

    if (!usernames.includes(agent.agent_slug)) {
        pinned = false;
    } else {
        pinned = true;
    }

    function round(n) {
        return n == undefined ? 0.0 : n.toFixed(2);
    }

    function xSold(str, prop) {
        if (!str) return 0;
        let arr = JSON.parse(str);
        let n = 0;
        for (let elm of arr) {
            if (elm.includes(prop)) {
                n = Number(elm.split(":")[1]);
                break;
            }
        }
        return n;
    }

    function info(str) {
        if (!str) return "";
        return str.split("\n")[0];
    }

    function linkProfile(name) {
        return `/profile/${name}`;
    }

    function handlePinned(event) {
        if (!pinned && window.confirm("Really Want To Pin?")) {
            console.log(selected_usernames);
            selected_usernames += agent.agent_slug + ",";
            console.log(selected_usernames);
            let u = new URLSearchParams(window.location.search);
            u.set("selected_usernames", selected_usernames);
            window.location.search = u.toString();
            return;
        }
        pinned = !pinned;

        let temp = "";
        let usernames = selected_usernames.split(",");
        usernames.forEach((slug, idx) => {
            if (slug === agent.agent_slug) {
                usernames.splice(idx, 1);
            }
        });

        usernames.forEach((username) => {
            temp += username + ",";
        });

        selected_usernames = temp;

        let u = new URLSearchParams(window.location.search);
        u.set("selected_usernames", selected_usernames);
        window.location.search = u.toString();
    }

    function showConnectWithModal(){
        $modal = {
            show: true,
            cmp: ConnectWith,
            title: `Connect ${agent.agent_full_name}`,
            props: {
                
            }
        }
    }
</script>

<div class="agent">
    <div class="agent-img">
        <img
            alt={agent.agent_full_name}
            src={agent.agent_image == null
                ? "/images/blank-profile-pic.webp"
                : `https://app.realtorstat.com/api/agent/pic/${agent.state}/${agent.agent_image}`}
        />
    </div>

    <div class="agent-body">
        <a href={linkProfile(agent.agent_slug)} class="agent-name">
            {agent.agent_full_name}
            {#if agent.agent_brokerage_info}
                <span class="info">{info(agent.agent_brokerage_info)}</span>
            {/if}
        </a>
        <div class="agent-stat">
            <div class="span-1 label">Overall</div>
            <div class="label">
                {agent.city === undefined || null ? "Default City" : agent.city}
            </div>

            <div class="label">Sold Listings</div>
            <div>
                {agent.overall_sold_listings}
            </div>
            <div>
                {agent.sold_listings}
            </div>

            <div class="label">Failed Listings</div>
            <div>
                {agent.overall_failed_listings}
            </div>
            <div>
                {agent.failed_listings}
            </div>

            <div class="label">Avg Days On Market</div>
            <div>
                {round(agent.overall_avg_dom)}
            </div>
            <div>
                {round(agent.avg_dom)}
            </div>

            <div class="label">Avg List to Sold Price</div>
            <div>
                {round(agent.overall_s2l_price)}
            </div>
            <div>
                {round(agent.s2l_price)}
            </div>

            <div class="label">Single Family Sold</div>
            <div>
                {xSold(
                    agent.overall_listings_breakdown_json,
                    "Single Family Houses sold"
                )}
            </div>
            <div>
                {xSold(
                    agent.listings_breakdown_json,
                    "Single Family Houses sold"
                )}
            </div>

            <div class="label">Condos Sold</div>
            <div>
                {xSold(agent.overall_listings_breakdown_json, "Condos sold")}
            </div>
            <div>
                {xSold(agent.listings_breakdown_json, "Condos sold")}
            </div>
        </div>
    </div>

    <div class="agent-list-right">
        <div class="toggler">
            <label class="switch">
                <input
                    type="checkbox"
                    checked={pinned}
                    on:click|preventDefault={handlePinned}
                />

                <span class="slider round" />
            </label>
            <p>
                {#if !pinned}
                    Tap to Pin
                {:else}
                    Unpin
                {/if}
            </p>
        </div>

        <div class="agent-control">
            <div class="connect" on:click={showConnectWithModal}>
                <div role="button" class="button">
                    Connect with {agent.agent_full_name}
                </div>
            </div>
        </div>
    </div>
</div>

<style src="./agent-item.scss"></style>
