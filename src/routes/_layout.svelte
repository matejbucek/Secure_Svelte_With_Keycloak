<script lang="ts">
	import { onMount } from "svelte";
	import { Auth } from "../components/Auth.class";
	import { authStore } from "../components/stores";
	import Nav from "../components/Nav.svelte";
	onMount(() => {
		authStore.set(
			new Auth({
				realm: "{realm_name}",
				"auth-server-url": "{your_server_url/auth}",
				"ssl-required": "external",
				resource: "{resource}",
				clientId: "{client_id}",
				"public-client": true,
				"confidential-port": 0,
			})
		);
	});
	export let segment: string;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment} />

<main>
	<slot />
</main>
