export interface IDataGame {
	id: number
	name: string
	image: never
	title: string
}

export interface IGameProps {
	setLogicGame: (logicGame: {your: IDataGame, isBegin: boolean, skinet: IDataGame}) => void
	logicGame: {your: IDataGame , skinet: IDataGame} | any
	getSkinetItem: () => any
}

export interface DataType {
	key: string;
	name: string;
	score: number;
	wins: number;
	defeats: number;
	gameCount: number;
}
export interface TransformedData {
	[key: string]: {
		score: number;
		wins: number;
		defeats: number;
		gameCount: number;
	}
}




export type NotificationType = 'success' | 'info' | 'warning' | 'error';