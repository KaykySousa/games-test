import { FirebaseError } from "firebase/app"
import { User, onAuthStateChanged, signInWithPopup, signOut as signOutAuth } from "firebase/auth"
import { ReactNode, createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { auth, provider } from "../services/firebase"

interface IAuthContext {
	isSignIn: boolean
	setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>
	user: IUser | null
	signOut: () => void
	signInWithGoogle: () => Promise<void>
}

interface IUser {
	id: string
	name: string | null
	email: string | null
	avatar: string | null
}

export const AuthContext = createContext({} as IAuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [isSignIn, setIsSignIn] = useState(true)
	const [user, setUser] = useState<IUser | null>(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				handleUser(user)
			} else {
				setUser(null)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [])

	function signOut() {
		try {
			signOutAuth(auth)
		} catch (error) {
			toast.error("Erro ao tentar sair. Tente novamente.")
		}
	}

	async function handleUser(user: User) {
		const { uid, displayName, email, photoURL } = user

		setUser({
			id: uid,
			avatar: photoURL,
			email,
			name: displayName,
		})
	}

	async function signInWithGoogle() {
		try {
			const result = await signInWithPopup(auth, provider)
		} catch (error) {
			if (error instanceof FirebaseError) {
				toast.error(error.code.replace("auth/", "").replaceAll("-", " "), {
					bodyClassName: "capitalize",
				})
			} else {
				toast.error("Algo deu errado. Tente novamente.")
			}
		}
	}

	return (
		<AuthContext.Provider
			value={{
				isSignIn,
				setIsSignIn,
				user,
				signOut,
				signInWithGoogle,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
