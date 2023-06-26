export interface Game {
	id: number
	title: string
	thumbnail: string
	short_description: string
	game_url: string
	genre: Genre
	platform: string
	publisher: string
	developer: string
	release_date: Date
	freetogame_profile_url: string
}

export enum Genre {
	ActionRPG = "Action RPG",
	Arpg = "ARPG",
	BattleRoyale = "Battle Royale",
	CardGame = "Card Game",
	Fantasy = "Fantasy",
	Fighting = "Fighting",
	MMORPG = "MMORPG",
	Mmo = "MMO",
	Mmoarpg = "MMOARPG",
	Moba = "MOBA",
	Racing = "Racing",
	Shooter = "Shooter",
	Social = "Social",
	Sports = "Sports",
	Strategy = "Strategy",
}
