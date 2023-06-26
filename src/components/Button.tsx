import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className = "", ...props }: ButtonProps) {
	return <button className={`bg-rose-600 px-4 py-3 rounded-md text-white hover:bg-rose-700 ${className}`} {...props} />
}
