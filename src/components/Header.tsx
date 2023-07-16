import {
	ArrowLeftOnRectangleIcon,
	ArrowRightOnRectangleIcon,
	BarsArrowDownIcon,
	BarsArrowUpIcon,
	HeartIcon,
	HomeIcon,
	MagnifyingGlassIcon,
	UserCircleIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../hooks/useAuth"
import { useGames } from "../hooks/useGames"
import SearchBar from "./SearchBar"
import Button from "./design/Button"
import GoogleButton from "./design/GoogleButton"
import IconButton from "./design/IconButton"

export default function Header() {
	const [showAuthDropdown, setShowAuthDropdown] = useState(false)
	const [showSearch, setShowSearch] = useState(false)

	const { user, signOut } = useAuth()
	const { sortIsAsc, toggleSortOrder } = useGames()
	const { pathname } = useLocation()

	useEffect(() => {
		document.addEventListener("click", () => {
			setShowAuthDropdown(false)
		})

		return () => {
			document.removeEventListener("click", () => {
				setShowAuthDropdown(false)
			})
		}
	}, [])

	return (
		<header className="shadow shadow-rose-600 fixed h-20 w-full z-40 bg-gray-950 flex items-center justify-between px-4">
			<div className="flex items-center gap-x-4">
				<IconButton
					className="md:hidden"
					title="Pesquisar"
					onClick={() => setShowSearch(!showSearch)}
				>
					{!showSearch ? (
						<MagnifyingGlassIcon className="h-8 w-8 text-rose-600" />
					) : (
						<XMarkIcon className="h-8 w-8 text-rose-600" />
					)}
				</IconButton>
				<SearchBar className="!hidden md:!flex" />
				<IconButton
					title="Ordenar avaliações"
					onClick={() => {
						toggleSortOrder()
					}}
				>
					{sortIsAsc ? (
						<BarsArrowUpIcon className="h-8 w-8 text-rose-600" />
					) : (
						<BarsArrowDownIcon className="h-8 w-8 text-rose-600" />
					)}
				</IconButton>
			</div>

			<div className="flex items-center gap-x-4">
				{pathname === "/" ? (
					<Link
						to="/favorites"
						title="Ir para os favoritos"
						onClick={(e) => {
							if (!user) {
								e.preventDefault()
								toast.info("Faça login para acessar os favoritos")
							}
						}}
					>
						<IconButton>
							<HeartIcon className="h-8 w-8 text-rose-600" />
						</IconButton>
					</Link>
				) : (
					<Link to="/" title="Ir para os jogos">
						<IconButton>
							<HomeIcon className="h-8 w-8 text-rose-600" />
						</IconButton>
					</Link>
				)}
				<div className="relative" onClick={(e) => e.stopPropagation()}>
					<IconButton
						title="Informações da conta"
						onClick={(e) => {
							setShowAuthDropdown(!showAuthDropdown)
						}}
					>
						{user?.avatar ? (
							<img src={user.avatar} alt="" className="h-10 w-10 rounded-full" />
						) : (
							<UserCircleIcon className="h-10 w-10 text-rose-600" />
						)}
					</IconButton>
					{showAuthDropdown && (
						<div className="flex flex-col shadow absolute z-20 top-full min-w-[12rem] right-0 bg-gray-900 text-white rounded p-3">
							{user ? (
								<>
									<p className="font-medium">{user?.name}</p>
									<p className="text-xs mb-3">{user?.email}</p>
									<Button className="!h-10" title="Sair da conta" onClick={signOut}>
										<ArrowRightOnRectangleIcon className="h-5 w-5 text-current mr-1" />
										Sair
									</Button>
								</>
							) : (
								<>
									<Link to="/auth">
										<Button className="!h-10 w-full" title="Entrar com E-mail">
											<ArrowLeftOnRectangleIcon className="h-5 w-5 text-current mr-1" />
											Entrar
										</Button>
									</Link>
									<GoogleButton className="!h-10 mt-2" title="Entrar com o Google">
										Google
									</GoogleButton>
								</>
							)}
						</div>
					)}
				</div>
			</div>

			{showSearch && (
				<div className="absolute top-20 left-0 w-full bg-gray-950 p-4 pt-0 md:hidden">
					<SearchBar />
				</div>
			)}
		</header>
	)
}
