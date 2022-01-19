<script>
import { Registry } from '$lib/Registry';
import { onMount } from 'svelte';

import AuthGuard from '../lib/AuthGuard.svelte';

onMount(
    () => {
        Registry.auth.checkParams();
    }
);

let login = () => {
    Registry.auth.login({redirectUri: location.href});
};

let logout = () => {
    Registry.auth.logout();
};
</script>
<h1>Main page</h1>
<AuthGuard manual={true}>
    <div slot="authed">
        <h1>Welcome to SvelteKit</h1>
        <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        <button on:click="{logout}">Logout</button>
    </div>
    <button slot="not_authed" on:click="{login}">Login</button>
</AuthGuard>
