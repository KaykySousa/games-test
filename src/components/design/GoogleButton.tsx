import { ButtonHTMLAttributes } from "react"
import GoogleLogo from "../../assets/google-logo.svg"
import { useAuth } from "../../hooks/useAuth"

interface GoogleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function GoogleButton({
	children,
	className = "",
	type = "button",
	...props
}: GoogleButtonProps) {
	const { signInWithGoogle } = useAuth()

	return (
		<button
			type={type}
			className={`h-12 px-4 flex justify-center items-center rounded bg-white text-gray-700 hover:bg-neutral-100 focus:bg-neutral-100 active:translate-y-0.5 ${className}`}
			onClick={signInWithGoogle}
			{...props}
		>
			<img src={GoogleLogo} alt="Google logo" className="h-5 mr-3" />
			{children}
		</button>
	)
}
