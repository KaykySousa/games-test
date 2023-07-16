import { SelectHTMLAttributes } from "react"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({ className = "", ...props }: SelectProps) {
	return (
		<select
			className={`w-full h-10 bg-gray-900 border border-transparent text-white rounded focus:border-rose-600 focus:ring-rose-600 ${className}`}
			{...props}
		/>
	)
}
