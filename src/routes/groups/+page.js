import {  getAllDocsFromColl} from "$lib/functions/general";

/** @type {import('./$types').PageLoad} */
export async function load() {
    return {docs: await getAllDocsFromColl("groups").then((result) => {
        //  console.log('groups :>> ', result);
        return result;
    }).catch((err) => {
        console.log('erro@getAllDocs>groups :>> ', err);
    })}
}