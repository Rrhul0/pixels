import Image from 'next/image'
import GoogleImage from '@/public/google.png'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function LoginGoogle() {
	const provider = new GoogleAuthProvider()

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
	)
}
