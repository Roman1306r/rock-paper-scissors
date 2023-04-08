import React from "react";



const GameAction = ({gameScore}) => {


    return <button className="gameaction">GAME: {localStorage.getItem('gameScore') || gameScore}</button>
}

export default GameAction;