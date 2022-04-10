import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAik1VPRViwkUsws_tJksh8UM6cTycuiBU",
    authDomain: "restaurantapp-5be67.firebaseapp.com",
    databaseURL: "https://restaurantapp-5be67-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-5be67",
    storageBucket: "restaurantapp-5be67.appspot.com",
    messagingSenderId: "369435318616",
    appId: "1:369435318616:web:f2f79a5d5be8c8a6f0ed2d"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage };