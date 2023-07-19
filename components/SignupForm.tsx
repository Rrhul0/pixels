import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import React, { FormEvent } from 'react'

export default function SignupForm() {
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
	return (
		<form
			onSubmit={onSignupEmailPassword}
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
			<div className='flex flex-col gap-1'>
				<label className='flex flex-col'>
					<span>Password</span>
					<input
						className='border rounded-xl px-3 py-1.5'
						type='password'
						name='password'
						placeholder='strong password'
					/>
				</label>
			</div>
			<button className='bg-indigo-600 rounded-xl px-3 py-1.5 text-white text-lg tracking-wider shadow-md font-semibold'>
				Sign up
			</button>
		</form>
	)
}
