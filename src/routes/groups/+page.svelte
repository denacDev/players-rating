<script>
    import {browser } from '$app/environment'
    import {  getCollFromColl , getDocByRef,   addCollectionDoc} from "$lib/functions/general"
    import { loggedUser, selectedGroupId, members, selectedMember} from "$lib/stores/generalStores"
    
    export let data;
    let isLoading = true;
    if (data != undefined){isLoading = false}
 
    const getGroupMembers = async() => {
        console.log('$selectedGroupId :>> ', $selectedGroupId);
    // alert(selectedGroupId)
    await getCollFromColl(["groups/", $selectedGroupId, "/members"]).then(async(result) => {
        if(result != undefined){

            let allMembers ={data:[],loaded:false}
            console.log('result :>> ', result);
             

            result.forEach(async member => {

                await getDocByRef(member.usr_ref).then((res)=>{
                    let newMember ={}
                    newMember = member
                    newMember.usr = res
                    allMembers.data.push(newMember)


                    if(allMembers.length == result.size)
                    {
                        allMembers.loaded = true;
                        $members = allMembers

                    } 


                })


            });

           
            
        }
        }).catch((err) => {
        console.log('err@getGroupMembers>getCollFromColl :>> ', err);
        });
    }

    const handleGetMemberRating = async(memberRef) => {
        await getCollFromColl(["groups/", $selectedGroupId, "/members/", memberRef.id, "/rating"]).then((result)=>{
            $selectedMember.rating = result;
        })
    }

    const handleSetMemberRating = async() => {

        console.log('$members :>> ', $members);

        let loggedUserObj = $members.data.filter((member)=> {
            if(member.usr_ref.id == $loggedUser.uid){return member}else{return false}
        })
        console.log('loggedUserObj :>> ', loggedUserObj);
        console.log('$loggedUser :>> ', $loggedUser);


        let newRating = {}
        if(loggedUserObj.length > 0)
        {

            newRating = {
                stars:chosenVote,
                vote_date:new Date(),
                voter:{
                    name: $loggedUser?.name,
                    refs:{
                        usr_ref:loggedUserObj[0].usr_ref,
                        mem_ref:loggedUserObj[0].ref
                    }
                }
            }
          
                        
        }

         
       //TODO:: ADD VOTE TO DB

        //addCollectionDoc(["groups/",$selectedGroupId,"/members/", $selectedMember.ref.id, "/ratings"],  )
        // await addMemberVote($selectedMember, chosenVote, $loggeduser)
    }
    $: chosenMember = null;
    $: chosenVote = null;

</script>

{#if isLoading || browser != true} loading... {:else}  
    <!-- GROUPS -->
    <fieldset>
        <legend>groups</legend>
            <select id='groups-select' bind:value={$selectedGroupId} on:change={getGroupMembers}>
                {#each data?.docs as group }
                <option id="null" disabled selected value={null}> Chose a group </option>
                <option id="group-{group.id}" value={group.id}>
                {#if group.data.access == "public"}
                        <span title="public">&#129001</span>
                {:else}
                        <span title="private">&#128997</span>
                {/if}
                {group.data.name} </option>
                {/each}
            </select>
    </fieldset>
    <!-- MEMBERS -->
    <fieldset>
        <legend>members</legend>
        {#if $selectedGroupId !=null}
            {#if $members.loaded == true}

                <!-- chose member -->
                <select id='member-select' bind:value={$selectedMember} on:change={()=>{handleGetMemberRating($selectedMember.ref)}} >
                    <option id="null" disabled selected value={null}> Chose a member </option>
                    {#each $members.data as member }
                    <option id="member-{member.ref.id}" value={member}>
                    {#if member.role.type == "moderator"}
                            <span title="moderator">Ⓜ</span>
                    {:else}
                            <span title="member">🅿</span>
                    {/if}
                    {member.usr.name} </option>
                    {/each}
                </select>

            {:else}
                members loading...
            {/if}
        {:else}
        Please select a group.
        {/if}
    </fieldset>

    <!-- VIEW VOTES -->
    <fieldset>
        <legend>votes</legend>
        {#if $selectedGroupId != null && $selectedMember != null}
            {#if $selectedMember?.rating != undefined && $selectedMember.rating.length > 0}
             
                    {#each $selectedMember.rating as rating}
                        <!-- name -->
                        {rating.voter.name} - 
                        <!-- stars -->
                        {#each {length:rating.stars} as _, i }
                                ⭐
                        {/each} - 
                        <!-- date -->
                        { rating.vote_date.toDate()}

                    {/each}

            {:else}
                no votes yet!.
            {/if}
        {:else}
            Please chose a member
        {/if}
    </fieldset>

    <!-- ADD VOTE -->

    <fieldset>
        <legend>Add vote</legend>
        {#if $selectedGroupId != null && $selectedMember != null}
                    
                    <select id='vote-select' bind:value={chosenVote} >
                        <option id="null" disabled selected value={null}> Chose a star number </option>
                       
                        <option id="vote-1" value=1>⭐ </option>
                        <option id="vote-2" value=2>⭐⭐ </option>
                        <option id="vote-3" value=3>⭐⭐⭐ </option>
                        <option id="vote-4" value=4>⭐⭐⭐⭐</option>
                        <option id="vote-5" value=5>⭐⭐⭐⭐⭐</option>
                        
                    </select>
                    
                    <button on:click={handleSetMemberRating}>Add</button>
        {:else}
        Please chose a member
    {/if}
</fieldset>
{/if}