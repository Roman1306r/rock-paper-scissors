import useCustomContext from '../../common/hooks/useCustomContext'
import { IoIosClose } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { AiFillInfoCircle } from "react-icons/ai";
import { memo, useCallback } from 'react'

const Rules = memo(() => {

    const {setShowRules, showRules} = useCustomContext()
    const {t} = useTranslation();

    const closeRules = useCallback((event: any) => {
        event.stopPropagation()
        if(event.target?.classList.contains('rules')) setShowRules(false)
    }, [])

    return <div onClick={closeRules} className={showRules ? "rules active" : "rules"}>
                <div className="rules__body">
                    <IoIosClose className="rules__back" onClick={() => setShowRules(false)}  />
                    <h2>{t('rulesTitle')}</h2>
                    <ul>
                        <li>{t('rulesDesc1')}</li>
                        <li>{t('rulesDesc2')}</li>
                        <li>{t('rulesDesc3')}</li>
                    </ul>
                    <p><AiFillInfoCircle /> {t('draw')}</p>
                    <div className="rules__btn"><button onClick={() => setShowRules(false)}>{t('play')}</button></div>
                </div>
            </div>
})
export  default Rules;