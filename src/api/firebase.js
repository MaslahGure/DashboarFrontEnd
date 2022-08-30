// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBza1PpuagOs56hAUlU9fEWlJfEyajHaUE",
  authDomain: "conveyordashboard.firebaseapp.com",
  projectId: "conveyordashboard",
  storageBucket: "conveyordashboard.appspot.com",
  messagingSenderId: "86675569766",
  appId: "1:86675569766:web:2eb426157dca86a3e441a7",
  measurementId: "G-H3FXNDGNQB"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const storage = getStorage();

export async function upload(file,userId,setLoading,setUserPhotoUrl,updateUserPhoto){
    const fileRef =ref(storage,userId +".png");

    await uploadBytes(fileRef,file);
    setLoading(false);
    const photoURL = await getDownloadURL(fileRef);
    setUserPhotoUrl(photoURL);
    updateUserPhoto(photoURL)

    alert ("file uploaded")

}