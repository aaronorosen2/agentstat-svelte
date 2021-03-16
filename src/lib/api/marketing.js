import {link} from '../env'
import { currentUser } from './auth'

export async function saveMarketingPartner(data){
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
    return await fetch(link('marketing-partner/'),options).then(res => res.json())
}

export async function marketingPartner(data){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify(data)
    }
    return await fetch(link('marketing-partner/'),options).then(res => res.json())
}
