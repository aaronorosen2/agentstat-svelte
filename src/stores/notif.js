import {writable} from 'svelte/store'

export const notif = writable({})

export async function show(msg){
    notif.set({
        show: true,
        msg
    })
    // hide after 3s
    await new Promise(r => setTimeout(r,3000))
    notif.set({show: false})
}