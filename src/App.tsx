import { useEffect } from 'react'
import './App.css';
import useCustomContext from './common/hooks/useCustomContext'
import Header from './components/Header/Header'
import Rules from './components/Rules/Rules'
import { useTranslation } from 'react-i18next';
import Game from './components/Game/Game'
import GameResult from './components/GameResult/GameResult'
import GameAction from './components/GameAction/GameAction'
import ModalWindow from './components/Modal/Modal'
import LeaderBoard from './components/LeaderBoard/LeaderBoard'

function App() {

  const {t} = useTranslation();
  const {showRules, setShowRules, isRus, setIsRus, controlGame} = useCustomContext()
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('language') ?? 'ru') == "ru") setIsRus(true)
    window.addEventListener('load', () => setShowRules(true)) 
  }, [])
  
  return (<div className={isRus ? "App ru" : "App"}>
              <Header />
              <Game />
              <GameResult />
              <Rules />
              <GameAction />
              {controlGame.isSave && <ModalWindow />}
              {controlGame.showLeaders && <LeaderBoard />}
              <button onClick={() => setShowRules(true)} className={showRules ? "open__rules hide" : "open__rules"}>{t('rules')}</button>
          </div>);
}
export default App;
