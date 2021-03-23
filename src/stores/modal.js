import {writable} from 'svelte/store'
import PopupMsg from '../components/PopupMsg/PopupMsg.svelte'

export const modal = writable({})

function getVisitStore(key){
    let vstore = localStorage.getItem('user/visit')
    if(!vstore) return
    let visit = JSON.parse(vstore)
    return visit[key]
}

function setVisitStore(key, value){
    let vstore = localStorage.getItem('user/visit')
    if(!vstore){
        localStorage.setItem('user/visit', JSON.stringify({[key]: value}))
        return
    }
    let visit = JSON.parse(vstore)
    visit[key] = value
    localStorage.setItem('user/visit', JSON.stringify(visit))      
}

export function showOnboarding(section){
    let onbData 
    if (getVisitStore(section)){
        return
    }
    setVisitStore(section, true)
    switch (section) {
        case 'profile':
            onbData = {
                title: 'Profile Settings',
                props: {
                    msg: `Welcome to your own dashboard!`,
                    steps: [
                        'Customize your public profile',
                        'Add your specializations',
                        'Generate free listing leads',
                        'Win every listing presentation'
                    ]
                }
            }
            break;

        case 'inbox':
            onbData = {
                title: 'Inbox',
                props: {
                    msg: 'Users that fill out the contact form on your page end up here.'
                }
            }  
            break;
        
        case 'reports':
            onbData = {
                title: 'Reporting',
                props: {
                    msg: 'Track impressions and leads by demographic',
                    steps: [
                        'Location',
                        'Time',
                        'Property Type',
                        'Price Point',
                        'Buyer/Seller',
                    ]
                }
            }  
            break;
        
        case 'marketing':
            onbData = {
                title: 'Marketing',
                props: {
                    msg: 'Generate unique landing pages to capture future sellers and track the results. (Facebook Ad integration coming soon)',
                    steps: []
                }
            }  
            break;

        default:
            break;
    }

    if(onbData){
        modal.set({
            show: true,
            cmp: PopupMsg,
            ...onbData
        })
    }
}