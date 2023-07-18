import { Inter } from 'next/font/google'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth'
import { FormEvent } from 'react'
import { auth } from '@/lib/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const provider = new GoogleAuthProvider()

	function onSigninEmailPassword(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user
				console.log(user)
				// ...
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorCode, errorMessage)
			})
	}

	function onSignupEmailPassword(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user
				console.log(user)
				// ...
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorCode, errorMessage)

				// ..
			})
	}

	function onClickGoogleLogin() {
		signInWithPopup(auth, provider)
			.then(result => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential =
					GoogleAuthProvider.credentialFromResult(result)
				if (!credential) return null

				const token = credential.accessToken
				// The signed-in user info.
				const user = result.user
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch(error => {
				// Handle Errors here.
				const errorCode = error.code
				const errorMessage = error.message
				// The email of the user's account used.
				const email = error.customData.email
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error)
				// ...
			})
	}

	return (
		<main>
			<form onSubmit={onSigninEmailPassword}>
				<label>
					<span>Email</span>
					<input
						type='email'
						placeholder='user@pixels.com'
						name='email'
					/>
				</label>
				<label>
					<span>Password</span>
					<input
						type='password'
						name='password'
					/>
				</label>
				<button>Signin</button>
			</form>
			<form onSubmit={onSignupEmailPassword}>
				<label>
					<span>Email</span>
					<input
						type='email'
						placeholder='user@pixels.com'
						name='email'
					/>
				</label>
				<label>
					<span>Password</span>
					<input
						type='password'
						name='password'
					/>
				</label>
				<button>Signup</button>
			</form>
			<button onClick={onClickGoogleLogin}>Google Login</button>
		</main>
	)
}
