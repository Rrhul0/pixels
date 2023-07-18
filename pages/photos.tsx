import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase'
import { User, onAuthStateChanged } from 'firebase/auth'
import AWSImages from '@/components/awsImages'

export default function Photos() {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setUser(user)
			} else {
				setUser(null)
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	useEffect(() => {}, [])

	if (!user) <>woh there</>
	if (loading) <>Loading....</>
	return <AWSImages />
}
