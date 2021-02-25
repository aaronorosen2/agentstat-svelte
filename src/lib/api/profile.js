import {link} from '../env'
import { currentUser } from './auth'
// get agent profile
export async function agentProfile(){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`
        }
    }
    return await fetch(link('agent-profile'),options).then(res => res.json())
}

export async function saveProfileSettings(agent){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`
        },
        body: JSON.stringify(agent)
    }
    return await fetch(link('agent-profile/'),options).then(res => res.json())
}


export async function agentReview(id=null){
    const user = currentUser()
    if(!id && (!user || !user.agent_id)) return 
    if(!id){
        id = user.agent_id
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return await fetch(link(`review/${id}/`), options).then(res => res.json())
}

export async function addAgentReview(review){
    const user = currentUser()
    if(!user || !user.agent_id) return 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`
        },
        body: JSON.stringify(review)
    }
    return await fetch(link(`review/${user.agent_id}/`), options).then(res => res.json())
}


export async function syncZillowReview(url){
    const user = currentUser()
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`
        },
        body: JSON.stringify({url})
    }
    return await fetch(link('sync-zillow-review/'), options).then(res => res.json())  
}

export async function checkAgentConnect(url){
    const user = currentUser()
    return await fetch(link(`check-agent-connect/${user.web_agent_id}/`)).then(res => res.json())  
}

export async function fetchInbox(page){
    const user = currentUser()
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`
        }
    }
    return await fetch(link(`leads/?page=${page}`), options).then(res => res.json())  
}

export async function readMessage(id){
    const user = currentUser()
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`
        }
    }
    return await fetch(link(`read-message-status/${id}/`), options).then(res => res.json())  
}

export async function fetchNotifs(){
    const user = currentUser()
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`
        }
    }
    return await fetch(link(`unread-notification/`), options).then(res => res.json())  
}
