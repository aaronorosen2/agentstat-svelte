import {link} from '../env'
import { currentUser } from './auth'

export async function fetchReferrals(opt){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
        }
    }
    let ext = ''
    if(opt.type){
        ext = '&type=sent'
    }
    return await fetch(link(`referral/?page=${opt.page}${ext}`),options).then(res => res.json())
}

export async function saveReferral(data){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify(data)
    }
    
    return await fetch(link(`referral/`),options).then(res => res.json())
}