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
		<header className='flex justify-between h-16 items-center px-4'>
			<Link href={'/'}>
				<span className='font-bold text-lg '>Pixels</span>
			</Link>
			{!user ? (
				path === '/signin' ? (
					<button>Sign Up</button>
				) : (
					<button>Sign In</button>
				)
			) : (
				<ShowUser user={user} />
			)}
		</header>
	)
}
