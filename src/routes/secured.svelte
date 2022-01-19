<script>
import { Registry } from '$lib/Registry';
import RoleGuard from '$lib/RoleGuard.svelte';
import AuthGuard from '../lib/AuthGuard.svelte';
import { onMount } from 'svelte';

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
<h1>Secured</h1>
<AuthGuard manual={true} forceLogin={true}>
    <div slot="authed">
        <h1>Welcome to SvelteKit</h1>
        <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
        <button on:click="{logout}">Logout</button>
        <RoleGuard roles="{["admin"]}" manual={true}>
            <p slot="role">Has role admin.</p>
            <p slot="no_role">Does not have role admin.</p>
        </RoleGuard>
    </div>
    <button slot="not_authed" on:click="{login}">Login</button>
</AuthGuard>
