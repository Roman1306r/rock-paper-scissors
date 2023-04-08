import React, {useEffect, useState} from "react";
import Picked from "../Picked/Picked";



const PlayGame = ({currentItem, setPlayGame, enemyItem, setScore, score}) => {

    const [win, setWin] = useState('')

    function loseFn() {
        setScore(score -= 1)
        if(!localStorage.length) {
            localStorage.setItem('score', score)
        } else {
            let a = localStorage.getItem('score')
            localStorage.setItem('score', +a - 1)
        }
        setWin('lose')
    }
    function winFn() {
        setScore(score += 1)
        if(!localStorage.length) {
            localStorage.setItem('score', score)
        } else {
            let a = localStorage.getItem('score')
            localStorage.setItem('score', +a + 1)
        }
        setWin('win')
    }
    useEffect(() => {
        function isWin() {
            if(currentItem.id === enemyItem.id) setWin('draw')
            else if(currentItem.id === 1 && enemyItem.id === 2) loseFn()
            else if (currentItem.id === 1 && enemyItem.id === 3) winFn()
            else if (currentItem.id === 2 && enemyItem.id === 1) winFn()
            else if (currentItem.id === 2 && enemyItem.id === 3) loseFn()
            else if (currentItem.id === 3 && enemyItem.id === 1) loseFn()
            else if (currentItem.id === 3 && enemyItem.id === 2) winFn()
        }
        isWin()
    }, [])



    return <><Picked />
            <div className="playgame">
                <div className="game__item"><img src={currentItem.image} alt={currentItem.name}/></div>
                <div className="playgame__winner">
                    <h2 className={win === 'win' ? 'win' : 'lose'}>{win}</h2>
                    <button onClick={() => setPlayGame(false)}>Play again</button>
                </div>
                <div className="game__item"><img src={enemyItem.image} alt={enemyItem.name}/></div>
            </div>
            </>
}

export default PlayGame;