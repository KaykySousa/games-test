import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../hooks/useAuth"
import { auth } from "../services/firebase"
import Button from "./design/Button"
import GoogleButton from "./design/GoogleButton"
import Input from "./design/Input"

export default function SignInForm() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [loading, setLoading] = useState(false)

	const { setIsSignIn } = useAuth()

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		setLoading(true)
		try {
			const credential = await signInWithEmailAndPassword(auth, email, password)
		} catch (error) {
			if (error instanceof FirebaseError) {
				toast.error(error.code.replace("auth/", "").replaceAll("-", " "), {
					bodyClassName: "capitalize",
				})
			} else {
				toast.error("Algo deu errado. Tente novamente.")
			}
		}
		setLoading(false)
	}

	return (
		<form className="flex flex-col gap-y-4 max-w-md w-full text-white" onSubmit={handleSubmit}>
			<h1 className="text-3xl font-medium text-center">SIGN IN</h1>
			<Input
				Icon={EnvelopeIcon}
				type="email"
				placeholder="E-mail"
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				Icon={LockClosedIcon}
				type="password"
				placeholder="Senha"
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button loading={loading} type="submit">
				Entrar
			</Button>
			<button
				type="button"
				className="text-sm text-center text-gray-500 hover:text-rose-600 self-start"
				onClick={() => setIsSignIn(false)}
			>
				Ainda não tem uma conta? Cadastre-se
			</button>
			<p className="separator">ou</p>
			<GoogleButton>Entrar com Google</GoogleButton>
		</form>
	)
}
