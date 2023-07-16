import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { Link, Navigate } from "react-router-dom"
import SignInForm from "../components/SignInForm"
import SignUpForm from "../components/SignUpForm"
import { useAuth } from "../hooks/useAuth"

export default function AuthPage() {
	const { isSignIn, user } = useAuth()

	if (user) {
		return <Navigate to="/" replace />
	}

	return (
		<div className="min-h-screen w-full bg-[url('/authbg.png')] bg-contain md:bg-cover">
			<div className="px-6 min-h-screen w-full from-75% from-gray-950/95 to-rose-950/95 bg-gradient-to-b flex justify-center items-center">
				<Link
					to="/"
					title="Ir para o início"
					className="fixed top-6 left-6 text-white flex items-center transition-opacity opacity-50 hover:opacity-100 focus:opacity-100"
				>
					<ArrowLeftIcon className="h-5 w-5 mr-2" />
					Voltar
				</Link>
				{isSignIn ? <SignInForm /> : <SignUpForm />}
			</div>
		</div>
	)
}
