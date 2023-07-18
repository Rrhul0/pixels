import { Inter } from 'next/font/google'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth'
import { FormEvent, useState } from 'react'
import { auth } from '@/lib/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Image from 'next/image'
import GoogleImage from '@/public/google.png'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [login, setLogin] = useState<'signin' | 'signup'>('signin')

	const provider = new GoogleAuthProvider()

	function onSigninSignupEmailPassword(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		login === 'signin'
			? signInWithEmailAndPassword(auth, email, password)
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
			: createUserWithEmailAndPassword(auth, email, password)
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
		<main className='grid place-items-center h-screen overflow-hidden bg-slate-300'>
			<div className='w-80 bg-white rounded-xl p-6 flex flex-col gap-6 '>
				<button
					onClick={onClickGoogleLogin}
					className='border rounded-xl px-3 py-1.5 text-lg tracking-wider flex items-center gap-2 justify-center shadow-md'
				>
					<Image
						src={GoogleImage}
						width={25}
						height={25}
						alt='google logo'
					/>
					<span>Google Login</span>
				</button>

				<form
					onSubmit={onSigninSignupEmailPassword}
					className='flex flex-col gap-4 before:border-b'
				>
					<label className='flex flex-col'>
						<span>Email</span>
						<input
							className='border rounded-xl px-3 py-1.5'
							type='email'
							placeholder='user@pixels.com'
							name='email'
						/>
					</label>
					<label className='flex flex-col'>
						<span>Password</span>
						<input
							className='border rounded-xl px-3 py-1.5'
							type='password'
							name='password'
							placeholder='strong password'
						/>
					</label>
					<button className='bg-indigo-600 rounded-xl px-3 py-1.5 text-white text-lg tracking-wider shadow-md font-semibold'>
						{login === 'signin' ? 'Sign in' : 'Sign up'}
					</button>
				</form>
				<div className='flex flex-col items-center'>
					<p className='text-gray-600'>
						{login === 'signin'
							? "Don't have an account yet?"
							: 'Already have an account?'}
					</p>
					<button
						className='text-indigo-600 font-semibold'
						onClick={() =>
							setLogin(o =>
								o === 'signin' ? 'signup' : 'signin'
							)
						}
					>
						{login === 'signin' ? 'Sign up' : 'Sign in'}
					</button>
				</div>
			</div>
		</main>
	)
}
