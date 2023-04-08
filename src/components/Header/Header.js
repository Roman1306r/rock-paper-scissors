import React from "react";

const Header = ({score, setScore, setGameScore}) => {

    function reset() {
        localStorage.clear()
        setGameScore(0)
        setScore(0)
    }


    return <header className="header">
                <h1 className="header__title">Rock <br/> Paper <br/> Scissors</h1>
                <div onClick={reset} title="reset score" className="header__score">
                    <h2 className="header__score-title">Score</h2>
                    <span  className="score">{localStorage.getItem('score') || score}</span>
                </div>
            </header>
}

export  default Header;