import { writable } from 'svelte/store';
 
export const members = writable([]);
export const selectedGroupId = writable(null);
export const selectedMember = writable(null);

export const loggedUser = writable({name:"CDENIS", uid:"4jhZzvU9xCbzDQdEQDsvT2h9Hc92"});


