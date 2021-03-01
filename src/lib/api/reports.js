import {link} from '../env'
import { currentUser } from './auth'

export async function trackReport(filter){
    const user = currentUser()
    if(!user) return 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
        },
        body: JSON.stringify(filter)
    }
    return await fetch(link('track-report/'),options).then(res => res.json())
}
