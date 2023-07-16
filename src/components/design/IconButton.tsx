import { ButtonHTMLAttributes } from "react"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function IconButton({ type, className = "", ...props }: IconButtonProps) {
	return (
		<button
			tabIndex={0}
			type={type || "button"}
			className={`flex-shrink-0 rounded-full p-0.5 transition-colors hover:bg-gray-900 focus:bg-gray-900 ${className}`}
			{...props}
		/>
	)
}
