import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useGames } from "../hooks/useGames"
import Input from "./design/Input"
import Select from "./design/Select"

interface SearchBarProps {
	className?: string
}

export default function SearchBar({ className = "" }: SearchBarProps) {
	const { search, setSearch, genre, setGenre, genres } = useGames()

	return (
		<div className={`flex flex-col gap-2 md:flex-row ${className}`}>
			<Input
				type="search"
				title="Buscar pelo título"
				Icon={MagnifyingGlassIcon}
				placeholder="Busque"
				className="flex-[2]"
				theme="secondary"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Select
				className="flex-1"
				title="Filtrar pelo gênero"
				value={genre}
				onChange={(e) => setGenre(e.target.value)}
			>
				<option value="" className="bg-gray-950">
					Todos os Gêneros
				</option>
				{genres?.map((genre) => (
					<option key={genre} className="bg-gray-950" value={genre}>
						{genre}
					</option>
				))}
			</Select>
		</div>
	)
}
