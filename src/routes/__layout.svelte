<script lang="ts">
	import { Auth } from '$lib/Auth';
	import { Registry } from '$lib/Registry';
	import { onMount } from 'svelte';

	onMount(() => {
        console.log(Registry.auth);
	});
</script>
<main>
	<slot />
</main>
