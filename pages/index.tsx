import AWSImages from '@/components/awsImages'
import GoogleImages from '@/components/gdriveImage'
import useUser from '@/lib/getUserHook'

export default function Home() {
	const { user, loading } = useUser()

	if (!user) <>woh there</>
	if (loading) <>Loading....</>
	return (
		<div>
			<AWSImages />
			<GoogleImages />
		</div>
	)
}
