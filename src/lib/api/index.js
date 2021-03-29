import {link} from '../env'
import { currentUser, setUser } from './auth'
import Tracker from './tracker'

function uparam(attr, val, andPre= true){
    if(!val) return ""
    return `${andPre ? '&':''}${attr}=${val}`
}

export async function fetchStates(){
    let states = await fetch(link('states')).then(res => res.json())
    let listStates = []
    for(let k in states){
        listStates.push({label: states[k], value: k})
    }
    return listStates
}

export function getAgentUrlParams(filter){
    return uparam('home_type',filter.home_type, false)+
    uparam('filter_by',filter.filter_by)+
    uparam('city',filter.city)+
    uparam('address',filter.street_address||filter.address)+
    uparam('state',filter.state)+
    uparam('agent_name',filter.agent_name)+
    uparam('page',filter.page)+
    uparam('check_claimed',filter.check_claimed)
}

export async function fetchAgents(filter, track=true){
    let url = link(
        `reports/${filter.state||'CA'}?`+
        getAgentUrlParams(filter)
    )
        
    let res = await fetch(url).then(res => res.json())
    if(res && res.results && track)
        Tracker.agentProfileImpressionTrack(res.results.map(r => r.agent_id))
    return res
}

export async function claimAgent(agent_id){
    const user = currentUser()
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`
        },
        body: JSON.stringify({agent_id})
    }
    let res =  await fetch(link('claim/'), options).then(res => res.json())
    if(res.status == "success"){
        user.agent_id = agent_id
        setUser(user)
        return true
    }
    
    return false
    
}

export async function newAgentProfile(agent){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(agent)
    }
    return await fetch(link('agent-request/'), options).then(res => res.json())
}

export async function reClaimAgent(agent){
    const user = currentUser()
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(agent)
    }
    return await fetch(link('re-claim/'), options).then(res => res.json())
    
}

export async function agentDetails(name){
    let res = await fetch(link('agents/'+name)).then(res => res.json())
    if(res)
        Tracker.agentProfileViewTrack(res.id)
    return res
}

export async function agentScores(name, duration=36){
    return await fetch(link(`agent_scores/${name}/?time_duration=${duration}`)).then(res => res.json())
}

export async function agentCustomLink(name, custom){
    return await fetch(link(`custom-link/${name}/${custom}`)).then(res => res.json())
}

export async function submitLead(data){
    let res =  await fetch(link('lead/'), {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST', 
        body: JSON.stringify(data)
    }).then(res => res.json())

    // track lead
    if(res){
        let ifBoth = data.looking_for == 'Both'
        Tracker.saveLeadTracking(data, ifBoth)
    }
    return res
}
