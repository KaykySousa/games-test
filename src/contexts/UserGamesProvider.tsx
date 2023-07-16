import { doc, onSnapshot, setDoc } from "firebase/firestore"
import { ReactNode, createContext, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { db } from "../services/firebase"

interface IUserGamesContext {
	userFavorites: number[] | null
	userRatings: {
		[key: string]: number
	} | null
	handleFavorite: (userId: number) => void
	handleRating: (userId: number, rating: number) => void
}

interface IUserGames {
	favorites?: number[]
	ratings?: {
		[key: string]: number
	}
}

export const UserGamesContext = createContext({} as IUserGamesContext)

export default function UserGamesProvider({ children }: { children: ReactNode }) {
	const { user } = useAuth()

	const [userFavorites, setUserFavorites] = useState<number[] | null>(null)
	const [userRatings, setUserRatings] = useState<{
		[key: string]: number
	} | null>(null)

	useEffect(() => {
		if (!user) {
			setUserFavorites(null)
			setUserRatings(null)
			return
		}

		const unsubscribe = onSnapshot(doc(db, "users", user.id), (userGamesSnap) => {
			const userGames = userGamesSnap.exists() ? (userGamesSnap.data() as IUserGames) : null

			setUserFavorites(userGames?.favorites ?? null)
			setUserRatings(userGames?.ratings ?? null)
		})

		return () => {
			unsubscribe()
		}
	}, [user])

	function handleFavorite(gameId: number) {
		if (!user) return

		const favorites = new Set(userFavorites)

		if (!favorites.delete(gameId)) {
			favorites.add(gameId)
		}

		setDoc(
			doc(db, "users", user.id),
			{
				favorites: Array.from(favorites),
			},
			{
				merge: true,
			}
		)
	}

	function handleRating(gameId: number, rating: number) {
		if (!user) return

		const ratings = {
			...userRatings,
			[gameId]: rating,
		}

		setDoc(
			doc(db, "users", user.id),
			{
				ratings,
			},
			{
				merge: true,
			}
		)
	}

	return (
		<UserGamesContext.Provider
			value={{
				userRatings,
				userFavorites,
				handleFavorite,
				handleRating,
			}}
		>
			{children}
		</UserGamesContext.Provider>
	)
}
