import {memo, useCallback, useEffect, useState} from "react";
import useCustomContext from '../../common/hooks/useCustomContext'
import { IDataGame, IGameProps, NotificationType } from '../../common/types/game'
import { notification, Button, Popover  } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaCheck } from "react-icons/fa6";
import { TfiSave } from "react-icons/tfi";
import { GrPowerReset } from "react-icons/gr";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const PlayGame = memo(({setLogicGame, logicGame, getSkinetItem}: IGameProps) => {

    const {govern, setGovern, setControlGame, controlGame} = useCustomContext()
    const [skinet, setSkinet] = useState({id: 0, name: '', image: '', title: ''})
    const [api, contextHolder] = notification.useNotification();
    const {t} = useTranslation();
    const [winIndicator, setWinIndicator] = useState<number>(1)
    const openNotificationWithIcon = (type: NotificationType, title: string) => {
        api[type]({
          message: t(title),
          description: title === 'victory' ? t('descWin') : t('descLose'),
            showProgress: true,
            pauseOnHover: true,
            placement: "top",
        });
    };

    function loseFn() {
        setGovern({...govern, defeats: govern.defeats += 1, score: govern.score -= 1})
        openNotificationWithIcon('warning', 'defeat')
        setWinIndicator(-1)
    }

    function winFn() {
        setGovern({...govern, wins: govern.wins += 1, score: govern.score += 1})
        openNotificationWithIcon('success', 'victory')
        setWinIndicator(1)
    }

    const isWin = useCallback((skinet: IDataGame) => {
        if(logicGame.your.id === skinet.id) {
            openNotificationWithIcon('warning', 'drawTitle')
            setWinIndicator(2)
        }
        if(logicGame.your.id === 1 && skinet.id === 3 || logicGame.your.id === 1 && skinet.id === 4 || logicGame.your.id === 2 && skinet.id === 1 || logicGame.your.id === 3 && skinet.id === 2 || logicGame.your.id === 4 && skinet.id === 2 || logicGame.your.id === 4 && skinet.id === 3) {
            winFn()
        } else if(logicGame.your.id === 1 && skinet.id === 2 || logicGame.your.id === 2 && skinet.id === 3 || logicGame.your.id === 2 && skinet.id === 4 || logicGame.your.id === 3 && skinet.id === 1 || logicGame.your.id === 3 && skinet.id === 4 || logicGame.your.id === 4 && skinet.id === 1) {
            loseFn()
        }
    }, [skinet])

    useEffect(() => { 
            checkWinner(logicGame.skinet)
    }, [])

    function checkWinner(skinet: IDataGame) {
        setSkinet({id: 0, name: '', image: '', title: ''})
        setWinIndicator(1)
        setTimeout(() => {
            setSkinet(skinet)
            setLogicGame({...logicGame, skinet})
            isWin(skinet)
            setGovern({...govern, gameCount: govern.gameCount += 1})
        }, 1000)
    }

    return  <div className="playgame">
                    {contextHolder}
                    <div title={logicGame.your.title} className={winIndicator > 0 ? 'game__item you' : 'game__item lose you'}>
                        {logicGame.your.image}
                        <span>{t('you')}</span>
                    </div>
                    <div className='playgame__actions'>
                        <Popover title={t('play')}>
                            <Button shape='round' ghost size={window.innerWidth < 767 ? 'small' : 'large'} className='btn' onClick={() => setControlGame({...controlGame, isBegin: false})}  icon={<FaCheck />} type="default" />
                        </Popover>
                        <Popover title={t('againgame')}>
                            <Button shape='round' ghost size={window.innerWidth < 767 ? 'small' : 'large'} className='btn' onClick={() => checkWinner(getSkinetItem())}  icon={<GrPowerReset />} type="default" />
                        </Popover>
                        <Popover title={t('save')}>
                            <Button onClick={() => setControlGame({...controlGame, isSave: true})} shape='round' ghost size={window.innerWidth < 767 ? 'small' : 'large'} className='btn'  icon={<TfiSave />} type="default" />
                        </Popover>  
                    </div>
                    <div title={skinet?.title || ''} className={winIndicator < 0 || winIndicator === 2 ? 'game__item skinet' : 'game__item lose skinet'} >
                        {!skinet?.id    
                        ? <CgSpinnerTwoAlt className='spin' />
                        : <>{logicGame.skinet.image}
                         <span>{t('skinet')}</span></>
                        }                     
                    </div>
            </div>
})
export default PlayGame;
