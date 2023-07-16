import { useContext } from "react"
import { UserGamesContext } from "../contexts/UserGamesProvider"

export function useUserGames() {
	return useContext(UserGamesContext)
}
