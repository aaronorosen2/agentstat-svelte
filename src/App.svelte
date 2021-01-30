<script>
	import {onMount} from 'svelte'
	import page from "page"
	import {Home, Profile} from './pages'

	page.start();
	page("*", (c, next) => {
		scrollTo(0, 0);
		next();
	});

	let active = Home
	let props = {}

	page("/", (ctx) => {
		active = Home
	})
	page("/profile", (ctx) => {
		active = Profile
		// props = ctx.params
	})
	
	page("*", () => page.redirect("/"))

	onMount(() => {
		page.replace(location.pathname);
	});

</script>

<main>
	<svelte:component this={active} {...props} />
</main>
