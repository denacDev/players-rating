import {fireDb as db} from '$lib/functions/fire_base.js';
import {  onSnapshot, collection, getDocs, getDoc, doc ,setDoc,addDoc, deleteDoc,FieldValue,  updateDoc, arrayUnion, query, where, limit, Timestamp, arrayRemove} from "firebase/firestore";
// import {  playersInList, teamsInList} from "$lib/stores/generalStores"


export const getAllDocsFromColl = async(coll) => {
    let qsLen = null;
    let alldocs = []
    const unsubscribe = onSnapshot(collection(db(),(Array.isArray(coll))? coll.join('') : coll), (querySnapshot) => {

        qsLen = querySnapshot.size
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          alldocs.push({id:doc.ref.id, data:doc.data()});
        });



    });
    
    if(alldocs.length == qsLen)
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


export const getCollFromColl = async (coll) => {

    const querySnapshot = await getDocs(collection(db(), (Array.isArray(coll))? coll.join('') : coll));
    let alldocs = []
    querySnapshot.forEach((doc) => {
        alldocs.push({ref:doc.ref, ...doc.data()})
    });

    if(alldocs.length == querySnapshot.length)
    {
        // console.log('X-alldocs :>> ', alldocs);
        return alldocs
    }else{
        return new Promise((res, rej)=>{
            setTimeout(() => {
        // console.log('alldocs :>> ', alldocs);

                res(alldocs)
            }, 1000);
        })
    }
}
export const getDocByRef = async(docRef) => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    return {ref:docSnap, ...docSnap.data()}
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
}

export const addCollectionDoc = async(coll, data) => {
 
    

    
    await addDoc(collection(db(), (Array.isArray(coll))? coll.join('') : coll), data)
    .then((result) => {
       console.log('result :>> ', result);
    }).catch((err) => {
        alert("err "+ err)
    });
}



export const addNewRating = async(coll, data ) => {
    
    try {
        await addDoc(collection(db(), (Array.isArray(coll))? coll.join('') : coll), data)
    } catch (error) {
        console.log('error@ratePlayer :>> ', error);
    }
   
}
export const editExistingRating = async(docRef, data ) => {
    
    try {
        setDoc(docRef, data, { merge: true });
    } catch (error) {
        console.log('error@ratePlayer :>> ', error);
    }
   
}




// new
