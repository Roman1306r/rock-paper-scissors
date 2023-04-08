import React from "react";

const Rules = ({setRules}) => {


    function closeRules(e) {
        e.stopPropagation()
        if(e.target.classList.contains('rules')) setRules(false)
    }

    return <div onClick={closeRules} className="rules">
                <div className="rules__body">
                    <a onClick={() => setRules(false)} className="rules__back" href="#">&times;</a>
                    <h2>The winner is determined by the following rules:</h2>
                    <ul>
                        <li>Paper defeats stone ("paper wraps stone").</li>
                        <li>Stone defeats scissors ("stone blunts or breaks scissors").</li>
                        <li>Scissors beat paper ("scissors cut paper").</li>
                    </ul>
                    <p>If the players showed the same sign, then a draw is counted and the game is replayed.</p>
                    <p>To reset, click on the score.</p>
                </div>
            </div>
}

export  default Rules;