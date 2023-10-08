/** @type {import('./$types').PageLoad} */
import { PUBLIC_API_baseURL } from '$env/static/public'

export async function load({ params }) {
    
    let allCities;
    try {
        let result = await fetch(`${PUBLIC_API_baseURL}cities/${params?.state}/`,{
            method:'GET',
            headers:{'Content-Type':'application/json',}});
            allCities = await result.json();

        } catch (error) {
        console.log(error);
    }
    return {
        allCities
    }
}