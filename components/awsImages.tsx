import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function AWSImages() {
	const [imageUrls, setImageUrls] = useState<string[]>([])

	useEffect(() => {
		fetch('/api/aws-images')
			.then(res => res.json())
			.then(setImageUrls)
	}, [])

	return (
		<div>
			<h1>Photo Showcase</h1>
			<div className='photo-grid'>
				{imageUrls.map((imageUrl, index) => (
					<Image
						key={index}
						src={imageUrl}
						alt={`Photo ${index}`}
						width='200'
						height='100'
					/>
				))}
			</div>
		</div>
	)
}
