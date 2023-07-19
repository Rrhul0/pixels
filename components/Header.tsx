import useUser from '@/lib/getUserHook'
import { useRouter } from 'next/router'
import React from 'react'
import ShowUser from './ShowUser'
import Link from 'next/link'

export default function Header() {
	const { user, loading } = useUser()
	const router = useRouter()
	const path = router.pathname

	return (
		<header className='flex justify-between h-16 items-center px-6 border-b'>
			<Link href={'/'}>
				<span className='font-bold text-lg tracking-wider'>Pixels</span>
			</Link>
			{!user ? (
				path === '/signin' ? (
					<Link
						href='/signup'
						className='bg-white py-1 px-2 rounded-lg'
					>
						Sign Up
					</Link>
				) : (
					<Link
						href='/signin'
						className='bg-white py-1 px-2 rounded-lg'
					>
						Sign In
					</Link>
				)
			) : (
				<ShowUser user={user} />
			)}
		</header>
	)
}
