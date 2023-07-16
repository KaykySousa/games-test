import { useEffect, useState } from "react"
import { useGames } from "../hooks/useGames"
import { useUserGames } from "../hooks/useUserGames"
import GameCard from "./GameCard"
import Pagination from "./Pagination"

interface GameListProps {
	favorites?: boolean
}

export default function GameList({ favorites }: GameListProps) {
	const { userFavorites } = useUserGames()
	const { games, search, genre, sortIsAsc } = useGames()

	const [page, setPage] = useState(0)
	const ITEMS_PER_PAGE = 48

	useEffect(() => {
		setPage(0)
	}, [search, genre, sortIsAsc])

	if (!games) return

	const renderGames = games.filter((game) => {
		if (favorites && !userFavorites?.includes(game.id)) return false
		if (genre && game.genre !== genre) return false
		if (!game.title.toLowerCase().includes(search.toLowerCase())) return false

		return true
	})

	if (!renderGames.length) {
		return (
			<div className="pt-20 text-white text-center p-4 min-h-screen flex flex-col justify-center items-center">
				<p className="text-2xl">Nenhum jogo foi encontrado!</p>
				<p className="opacity-75 mt-4">Tente alterar a consulta ou adicionar jogos aos favoritos.</p>
			</div>
		)
	}

	return (
		<>
			<div className="pt-20 content-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-[fade-in_1s_ease_backwards]">
				{renderGames
					.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
					.map((game) => {
						return <GameCard game={game} key={game.id} />
					})}
			</div>
			{renderGames.length > ITEMS_PER_PAGE && (
				<Pagination
					itemsCount={renderGames.length}
					itemsPerPage={ITEMS_PER_PAGE}
					page={page}
					setPage={setPage}
				/>
			)}
		</>
	)
}
