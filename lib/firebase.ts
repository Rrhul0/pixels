// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDrCajbs2NHQLqy2g6wTZZSClAfyqHzu7g',
	authDomain: 'pixels-32f3a.firebaseapp.com',
	projectId: 'pixels-32f3a',
	storageBucket: 'pixels-32f3a.appspot.com',
	messagingSenderId: '1024908582659',
	appId: '1:1024908582659:web:181317454d4ba6a19ed336'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
