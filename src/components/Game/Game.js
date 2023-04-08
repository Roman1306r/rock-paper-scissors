import React, {useState} from "react";
import PlayGame from "../PlayGame/PlayGame";
import {data} from "../common/data";


const Game = ({setScore, score, setGameScore, gameScore}) => {
    const [playGame, setPlayGame] = useState(false)
    const [dataItem, setDataItem] = useState(data)
    const [currentItem, setCurrentItem] = useState({})
    const [enemyItem, setEnemyItem] = useState(() => getEnemyItem(dataItem.length))



    function getEnemyItem(l) {
        let randomId = Math.floor(Math.random() * dataItem.length) + 1
        return dataItem.find(item => item.id === randomId)
    }
    function getCurrentItem(id) {
        setPlayGame(true)
        setEnemyItem(getEnemyItem(dataItem.length))
        setCurrentItem(dataItem.find(item => item.id === id))
        setGameScore(gameScore += 1)
        if(!localStorage.length) {
            localStorage.setItem('gameScore', gameScore)
        } else {
            let a = localStorage.getItem('gameScore')
            localStorage.setItem('gameScore', +a + 1)
        }

    }


    let gameItem = dataItem.map(item => <div title={item.title} onClick={() => getCurrentItem(item.id)} key={item.id} className="game__item"><img src={item.image} alt={item.name}/></div>)

    return <main className="game">
                {!playGame && <div className="game__container">{gameItem}</div>}
                {playGame && <PlayGame setScore={setScore} score={score} setPlayGame={setPlayGame} currentItem={currentItem} enemyItem={enemyItem}  />}
            </main>
}

export  default Game;