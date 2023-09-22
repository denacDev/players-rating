import {fireDb as db} from '$lib/functions/fire_base.js';
import {  onSnapshot, collection, getDocs, getDoc, doc ,setDoc,addDoc, deleteDoc,FieldValue,  updateDoc, arrayUnion, query, where, limit, Timestamp, arrayRemove} from "firebase/firestore";
// import {  playersInList, teamsInList} from "$lib/stores/generalStores"


export const getAllDocsFromColl = async(coll) => {
    
    const querySnapshot = await getDocs(collection(db(),coll));
    let alldocs = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      alldocs.push({id:doc.ref.id, data:doc.data()});
    });
    
    if(alldocs.length == querySnapshot.length)
    {
        return alldocs
    }else{
        return new Promise((res, rej)=>{
            setTimeout(() => {
                res(alldocs)
            }, 1000);
        })
    }
}
