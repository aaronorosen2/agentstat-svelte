import {writable} from 'svelte/store'

export const notif = writable({})

export async function show(msg,error){
    notif.set({
        show: true,
        error,
        msg
    })
    // hide after 5s
    await new Promise(r => setTimeout(r,5000))
    notif.set({show: false})
}

export const profileNotif = writable({})