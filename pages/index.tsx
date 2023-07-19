import AWSImages from '@/components/awsImages'
import GoogleImages from '@/components/gdriveImage'
import useUser from '@/lib/getUserHook'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
	const { user, loading } = useUser()
	const router = useRouter()

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
		<div>
			<AWSImages />
			<GoogleImages />
		</div>
	)
}
