import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean
}

export default function Button({
	className = "",
	type = "button",
	children,
	loading,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={loading}
			className={`flex justify-center items-center h-12 px-4 rounded bg-rose-600 font-medium text-lg text-white transition-colors hover:bg-rose-700 focus:bg-rose-700 active:translate-y-0.5 disabled:bg-rose-500 disabled:cursor-not-allowed ${className}`}
			{...props}
		>
			{loading ? (
				<div className="border-white border-b-transparent animate-spin rounded-full border-2 h-6 w-6" />
			) : (
				children
			)}
		</button>
	)
}
