import { auth } from '@/lib/firebase'
import { User, signOut } from 'firebase/auth'
import React, { useState } from 'react'

export default function ShowUser({ user }: { user: User }) {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<>
			<button
				onClick={() => setShowMenu(o => !o)}
				className='grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-gray-300'
			>
				{user.photoURL ? (
					<span
						className='h-10 w-10 bg-white bg-cover bg-no-repeat'
						style={{ backgroundImage: `url('${user.photoURL}')` }}
					></span>
				) : (
					<div className='text-2xl font-semibold text-purple-600'>
						{user?.email?.charAt(0).toUpperCase()}
					</div>
				)}
			</button>
			{showMenu && (
				<div className='absolute right-2 top-16 z-50 flex  flex-col gap-2 rounded-xl bg-slate-700 bg-opacity-50 px-3 py-2 backdrop-blur-sm'>
					<strong>
						{user.displayName || user.email?.split('@')[0]}
					</strong>
					<small>{user.email}</small>
					<button
						onClick={_ => {
							signOut(auth).then()
						}}
						className='rounded-lg bg-purple-100 text-xl text-slate-400 transition-all duration-200 hover:bg-purple-200'
					>
						Log Out
					</button>
				</div>
			)}
		</>
	)
}
