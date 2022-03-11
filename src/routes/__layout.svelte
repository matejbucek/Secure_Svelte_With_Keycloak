<script lang="ts">
	import { Auth } from '$lib/Auth';
	import { Registry } from '$lib/Registry';
	import { onMount } from 'svelte';

	onMount(() => {
        //console.log(Registry.auth);
		Registry.auth.inBrowserInit();
	});
</script>
<main>
	<slot />
</main>
