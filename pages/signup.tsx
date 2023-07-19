import LoginGoogle from '@/components/LoginGoogle'
import SignupForm from '@/components/SignupForm'
import useUser from '@/lib/getUserHook'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function SignupPage() {
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
				<SignupForm />

				<div className='flex flex-col items-center'>
					<span className='text-gray-600'>
						Already have an account?
					</span>
					<Link href='/signin'>Sign in</Link>
				</div>
			</div>
		</div>
	)
}
