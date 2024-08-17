import React, { useState } from 'react';
import { Children, IContext, IControlGame, IGovern } from '../../common/types/context'

export const AppContext = React.createContext<IContext>({
  govern: {score: 0, gameCount: 0, wins: 0, defeats: 0},
  setGovern: () => {},
  showRules: false,
  setShowRules: () => {},
  isRus: false,
  setIsRus: () => {},
  controlGame: {isBegin: false, isSave: false, showLeaders: false},
  setControlGame: () => {}
});

export const AppProvider = ({children} : Children) => {

  const [govern, setGovern] = useState<IGovern>({score: 0, gameCount: 0, wins: 0, defeats: 0})
  const [showRules, setShowRules] = useState<boolean>(false)
  const [isRus, setIsRus] = useState<boolean>(false)
  const [controlGame, setControlGame] = useState<IControlGame>({isBegin: false, isSave: false, showLeaders: false})
  
  return (<AppContext.Provider
            value={{govern, setGovern, showRules, setShowRules, isRus, setIsRus, controlGame, setControlGame}}>{children}
        </AppContext.Provider>)
}
