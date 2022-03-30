import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3i1NlHkuLVqae7y8jP99jTSXKrs68a8c",
    authDomain: "crwn-v2-b3f99.firebaseapp.com",
    projectId: "crwn-v2-b3f99",
    storageBucket: "crwn-v2-b3f99.appspot.com",
    messagingSenderId: "75638762257",
    appId: "1:75638762257:web:728989ec70365ced793ab0"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

//CHECKING if user exists in db, and CREATING one to the db if it does not exist already
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

    //if user data does NOT exist
    //create / set document with the data from userAuth in my collection
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }
    //if user data exist
    return userDocRef;
}