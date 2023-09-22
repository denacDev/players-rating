<script>
    import {page } from '$app/stores'
    // console.log('$page :>> ', $page);
</script>
<nav>
    <a href="/"       class:active-link={$page.route.id == "/"}>home</a>
    <a href="/groups" class:active-link={$page.route.id == "/groups"}>groups</a>
    <!-- <a href="/team-builder">team-builder</a> -->

</nav>

<slot />


<style>
    :global(.active-link){
        color:orange;
    }
</style>