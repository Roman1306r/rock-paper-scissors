import { memo } from 'react'
import useCustomContext from '../../common/hooks/useCustomContext'
import { useTranslation } from 'react-i18next';

const Header = memo(() => {

    const {govern, showRules} = useCustomContext()
    const { t } = useTranslation();
 
    return <header className={showRules ? "header shrink" : "header"}>
                <h1 className="header__title">{t('headerTitle')}</h1>
                <div title="reset score" className="header__score">
                    <h2 className="header__score-title">{t('score')}</h2>
                    <span className="score">{govern.score}</span>
                </div>
            </header>
})
export  default Header;