<script>
	import {onMount} from 'svelte'
	import page from "page"
	import {Home, Profile, Login, VerifyEmail} from './pages'
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
	
	page("*", () => page.redirect("/"))

	onMount(() => {	
		if(location.pathname != "/")
			page.replace(location.pathname);
	});

</script>

<main>
	<svelte:component this={active} {...props} />
</main>
