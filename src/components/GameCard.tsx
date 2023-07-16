import { HeartIcon } from "@heroicons/react/24/outline"
import { useRef } from "react"
import { IGame } from "../types/api"
import RatingFavorite from "./RatingFavorite"

interface GameCardProps {
	game: IGame
}

export default function GameCard({ game }: GameCardProps) {
	const favAnimation = useRef<HTMLDivElement | null>(null)

	return (
		<div className="relative group outline-none flex flex-col">
			<div
				ref={favAnimation}
				className="hidden absolute bg-rose-600 h-full w-full top-0 left-0 z-10 justify-center items-center"
				onAnimationEnd={() => {
					if (!favAnimation.current) return
					favAnimation.current.style.animation = ""
					favAnimation.current.style.display = "none"
				}}
			>
				<HeartIcon className="h-24 w-24 text-white fill-white" />
			</div>

			<div className="w-full aspect-video overflow-hidden relative after:bg-gradient-to-t after:from-gray-950 after:to-25% after:absolute after:top-0 after:left-0 after:w-full after:h-full">
				<img
					src={game.thumbnail}
					alt={`${game.title} thumbnail`}
					loading="lazy"
					className="w-full h-full group-hover:scale-110 group-focus:scale-110 transition-transform ease-in-out"
				/>
			</div>
			<div className="p-4 pb-5 text-white w-full bg-gray-950 flex flex-col flex-1">
				<a
					tabIndex={0}
					href={game.game_url}
					title="Saiba mais"
					className="self-start text-xl font-medium transition-colors group-hover:text-rose-600 group-focus-within:text-rose-600 underline-offset-4 hover:underline focus:underline"
				>
					{game.title}
				</a>
				<p className="mt-3 opacity-80 flex-1">{game.short_description}</p>

				<RatingFavorite
					gameId={game.id}
					playFavAnimation={() => {
						if (!favAnimation.current) return
						favAnimation.current.style.animation = "fade-in 500ms ease 2 forwards alternate"
						favAnimation.current.style.display = "flex"
					}}
				/>
			</div>
		</div>
	)
}
