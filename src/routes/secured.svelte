<script>
    import AuthGuard from '../components/AuthGuard.svelte';
    import RoleGuard from '../components/RoleGuard.svelte';
</script>
<AuthGuard manual=true>
    <h1 slot="not_authed">This content is only visible to authenticated users :(</h1>
    <h1 slot="authed">Success, you are authenticated.</h1>
</AuthGuard>
<RoleGuard roles=user>
    <h2>You have user role!</h2>
</RoleGuard>