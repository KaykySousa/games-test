import { ArrowUpIcon } from "@heroicons/react/20/solid"
import { useState } from "react"

export default function GoToTop() {
	const [show, setShow] = useState(false)

	document.addEventListener("scroll", () => {
		if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
			setShow(true)
		} else {
			setShow(false)
		}
	})

	return (
		<button
			style={{
				display: show ? "block" : "none",
			}}
			title="Ir para o topo"
			className="shadow fixed bottom-8 right-8 p-2 transition bg-rose-600 rounded hover:bg-rose-700"
			onClick={() => {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			}}
		>
			<ArrowUpIcon className="h-6 w-6 text-white" />
		</button>
	)
}
