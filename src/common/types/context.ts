export interface IContext {
	govern: IGovern,
	setGovern: (govern: IGovern) => void,
	showRules: boolean,
	setShowRules: (showRules: boolean) => void
	isRus: boolean,
	setIsRus: (isRus: boolean) => void,
	controlGame: IControlGame,
	setControlGame: (controlGame: IControlGame) => void
}

export interface IGovern {
	score: number
	gameCount: number
	wins: number
	defeats: number
}
export interface IControlGame {
	isBegin: boolean 
	isSave: boolean
	showLeaders: boolean
}

export type Children = {
    children: JSX.Element | JSX.Element[]
}