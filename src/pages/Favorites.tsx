import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import GameList from "../components/GameList"
import { useAuth } from "../hooks/useAuth"

export default function FavoritesPage() {
	const { user } = useAuth()

	if (!user) {
		toast.info("Faça login para acessar os favoritos")
		return <Navigate to="/auth" replace />
	}

	return <GameList favorites={true} />
}
