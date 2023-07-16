import { HeartIcon, StarIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../hooks/useAuth"
import { useUserGames } from "../hooks/useUserGames"
import IconButton from "./design/IconButton"

interface RatingFavoriteProps {
	gameId: number
	playFavAnimation: () => void
}

export default function RatingFavorite({ gameId, playFavAnimation }: RatingFavoriteProps) {
	const { user } = useAuth()
	const { userFavorites, userRatings, handleFavorite, handleRating } = useUserGames()

	const navigate = useNavigate()

	return (
		<div className="flex items-center justify-between mt-3">
			<div className="flex">
				{[...Array(4)].map((_, index) => (
					<IconButton
						title={`Nota ${index + 1}`}
						onClick={() => {
							if (!user) {
								navigate("/auth")
								toast.info("Faça login para avaliar")
								return
							}
							handleRating(gameId, index + 1)
						}}
						key={index}
						className="group"
					>
						<StarIcon
							className={`h-6 w-6 text-amber-600 opacity-75 hover:opacity-100 group-focus:opacity-100 ${
								(userRatings ? userRatings[gameId] ?? 0 : 0) > index &&
								"fill-amber-600 !opacity-100"
							}`}
						/>
					</IconButton>
				))}
			</div>

			<IconButton
				title="Adicionar aos favoritos"
				onClick={() => {
					if (!user) {
						navigate("/auth")
						toast.info("Faça login para adicionar aos favoritos")
						return
					}

					if (!userFavorites?.includes(gameId)) playFavAnimation()

					handleFavorite(gameId)
				}}
			>
				<HeartIcon
					className={`h-6 w-6 text-rose-600 opacity-75 hover:opacity-100 group-focus:opacity-100 ${
						userFavorites?.includes(gameId) && "fill-rose-600 !opacity-100"
					}`}
				/>
			</IconButton>
		</div>
	)
}
