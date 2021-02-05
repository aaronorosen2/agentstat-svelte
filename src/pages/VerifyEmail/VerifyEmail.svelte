<script>
    import {NavBar} from '../../components'
    import {verifyEmail} from '../../lib/api/auth'
    import page from 'page'
    export let key
    let res = {}
    let msg = "Verifying Email ...."

    async function emailVerification(){
        try {
            res = await verifyEmail(key)
        }catch{
            res = {detail: "error"}
        }
        if(res.detail == "error"){
            msg = "Internal error occured, please try again later"
        }else if(res.detail == "ok"){
            msg = "Your email has been validated, you may login now"
            page.redirect('/login?success='+msg)
            
        }else{
            msg = "Unable to verify your email, wrong key or expired token"
            page.redirect('/login?error='+msg)
        }
    }

    if(key){
        emailVerification()
    }

</script>


<NavBar />

<h1 class:error={res.detail && res.detail != "ok"} class:success={res.detail == "ok"}>{msg}</h1>  


<style>
    h1{
        padding: 5rem 0;
        font-size: 1.2rem;
        font-weight: 500;
        text-align: center;
    }
</style>