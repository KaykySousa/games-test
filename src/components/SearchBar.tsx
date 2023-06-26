import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { InputHTMLAttributes } from "react"

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
	genres: string[] | null
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
	genre: string
	setGenre: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ search, setSearch, genre, setGenre, genres }: SearchBarProps) {
	return (
		<div className="shadow-md bg-gray-950 fixed w-full top-0 max-w-3xl flex flex-col md:flex-row md:items-center opacity-80 transition-opacity border-b shadow-rose-900 border-rose-600 md:border focus-within:ring-1 focus-within:ring-rose-600 hover:opacity-100 focus-within:opacity-100 md:w-[calc(100%-64px)] md:top-8 md:left-1/2 md:-translate-x-1/2 md:rounded-md">
			<MagnifyingGlassIcon className="h-6 w-6 text-rose-600 ml-4 hidden md:block" />
			<input type="search" placeholder="Busque sua próxima aventura!" className="px-4 py-3 flex-[2] text-white !border-0 !ring-0 bg-transparent" value={search} onChange={(e) => setSearch(e.target.value)} />
			<select className="text-white px-4 py-3 flex-1 !border-0 !ring-0 bg-transparent" value={genre} onChange={(e) => setGenre(e.target.value)}>
				<option value="" className="bg-gray-950">
					Todos os Gêneros
				</option>
				{genres?.map((genre) => (
					<option key={genre} className="bg-gray-950" value={genre}>
						{genre}
					</option>
				))}
			</select>
		</div>
	)
}
