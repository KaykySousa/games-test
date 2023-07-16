import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import AuthProvider from "./contexts/AuthProvider"
import GamesProvider from "./contexts/GamesProvider"
import UserGamesProvider from "./contexts/UserGamesProvider"

import GameList from "./components/GameList"
import Layout from "./components/Layout"
import AuthPage from "./pages/Auth"
import FavoritesPage from "./pages/Favorites"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <GameList />,
			},
			{
				path: "favorites",
				element: <FavoritesPage />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthPage />,
	},
])

export default function App() {
	return (
		<>
			<AuthProvider>
				<UserGamesProvider>
					<GamesProvider>
						<RouterProvider router={router} />
					</GamesProvider>
				</UserGamesProvider>
			</AuthProvider>
			<ToastContainer
				toastClassName={(ctx) => {
					if (ctx?.type === "error") return `${ctx?.defaultClassName ?? ""} !bg-rose-600`
					if (ctx?.type === "info") return `${ctx?.defaultClassName ?? ""} !bg-blue-800`
					return ctx?.defaultClassName ?? ""
				}}
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</>
	)
}
