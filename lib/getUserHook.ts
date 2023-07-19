import { User, onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from './firebase'

export default function useUser() {
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

	return { user, loading }
}
