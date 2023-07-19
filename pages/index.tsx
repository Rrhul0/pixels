import AWSImages from '@/components/awsImages'
import GoogleImages from '@/components/gdriveImage'
import useUser from '@/lib/getUserHook'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home() {
	const { user, loading } = useUser()
	const router = useRouter()
	const [source, setSource] = useState<'aws' | 'google'>('aws')

	useEffect(() => {
		if (!user && !loading) router.push('/signin')
	}, [loading, router, user])

	if (!user)
		return (
			<>
				Not Signed in. Go to <Link href={'/signin'}>Sign in</Link>
			</>
		)

	if (loading) return <>Loading....</>

	return (
		<div className='overflow-hidden h-full'>
			<div className='flex border-b border-stone-400'>
				<button
					className={`${
						source === 'aws' && 'bg-stone-400'
					} flex-1 rounded-t-xl duration-200 py-1.5 font-semibold`}
					onClick={() => setSource('aws')}
				>
					AWS S3
				</button>
				<button
					className={`${
						source === 'google' && 'bg-stone-400'
					} flex-1 rounded-t-xl duration-200 font-semibold`}
					onClick={() => setSource('google')}
				>
					Google Drive
				</button>
			</div>
			{source === 'aws' ? <AWSImages /> : <GoogleImages />}
		</div>
	)
}
