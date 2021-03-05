import {link} from '../env'
import {currentUser} from './auth'

function getCustomLinkSlug() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('q')) {
        return urlParams.get('q');
    } else {
        let pathname = window.location.pathname;
        let splitPathname = pathname.split('/');
        if (splitPathname[1] == 'profile') {
            return splitPathname[3];
        }
    }
    return '';
}

function mapPriceRange(val) {
    if (val <= 200) {
        return '$0 - 200K';
    } else if (val > 201 && val <= 400) {
        return '$200 - 400K';
    } else if (val > 401 && val <= 600) {
        return '$400 - 600K';
    } else if (val > 601 && val <= 800) {
        return '$600 - 800K';
    } else if (val > 801 && val <= 1000) {
        return '$800K - 1M';
    } else if (val > 1001) {
        return '$1M+';
    }
}

async function saveVisit(data, queryParamsUrl) {
    data['user_agent'] = navigator.userAgent;
    data['url'] = window.location.href;
    data['referrer'] = document.referrer;
    data['email'] = currentUser()?.email;

    if (queryParamsUrl != '') {
        let pageUrl = new URL(queryParamsUrl);
        let min_price = pageUrl.searchParams.get("min_price");
        let max_price = pageUrl.searchParams.get("max_price");
        if (data['q_price_range'] == undefined && min_price != null && max_price != null) {
            let average = (parseInt(min_price.substr(1)) + parseInt(max_price.substr(1)))/2;
            data['q_price_range'] =  mapPriceRange(average);
        } 

        let state = pageUrl.searchParams.get("state");
        if (state != null && state != 'null') {
            data['q_state'] = state;
        }

        let city = pageUrl.searchParams.get("city");
        if (city != null && city != 'null') {
            data['q_city'] = city;
        }

        let zipcode = pageUrl.searchParams.get("zipcode");
        if (zipcode != null && zipcode != 'null') {
            data['q_zip'] = zipcode;
        }
        
        let type = pageUrl.searchParams.get("type");
        if (data['q_type'] == undefined && type != null && type != 'null') {
            data['q_type'] = type;
        }
    }
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    
    await fetch(link('at/'), options).then(res => res.json())
}


export default {
    agentProfileViewTrack(agent_id){
        let data = {
            agent: agent_id,
            page: 'profile'
        }

        var customLink = getCustomLinkSlug();
        if (customLink) {
            data.custom_slug = customLink
        }
        
        saveVisit(data, document.referrer);
    },
    agentProfileImpressionTrack(agent_ids){
        let data = {
            agent_ids,
            page: 'search'
        };

        saveVisit(data, window.location.href);
    },
    saveLeadTracking(res, ifBoth) {
        let data = {
            agent: res.agent,
            q_price_range: res.how_much,
            q_type: res.home_type
        };
    
        let customLink = getCustomLinkSlug();
        if (customLink) {
            data.custom_slug = customLink;
            let contactRequestdata = {
                custom_slug: customLink,
                page: 'lead-request',
                agent: res.agent
            };
            saveVisit(contactRequestdata, document.referrer);
        }
    
        if (res.lead_type == 'selling') {
            data.page = 'seller-lead';
            saveVisit(data, document.referrer);
        } else if (res.lead_type == 'buying') {
            data.page = 'buyer-lead';
            saveVisit(data, document.referrer);
        } else if (res.lead_type == 'both') {
            data.page = 'seller-lead';
            saveVisit(data, document.referrer);
    
            if (ifBoth && res.buying) {
                data.q_price_range = res.buying['how_much'];
                data.q_type = res.buying['home_type'];
                data.page = 'buyer-lead';
                saveVisit(data, document.referrer);
            }
        }
    }
}