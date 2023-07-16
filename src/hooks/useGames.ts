import { useContext } from "react"
import { GamesContext } from "../contexts/GamesProvider"

export function useGames() {
	return useContext(GamesContext)
}
