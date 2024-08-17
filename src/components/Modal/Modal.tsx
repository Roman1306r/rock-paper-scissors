import { Modal, Input, Descriptions, Result } from 'antd';
import type { DescriptionsProps } from 'antd';
import useCustomContext from '../../common/hooks/useCustomContext'
import { useTranslation } from 'react-i18next';
import { memo, useMemo, useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";

const ModalWindow = memo(() => {

	const {controlGame, setControlGame, govern} = useCustomContext()
	const [controlModal, setControlModal] = useState({value: '', isSaveOk: false, isValid: false})
	const {t} = useTranslation();
	const items: DescriptionsProps['items'] = useMemo(() => createItems(govern), [govern]) 

	function createItems(obj: any) {
		const result: {key: string, label: string, children: number}[] = []
		let i = 1
		for(let item in obj) {
			let prop = {
				key: String(i),
				label: t(item),
				children: obj[item]
			}
			result.push(prop)
			i++
		}
		return result
	}

	const saveToLocalStorage = () => {
		if(controlModal.isSaveOk) {
			setControlGame({...controlGame, isSave: false, showLeaders: true})
			return setControlModal({...controlModal, isSaveOk: false})
		} 
		if(controlModal.isValid) {
			if(localStorage.getItem('leaderboard')) {
				const leaderboard = JSON.parse(localStorage.getItem('leaderboard') ?? '') 
				if(leaderboard[controlModal.value]) {
					const current = leaderboard[controlModal.value]
					leaderboard[controlModal.value] = {score: current.score += govern.score, wins: current.wins += govern.wins, defeats: current.defeats += govern.defeats, gameCount: current.gameCount += govern.gameCount}
				} else {
					leaderboard[controlModal.value] = {...govern}	
				}
				localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
			} else {
				const json = {
					[controlModal.value]: {
						...govern
					} 
				}
				localStorage.setItem('leaderboard', JSON.stringify(json))
			}
			setControlModal({...controlModal, isSaveOk: true, isValid: false})
		} else alert(t('errorMessage'))
	};
	function controlValue(value: string) {
		setControlModal({...controlModal, isValid: value.length > 2 && value.length < 10 ? true : false, value})
	}
	function onClose() {
		setControlGame({...controlGame, isSave: false})
		setControlModal({...controlModal, isSaveOk: false})
	}

    return (<Modal className='modal' okText={controlModal.isSaveOk ? t('storage') : t('save')} cancelText={t('close')} centered open={controlGame.isSave} title={t('saveData')} onOk={saveToLocalStorage} onCancel={onClose}>
				{controlModal.isSaveOk 
				? <Result
						status="success"
						title={t('okMessage')}
					/>
				: <>
					<Input value={controlModal.value} onChange={(event) => controlValue(event.target.value)} maxLength={30} size="large" placeholder={t('name')} prefix={controlModal.isValid ? <FaCheck color='green' /> : <LiaTimesSolid color='red' />} />
					<Descriptions style={{margin: '20px'}} size="middle" column={1} items={items} />
				</>}
			</Modal>)
})
export  default ModalWindow;