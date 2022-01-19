<script lang="ts">
import { onMount } from "svelte";
import { Registry } from "./Registry";

import type { User } from "./User";


    let roles: string[] = [], manual = false, user: User = null;
    export {roles, manual};

    let hasRole = (roles: string[]): boolean => {
        if(user){
            for(let role of roles){
                if(user.roles.includes(role))
                    return true;
            }
        }
        return false;
    }

    onMount(
        () => {
            Registry.auth.getUser().subscribe(
                (data: User) => {
                    user = data;
                }
            );
        }
    );

</script>

{#if user}
    {#if hasRole(roles) && manual}
        <slot name="role"></slot>
    {:else if !hasRole(roles) && manual}
        <slot name="no_role"></slot>
    {:else if hasRole(roles) && !manual}
        <slot></slot>
    {/if}
{/if}