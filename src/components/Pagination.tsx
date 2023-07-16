import Button from "./design/Button"

interface PaginationProps {
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	itemsCount: number
	itemsPerPage: number
}

export default function Pagination({ itemsCount, itemsPerPage, page, setPage }: PaginationProps) {
	return (
		<div className="flex items-center justify-center py-6">
			<Button
				className="!h-10 !px-3 !rounded-none !rounded-l"
				onClick={() => {
					if (page - 1 < 0) return
					document.body.scrollTop = 0
					document.documentElement.scrollTop = 0
					setPage(page - 1)
				}}
			>
				Anterior
			</Button>
			<p className="w-12 text-white text-center">{page + 1}</p>
			<Button
				className="!h-10 !px-3 !rounded-none !rounded-r"
				onClick={() => {
					if (page + 1 > Math.floor(itemsCount / itemsPerPage)) return
					document.body.scrollTop = 0
					document.documentElement.scrollTop = 0
					setPage(page + 1)
				}}
			>
				Próximo
			</Button>
		</div>
	)
}
