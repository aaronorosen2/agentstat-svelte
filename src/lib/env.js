const API_URL = "https://app.realtorstat.com/"
//const API_URL = "http://localhost:8000/"

export function link(uri, prefix='api'){
    return API_URL+prefix+'/'+uri
}
