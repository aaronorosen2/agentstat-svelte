import {link} from '../env'
import { currentUser } from './auth'

export async function salesTransactions(){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
        }
    }
    return await fetch(link('transactions/'),options).then(res => res.json())
}

export async function activeTransactions(){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
        }
    }
    return await fetch(link(`agent-active-list/${user.agent_id}`),options).then(res => res.json())
}

export async function saveTransactionNote(data){
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
    return await fetch(link(`agent-list-note/${data.agent_list}/`),options).then(res => res.json())
}


export async function updateTransaction(data){
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
    return await fetch(link(`create-transaction/`),options).then(res => res.json())
}

