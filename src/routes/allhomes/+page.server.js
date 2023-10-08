/** @type {import('./$types').PageServerLoad} */
import { PUBLIC_API_baseURL } from '$env/static/public';

let allStates = {};

export async function load({ fetch, params }) {
    try {
    let result = await fetch(`${PUBLIC_API_baseURL}states`,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    allStates = await result.json();
    } catch (error) {
    console.log("error",error);
    }
	return { allStates };
}

export const actions = {
	getCities: async ({ cookies, request }) => {
        let data = await request.formData();
        let state = data.get("state");
        let allCities  = {};
        try {
            let result = await fetch(`${PUBLIC_API_baseURL}cities/${state}/`,{
                method:'GET',
                headers:{'Content-Type':'application/json',},});
            allCities = await result.json();

        } catch (error) {
            console.log(error);
        }
        return {
            allCities,
            state
        }
	},
    
}