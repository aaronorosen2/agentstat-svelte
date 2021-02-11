import {link} from '../env'
import {user} from '../../stores/user'

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export async function login(user){
    const resp = await fetch(link('login/'),{
        ...options,
        body: JSON.stringify(user)
    }).then(res => res.json())

    // save key to localstorage!
    if(!resp.msg)
        localStorage.setItem('auth/user', JSON.stringify(resp))
    return resp
}


export async function signup(user){
    const resp = await fetch(link('registration/','rest-auth'),{
        ...options,
        body: JSON.stringify(user)
    }).then(res => res.json())

    return resp
}

export async function verifyEmail(key){
    const resp = await fetch(link('registration/verify-email/','rest-auth'),{
        ...options,
        body: JSON.stringify({key})
    }).then(res => res.json())

    return resp
}

export function logout(){
    localStorage.removeItem('auth/user')
}

export function isAuthenticated(){
    return !!currentUser()
}

export function currentUser(){
    let u = JSON.parse(localStorage.getItem('auth/user')||false)
    user.set(u)
    return u
}

export function setCurrentUserPic(picture){
    let cu = currentUser()
    cu.picture = picture
    localStorage.setItem('auth/user', JSON.stringify(cu))
    user.set(cu)
}