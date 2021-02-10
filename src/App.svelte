<script>
	import {onMount} from 'svelte'
	import page from "page"
	import {Home, Profile, Login, VerifyEmail, ProfileSettings} from './pages'
	import {Notification} from './components'
	import {notif} from './stores/notif'

	import {isAuthenticated} from './lib/api/auth'

	page.start();
	page("*", (c, next) => {
		scrollTo(0, 0);
		next();
	});

	let active = Home
	let props = {}

	page("/", (ctx) => {
		active = Home
		props = {}
	})
	page("/login", (ctx) => {
		if(isAuthenticated()){
			page.redirect('/')
			return
		}
		active = Login
	})
	page("/profile/:name", (ctx) => {
		active = Profile
		props = ctx.params
	})
	page("/verify-email/:key", (ctx) => {
		active = VerifyEmail
		props = ctx.params
	})
	

	// Dashboard
	page("/profile-settings", (ctx) => {
		if(!isAuthenticated()){
			page.redirect('/login')
			return
		}
		active = ProfileSettings
		props = {}
	})

	page("*", () => page.redirect("/"))

	onMount(() => {	
		if(location.pathname != "/")
			page.replace(location.pathname);
	});

</script>

<Notification show={$notif.show} msg={$notif.msg} />
<main>
	<svelte:component this={active} {...props} />
</main>
