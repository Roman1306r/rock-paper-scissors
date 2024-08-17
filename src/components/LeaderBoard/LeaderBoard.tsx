import { Modal, Table, TableProps } from 'antd';
import useCustomContext from '../../common/hooks/useCustomContext'
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { DataType, TransformedData } from '../../common/types/game'

const LeaderBoard = memo(() => {

	const {controlGame, setControlGame} = useCustomContext()
	const { t } = useTranslation();
	const [data, setData] = useState([])

	function getStructure() {
		const columns: TableProps<DataType>['columns'] = [
			{
			  title: t('name'),
			  dataIndex: 'name',
			  key: 'name'
			},
			{
			  title: t('score'),
			  dataIndex: 'score',
			  key: 'score',
			  align: 'center',
			  render(text) {	
				return <b>{t(text)}</b>
			  }
			},
			{
			  title: t('wins'),
			  dataIndex: 'wins',
			  key: 'wins',
			  align: 'center'
			},
			{
			  title: t('defeats'),
			  dataIndex: 'defeats',
			  key: 'defeats',
			  align: 'center'
			},
			{
			  title: t('lap'),
			  dataIndex: 'gameCount',
			  key: 'gameCount',
			  align: 'center'
			},
			{
			  title: '',
			  key: 'action',
			  dataIndex: 'action',
			  align: 'center',
			  render(_text, record, _index) {	
				  return <a onClick={() => deleteLeader(record.name)}>{t('delete')}</a>
			  },
			},
		];
		return columns
	}
	
	const columns = useMemo(() => getStructure(), []) 

	function deleteLeader(name: string) {
		if(localStorage.getItem('leaderboard')) {
			let data = JSON.parse(localStorage.getItem('leaderboard') || '')
			delete data[name]
			localStorage.setItem('leaderboard', JSON.stringify(data))	
			transformToCorrectData(data)
		}
	}

	const transformToCorrectData = useCallback((data: TransformedData) => {
		const result: DataType[] | any = []
		let i = 1
		for( let leader in data) {
			result.push({key: String(i), name: leader, score: data[leader].score, wins: data[leader].wins, defeats: data[leader].defeats, gameCount: data[leader].gameCount})
			i++
		}
		const sortedData = result.sort((a : DataType, b: DataType) => a.score > b.score ? -1 : 1)
		setData(sortedData)
	}, [data])

	useEffect(() => {
		if(localStorage.getItem('leaderboard')) {
			let data = JSON.parse(localStorage.getItem('leaderboard') || '')
			transformToCorrectData(data)
		}
	}, [])

    return (<Modal okType="default" width={window.innerWidth < 1030 ? '100%' : '60%'} className='modal' okText={''} cancelText={t('close')} centered open={controlGame.showLeaders} title={t('leaderTitle')} onOk={() => setControlGame({...controlGame, showLeaders: false})} onCancel={() => setControlGame({...controlGame, showLeaders: false})}>
				{!data.length ? t('emptyLeader') : <Table tableLayout="fixed" size="small" pagination={false} columns={columns} dataSource={data} />}
			</Modal>)
})
export  default LeaderBoard;