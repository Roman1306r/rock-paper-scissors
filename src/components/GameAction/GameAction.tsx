import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../common/hooks/useLocalStorage'
import { RxReset } from "react-icons/rx";
import useCustomContext from '../../common/hooks/useCustomContext'
import { MdOutlineLeaderboard } from "react-icons/md";
import { Popover  } from 'antd';
import rus from './../../assets/rus.png'
import eng from './../../assets/eng.png'
import { memo } from 'react'

const GameAction = memo(() => {

	const {setGovern, setIsRus, showRules, setControlGame, controlGame} = useCustomContext()
	const {t, i18n } = useTranslation();
	const [language, setLanguage] = useLocalStorage('language', 'ru');

	function reset() {
        localStorage.removeItem('language')
        setGovern({score: 0, gameCount: 0, wins: 0, defeats: 0})  
		setControlGame({...controlGame, isBegin: false})
    }
	function logicChangeLanguage(language: string, isRus: boolean) {
		i18n.changeLanguage(language);
        setLanguage(language);
        setIsRus(isRus)
	}

	const changeLanguage = () => language === 'en' ?  logicChangeLanguage('ru', true) : logicChangeLanguage('en', false)
        
	return (<div className={showRules ? 'game__action hide' : 'game__action'} >
				<Popover placement="leftTop" title={t('changeLanguage')}>
					<button onClick={changeLanguage}>{language === 'en' ? <img width={30} src={eng} alt='en' /> : <img width={30} src={rus} alt='ru' />}</button>
				</Popover>
				<Popover placement="leftTop" title={t('reset')}>
					<button onClick={reset}><RxReset /></button>
				</Popover>
				<Popover placement="leftTop" title={t('leaderboard')}>
					<button onClick={() => setControlGame({...controlGame, showLeaders: true})}><MdOutlineLeaderboard /></button>
				</Popover>
			</div>);
})
export default GameAction;