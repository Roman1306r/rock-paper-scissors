import React, {useState} from "react";
import './App.css';
import Header from "./components/Header/Header";
import Rules from "./components/Rules/Rules";
import ButtonRules from "./components/ButtonRules/ButtonRules";
import Game from "./components/Game/Game";
import GameAction from "./components/GameAction/GameAction";




function App() {
    const [rules, setRules] = useState(false)
    const [score, setScore] = useState(0)
    const [gameScore, setGameScore] = useState(0)


  return (
    <div className="App">
        <Header setGameScore={setGameScore} setScore={setScore} score={score} />
        <Game setScore={setScore} score={score} setGameScore={setGameScore} gameScore={gameScore}  />


        <ButtonRules setRules={setRules} />
        <GameAction gameScore={gameScore} />
        {rules && <Rules setRules={setRules} />}
    </div>
  );
}

export default App;
