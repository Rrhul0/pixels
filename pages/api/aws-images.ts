import { NextApiRequest, NextApiResponse } from 'next'
import {
	S3Client,
	ListObjectsCommand,
	GetObjectCommand
} from '@aws-sdk/client-s3'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let imageUrls: string[] = []

	// Set the AWS Region.
	const REGION = 'ap-south-1'
	//set bucket
	const bucketName = 'testbucketfp'
	// Create an Amazon S3 service client object.

	const s3Client = new S3Client({
		region: REGION,
		signer: {
			sign: async request => request
		}
	})

	try {
		const data = await s3Client.send(
			new ListObjectsCommand({ Bucket: bucketName })
		)
		if (!data.Contents) throw new Error('no response Contents')

		imageUrls = data.Contents.map(
			object => `https://${bucketName}.s3.amazonaws.com/${object.Key}`
		)
	} catch (err) {
		console.log('Error', err)
		res.status(500).json({ error: 'Failed to fetch images' })
	}

	res.status(200).json(imageUrls)
}
