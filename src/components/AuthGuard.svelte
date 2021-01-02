<script>
    import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
    import { authStore } from './stores';
    let auth;
    let unsub;
    let initialized;
    $: if(auth) {
        auth.initialized.subscribe(i => {
            initialized = i;
        });
    };
    $: user = (initialized) ? auth.buildUser() : null;
    let forceLogin = false;
    let manual = false;
    export {
        forceLogin,
        manual
    }
    onMount(() => {
        unsub = authStore.subscribe(value => {
            auth = value;
        });
        if(forceLogin && user === null){
            goto("/login");
        }
    });
</script>

{#if user && manual}
    <slot name="authed"></slot>
{:else if !user && manual}
    <slot name="not_authed"></slot>
{:else if user && !manual}
    <slot></slot>
{/if}
