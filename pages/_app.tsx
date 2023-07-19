import Header from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={`${inter.className} h-screen `}>
			<Header />
			<div className='py-10 px-20 h-[calc(100%-64px)]'>
				<Component {...pageProps} />
			</div>
		</main>
	)
}
