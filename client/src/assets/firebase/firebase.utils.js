import fireBase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBjbGavR5KisQpldti7VA__uj3W0PcNLFY",
  authDomain: "crowm-db.firebaseapp.com",
  databaseURL: "https://crowm-db.firebaseio.com",
  projectId: "crowm-db",
  storageBucket: "crowm-db.appspot.com",
  messagingSenderId: "837546300536",
  appId: "1:837546300536:web:d7604c40706e7ebfe8898d",
  measurementId: "G-GEXDPEC7WQ"
};

  export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName , email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      } catch(error) {
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  }

  export const addCollectionAndDocument = async (collectionKey , objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef,obj)
    });

     return await batch.commit();
  } 

  export const convertCollectionsSnapshotToMap = collection =>{
    const transformedCollection = collection.docs.map(doc => {
      const { title, items } = doc.data();
      return {
        routName : encodeURI(title.toLowerCase()),
        id : doc.id,
        title,
        items
      }
    })
    
    return transformedCollection.reduce((accumulator , collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    } , {})
  };

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      },reject)
    })
  }

  fireBase.initializeApp(config);

  export const auth = fireBase.auth();
  export const firestore = fireBase.firestore();

  export const googleProvider = new fireBase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default fireBase; 