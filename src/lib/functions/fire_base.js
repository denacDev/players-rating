// Import the functions you need from the SDKs you need
import {  getApp, getApps, initializeApp } from 'firebase/app';
// import 'firebase/auth/compat';
// import { getAuth } from "firebase/auth"; 
import {  getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};

// Initialize Firebase
let firebaseApp;


if(!getApps().length){
  
  firebaseApp = initializeApp(firebaseConfig);

}else{
  firebaseApp = getApp();
  

}
export const app = ()=>{
  return firebaseApp
    
}
export const fireDb = ()=>{
  return getFirestore(firebaseApp);
    
}
 
// export const fireAuth = ()=>{
//   return  getAuth(firebaseApp);
// }

 