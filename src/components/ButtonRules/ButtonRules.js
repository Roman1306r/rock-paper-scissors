import React from "react";

const ButtonRules = ({setRules}) => {
    return <button onClick={() => setRules(true)} className="open__rules">Rules</button>
}

export  default ButtonRules;