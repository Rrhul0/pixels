import Link from 'next/link'
import LoginGoogle from '@/components/LoginGoogle'
import SigninForm from '@/components/SigninForm'
import useUser from '@/lib/getUserHook'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function SigninPage() {
	const { user, loading } = useUser()
	const router = useRouter()

	useEffect(() => {
		if (user && !loading) router.push('/')
	}, [loading, router, user])

	if (user)
		return (
			<>
				Already Signed in. Go to <Link href={'/'}>Home</Link>
			</>
		)

	return (
		<div className='grid place-items-center h-full overflow-hidden'>
			<div className='w-80 bg-white rounded-xl p-6 flex flex-col gap-6 '>
				<LoginGoogle />
				<SigninForm />

				<div className='flex flex-col items-center'>
					<span className='text-gray-600'>
						Don&apos;t have an account yet?
						{/* : 'Already have an account?'} */}
					</span>
					<Link href='/signup'>Sign up</Link>
				</div>
			</div>
		</div>
	)
}
