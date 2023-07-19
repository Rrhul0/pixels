import Link from 'next/link'
import LoginGoogle from '@/components/LoginGoogle'
import SigninForm from '@/components/SigninForm'

export default function SigninPage() {
	return (
		<div className='grid place-items-center h-screen overflow-hidden bg-slate-300'>
			<div className='w-80 bg-white rounded-xl p-6 flex flex-col gap-6 '>
				<LoginGoogle />
				<SigninForm />

				<div className='flex flex-col items-center'>
					<span className='text-gray-600'>
						Don&apos;t have an account yet?
						{/* : 'Already have an account?'} */}
					</span>
					<Link href='/signup'>Sign up</Link>
				</div>
			</div>
		</div>
	)
}
