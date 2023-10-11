const API_URL = "http://localhost:8000/"
//const API_URL = "http://localhost:8000/"

export function link(uri, prefix='api'){
    return API_URL+prefix+'/'+uri
}
