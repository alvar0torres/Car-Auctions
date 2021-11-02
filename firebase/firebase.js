// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtfB7Tgz0D94hYlzsnrPoipQHWhCM_qKY",
  authDomain: "auctions-6be0c.firebaseapp.com",
  databaseURL:
    "https://auctions-6be0c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auctions-6be0c",
  storageBucket: "auctions-6be0c.appspot.com",
  messagingSenderId: "289424210053",
  appId: "1:289424210053:web:51c8bd493a19f4554a51ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app as default };
