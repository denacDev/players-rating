<script>
    import {browser } from '$app/environment'
    export let data;
    import {addCollectionDoc, updateDocField,updateArrayDocField, getCollFromColl, getDocByRef, reactive_players_in_list, reactive_teams_in_list, deleteDocByRef} from "$lib/functions/general"
    import { loggedUser, selectedGroupId,members} from "$lib/stores/generalStores"
     
    let isLoading = true;
    if (data != undefined){isLoading = false}
 
    const getGroupMembers = async() => {

    // alert(selectedGroupId)
    await getCollFromColl(["groups/", $selectedGroupId, "/members"]).then((result) => {
        $members.data = result
        $members.loaded = true;
        }).catch((err) => {
        console.log('err@getGroupMembers>getCollFromColl :>> ', err);
        });
    }

</script>

{#if isLoading || browser != true} loading... {:else} loaded
    <!-- GROUPS -->
    <!-- <fieldset>
        <legend>groups</legend>
            <select id='groups-select' bind:value={$selectedGroupId} on:change={getGroupMembers}>
                {#each data?.docs as group }
                <option id="null" disabled selected> Chose a group </option>
                <option id="group-{group.id}" value={group.id}>
                {#if group.data.access == "public"}
                        <span title="public">&#129001</span>
                {:else}
                        <span title="private">&#128997</span>
                {/if}
                {group.data.name} </option>
                {/each}
            </select>
    </fieldset> -->
{/if}