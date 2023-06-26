import { useEffect, useState } from "react"
import GameCard from "./components/GameCard"
import { Game } from "./types/api"
import SearchBar from "./components/SearchBar"
import axios from "axios"
import Button from "./components/Button"

export default function App() {
	const [search, setSearch] = useState("")
	const [games, setGames] = useState<Game[] | null>(null)
	const [error, setError] = useState<{ title: string | number; description: string } | null>(null)
	const [loading, setLoading] = useState<Boolean>(true)
	const [genres, setGenres] = useState<string[] | null>(null)
	const [genre, setGenre] = useState("")

	useEffect(() => {
		fetchData()
	}, [])

	async function fetchData() {
		setLoading(true)
		try {
			const res: { data: Game[] } = await axios.get("https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/", {
				headers: { "dev-email-address": "kayky.sousa.dev@gmail.com" },
				timeout: 5000,
			})
			setGames(res.data)

			const genres = new Set<string>()
			res.data.map((game) => {
				genres.add(game.genre)
			})
			setGenres(Array.from(genres).sort())
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.code === "ECONNABORTED") {
					setError({
						title: "TIMEOUT",
						description: "O servidor demorou para responder, tente mais tarde!",
					})
				} else if (error.response?.status && error.response?.status >= 500) {
					setError({
						title: error.response.status,
						description: "O servidor fahou em responder, tente recarregar a página!",
					})
				} else {
					setError({
						title: error.response?.status ?? "ERRO",
						description: "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde!",
					})
				}
			}
		}
		setLoading(false)
	}

	if (loading) {
		return (
			<div className="min-h-screen w-full bg-gray-950 flex justify-center items-center">
				<div className="rounded-full border-rose-600 border-b-transparent border-8 h-16 w-16 animate-spin"></div>
			</div>
		)
	}

	if (error && !games) {
		return (
			<div className="min-h-screen w-full bg-gray-950 flex flex-col justify-center items-center px-6 text-center">
				<h1 className="text-6xl text-rose-600 font-bold">{error.title}</h1>
				<p className="text-2xl text-white mt-4 opacity-80">{error.description}</p>
				<Button
					className="text-xl mt-6"
					onClick={() => {
						location.reload()
					}}
				>
					Tente Novamente
				</Button>
			</div>
		)
	}

	return (
		<>
			<div className="min-h-screen w-full bg-gray-950 content-start grid pt-24 md:pt-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				{games?.map((game) => {
					if (!genre || game.genre === genre) {
						if (game.title.toLowerCase().includes(search.toLowerCase())) {
							return <GameCard game={game} key={game.id} />
						}
					}
				})}
			</div>
			<SearchBar search={search} setSearch={setSearch} genre={genre} setGenre={setGenre} genres={genres} />
		</>
	)
}
