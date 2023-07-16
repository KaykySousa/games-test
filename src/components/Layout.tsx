import { Outlet } from "react-router-dom"
import { useGames } from "../hooks/useGames"
import GoToTop from "./GoToTop"
import Header from "./Header"
import Button from "./design/Button"

export default function Layout() {
	const { games, error, loading } = useGames()

	if (games) {
		return (
			<div className="min-h-screen w-full bg-gray-950">
				<Header />
				<Outlet />
				<GoToTop />
			</div>
		)
	}

	if (loading) {
		return (
			<div className="min-h-screen w-full bg-gray-950 flex justify-center items-center">
				<div className="rounded-full border-rose-600 border-b-transparent border-8 h-16 w-16 animate-spin"></div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen w-full bg-gray-950 flex flex-col justify-center items-center px-6 text-center">
				<h1 className="text-6xl text-rose-600 font-bold">{error.title}</h1>
				<p className="text-2xl text-white mt-4 opacity-80">{error.description}</p>
				<Button className="text-xl mt-6" onClick={() => location.reload()}>
					Tente Novamente
				</Button>
			</div>
		)
	}
}
