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
		<div className='flex flex-wrap relative gap-8 justify-between py-8 h-full overflow-scroll'>
			{imageUrls.map((imageUrl, index) => (
				<div
					key={index}
					className='w-60 h-60 relative border-8 border-stone-300 rounded-md bg-stone-300'
				>
					<Image
						src={imageUrl}
						alt={`Photo ${index}`}
						layout='fill'
						objectFit='cover'
						className='rounded-md'
					/>
				</div>
			))}
		</div>
	)
}
