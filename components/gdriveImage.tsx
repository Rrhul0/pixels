import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function GoogleImages() {
	const [imageUrls, setImageUrls] = useState<string[]>([])

	useEffect(() => {
		fetch('/api/google-images')
			.then(res => res.json())
			.then(setImageUrls)
	}, [])

	return (
		<div>
			<h1>Drive Photo Showcase</h1>
			<div className='photo-grid'>
				{imageUrls.map((imageUrl, index) => (
					<Image
						key={index}
						src={imageUrl}
						alt={`Photo ${index}`}
						width={200}
						height={200}
					/>
				))}
			</div>
		</div>
	)
}
