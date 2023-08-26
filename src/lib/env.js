const API_URL = "https://app.realtorstat.com/"

export function link(uri, prefix='api'){
    return API_URL+prefix+'/'+uri
}
