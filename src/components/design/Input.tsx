import type { ElementType, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	Icon?: ElementType
	theme?: "primary" | "secondary"
}

export default function Input({
	Icon,
	theme = "primary",
	type = "text",
	className = "",
	...props
}: InputProps) {
	const themes = {
		primary: {
			input: `w-full h-12 p-0 bg-transparent text-white border-0 border-b !ring-0 focus:border-rose-600 focus:ring-rose-600 ${
				Icon && "pl-8"
			}`,
			icon: "",
		},

		secondary: {
			input: `w-full h-10 bg-gray-900 border border-transparent text-white rounded focus:border-rose-600 focus:ring-rose-600 ${
				Icon && "pl-10"
			}`,
			icon: "left-2",
		},
	}

	return (
		<div className="relative flex items-center group">
			{Icon && (
				<Icon
					className={`h-6 w-6 text-gray-500 absolute transition-colors group-focus-within:text-rose-600 ${themes[theme].icon}`}
				/>
			)}
			<input type={type} className={`${themes[theme].input} ${className}`} {...props} />
		</div>
	)
}
