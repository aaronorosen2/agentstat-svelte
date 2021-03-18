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

export async function marketingCustomLinks(){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
        }
    }
    return await fetch(link('custom-link/'),options).then(res => res.json())
}

export async function createCustomLink(data){
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
    return await fetch(link('custom-link/'),options).then(res => res.json())
}

export async function deleteCustomLink(id){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
        }
    }
    return await fetch(link(`custom-link/${id}`),options).then(res => res.json())
}
