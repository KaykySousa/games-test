import axios from "axios"
import { ReactNode, createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useUserGames } from "../hooks/useUserGames"
import { IGame } from "../types/api"

interface IGamesContext {
	games: IGame[] | null
	error: {
		title: string | number
		description: string
	} | null
	loading: boolean
	genres: string[] | null
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
	sortIsAsc: boolean
	toggleSortOrder: () => void
	genre: string
	setGenre: React.Dispatch<React.SetStateAction<string>>
}

export const GamesContext = createContext({} as IGamesContext)

export default function GamesProvider({ children }: { children: ReactNode }) {
	const [games, setGames] = useState<IGame[] | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<{
		title: string | number
		description: string
	} | null>(null)
	const [genres, setGenres] = useState<string[] | null>(null)
	const [genre, setGenre] = useState("")
	const [search, setSearch] = useState("")

	const [sortIsAsc, setSortIsAsc] = useState<boolean>(true)

	const { userRatings } = useUserGames()

	useEffect(() => {
		fetchData()
	}, [])

	async function fetchData() {
		setLoading(true)
		try {
			const res: { data: IGame[] } = await axios.get(
				"https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/",
				{
					headers: { "dev-email-address": "kayky.sousa.dev@gmail.com" },
					timeout: 5000,
				}
			)

			setGames(res.data)

			const genres = new Set<string>(res.data.map((game) => game.genre))
			setGenres(Array.from(genres).sort())
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.code === "ECONNABORTED") {
					setError({
						title: "TIMEOUT",
						description: "O servidor demorou para responder, tente mais tarde!",
					})
				} else if (
					error.response?.status &&
					[500, 502, 503, 504, 507, 508, 509].includes(error.response.status)
				) {
					setError({
						title: error.response.status,
						description: "O servidor falhou em responder, tente recarregar a página!",
					})
				} else {
					setError({
						title: error.response?.status ?? "ERRO",
						description:
							"O servidor não conseguirá responder por agora, tente voltar novamente mais tarde!",
					})
				}
			}
		}
		setLoading(false)
	}

	function toggleSortOrder() {
		if (!userRatings) return toast.info("Faça login para ordenar as avaliações")
		if (!games) return

		const isAsc = !sortIsAsc
		setSortIsAsc(isAsc)

		const orderedGames: IGame[] = []
		Object.entries(userRatings)
			.sort((a, b) => (isAsc ? a[1] - b[1] : b[1] - a[1]))
			.forEach((entry) => {
				const id = entry[0]
				const game = games?.find((game) => game.id === parseInt(id))
				if (game) {
					orderedGames.push(game)
				}
			})
		games.map((game) => {
			if (!Object.keys(userRatings).includes(String(game.id))) {
				orderedGames.push(game)
			}
		})
		setGames(orderedGames)
	}

	return (
		<GamesContext.Provider
			value={{
				games,
				error,
				loading,
				genres,
				search,
				setSearch,
				sortIsAsc,
				toggleSortOrder,
				genre,
				setGenre,
			}}
		>
			{children}
		</GamesContext.Provider>
	)
}
