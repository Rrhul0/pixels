import serviceAccountKey from '@/pixels-backend-958ae4142211.json'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

const SERVICE_KEY_CREDENTIALS = {
	type: 'service_account',
	project_id: 'pixels-backend',
	private_key_id: process.env.PRIVATE_KEY_ID ?? '',
	private_key: process.env.PRIVATE_KEY ?? '',
	client_email: process.env.CLIENT_EMAIL ?? '',
	client_id: process.env.CLIENT_ID ?? '',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/backend%40pixels-backend.iam.gserviceaccount.com',
	universe_domain: 'googleapis.com'
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth = new google.auth.GoogleAuth({
		credentials: SERVICE_KEY_CREDENTIALS,
		scopes: SCOPES
	})

	const drive = google.drive({ version: 'v3', auth })
	const folderId = '1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS'

	let imageUrls: (string | null | undefined)[] = []

	try {
		const response = await drive.files.list({
			q: `'${folderId}' in parents`,
			fields: 'files(webViewLink, thumbnailLink)'
		})

		if (!response.data.files) throw new Error('no files in response')

		imageUrls = response.data.files.map(file => file.thumbnailLink)
	} catch (error) {
		console.error('Error fetching images:', error)
		res.status(500).json({ error: 'Failed to fetch images' })
	}

	res.status(200).json(imageUrls)
}
