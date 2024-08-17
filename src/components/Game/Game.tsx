import {memo, useCallback, useState} from "react";
import useCustomContext from '../../common/hooks/useCustomContext'
import PlayGame from '../PlayGame/PlayGame'
import { FaHandPaper } from "react-icons/fa";
import { FaHandScissors } from "react-icons/fa";
import { FaHandRock } from "react-icons/fa";
import { GiWell } from "react-icons/gi";
import { useTranslation } from 'react-i18next';

const data = [
    {
        id: 1,
        name: 'paper',
        image: <FaHandPaper />,
        title: 'Сhoose paper'
    },
    {
        id: 2,
        name: 'scissors',
        image: <FaHandScissors />,
        title: 'Сhoose scissors'
    },
    {
        id: 3,
        name: 'rock',
        image: <FaHandRock />,
        title: 'Сhoose rock'
    },
    {
        id: 4,
        name: 'well',
        image: <GiWell />,
        title: 'Сhoose well'
    }
]

const Game = memo(() => {

    const {showRules, controlGame, setControlGame} = useCustomContext()
    const [logicGame, setLogicGame] = useState({your: {}, skinet: {}})
    const {t} = useTranslation();

    const getSkinetItem = useCallback(() => {
        let randomId = Math.floor(Math.random() * data.length) + 1
        return data.filter(item => item.id === randomId)[0]
    }, []) 


    const getCurrentItem = useCallback((id: number) => {
        setLogicGame({your: data.filter(item => item.id === id)[0], skinet: getSkinetItem()})
        setControlGame({...controlGame, isBegin: true})
    }, [data])

    return <main className={showRules ? "game hide" : "game"}>
                {!controlGame.isBegin 
                ? <div className="game__container">
                        {data.map(item => <div title={item.title} onClick={() => getCurrentItem(item.id)} key={item.id} className="game__item">
                                    {item.image}
                                    <span>{t(item.name)}</span>
                            </div>)}
                    </div>
                 : <PlayGame getSkinetItem={getSkinetItem} logicGame={logicGame} setLogicGame={setLogicGame}  />}
            </main>
})
export  default Game;