<script>
	import page from "page"
	import {Home} from './pages'

	let active = Home

	page("/", (ctx) => {
		active = Home
	})
	
	page("*", () => page.redirect("/"))

</script>

<main>
	<svelte:component this={active}	 />
</main>
