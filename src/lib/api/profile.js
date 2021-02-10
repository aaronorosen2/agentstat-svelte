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