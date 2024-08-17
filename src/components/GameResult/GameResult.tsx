import { memo } from 'react'
import useCustomContext from '../../common/hooks/useCustomContext'
import { useTranslation } from 'react-i18next';

const GameResult = memo(() => {

    const {govern, showRules} = useCustomContext()
    const { t } = useTranslation();

    return <div className={showRules ? "game__result hide" : "game__result"}>
                <div>
                    <div>{t('win')}</div>
                    <div>{t('lose')}</div>
                    <div>{t('lap')}</div>
                </div>
                <div>
                    <div>{govern.wins}</div>
                    <div>{govern.defeats}</div>
                    <div>{govern.gameCount}</div>
                </div>
            </div>
})
export default GameResult;