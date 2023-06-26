import { Game } from "../types/api"

interface GameCardProps {
	game: Game
}

export default function GameCard({ game }: GameCardProps) {
	return (
		<a href={game.game_url} className="group" target="_blank">
			<div className="w-full aspect-video overflow-hidden relative after:game-thumbnail-gradient after:absolute after:top-0 after:left-0 after:w-full after:h-full">
				<img src={game.thumbnail} alt={`${game.title} thumbnail`} loading="lazy" className="w-full h-full group-hover:scale-110 group-focus:scale-110 transition-transform ease-in-out" />
			</div>
			<div className="p-4 pb-5 text-white game-info-gradient w-full bg-gray-950">
				<h1 className="text-xl font-medium transition-colors group-hover:text-rose-600 group-focus:text-rose-600">{game.title}</h1>
				<p className="mt-3 opacity-80">{game.short_description}</p>
			</div>
		</a>
	)
}
