import s from './Detail.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
//Api
import { useGetUpdQuery } from '../../redux/updsApiActions';
//slice
import {
    setCustomer,
    setDetail,
    setNumberBill,
    setNumberBillFirst,
    setDate,
    setOrders,
    setDraft,
    setSignatory,
    setContract,
    setDateContract,
    setNumContract
} from '../../redux/mainInfo/slice';
import { setLogs, setExchange } from '../../redux/logs/slice';
import { setPositions } from '../../redux/positions/slice';
//components
import Upd from '../../components/Upd/Upd';
import SceletonBill from '../../components/SceletonBill/SceletonBill';

const Detail = () => {
    const [anim, setAnim] = useState(false)
    const [type, setType] = useState('detail')
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname?.split('/').pop()
    const { data, isLoading, isFetching } = useGetUpdQuery(id);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])


    useEffect(() => {
        if (data) {
            document.title = `УПД №${data?.number} от ${dayjs(data?.date).format('DD.MM.YYYY')}`
            data?.draft === 1 && setType('draft')
            dispatch(setDraft(data?.draft))
            dispatch(setDate(dayjs(data?.date)))
            dispatch(setNumberBill(data?.number))
            dispatch(setNumberBillFirst(data?.number))
            dispatch(setOrders(data?.orders))
            dispatch(setExchange(data?.exchange))
            dispatch(setLogs(data?.logs))
            dispatch(setContract(data?.details?.contract ? data?.details?.contract : ''))
            dispatch(setDateContract(data?.details?.contract_date ? data?.details?.contract_date : ''))
            dispatch(setNumContract(data?.details?.contract_n ? data?.details?.contract_n : ''))
            if (data?.draft === 1) {
                dispatch(setContract('Договор'))
                dispatch(setDateContract(data?.company?.contract_date ? data?.company?.contract_date : ''))
                dispatch(setNumContract(data?.company?.contract_n ? data?.company?.contract_n : ''))
            }
            const rows = data?.rows?.map((el, i) => {
                return {
                    id: i + 1,
                    rate: { id: 999, name_service: el?.description },
                    count: Number(el?.amount),
                    units: el?.unit,
                    code: el?.okei,
                    price: Number(el?.sum_unit),
                    total: Number(el?.sum),
                    date: el?.date
                }
            }
            )
            dispatch(setPositions(rows))
            dispatch(setCustomer(data?.company))
            dispatch(setDetail({ ...data?.partnership, ...data?.details, nds: data?.details?.nds }))

            if (data?.details?.company_contact_id) {
                dispatch(setSignatory({ id: data?.details?.company_contact_id, name: data?.details?.signature }))
            } else if (data?.details?.signature) {
                dispatch(setSignatory({ id: 'another', name: data?.details?.signature }))
            } else {
                dispatch(setSignatory({ id: 'no', name: 'Без подписанта' }))
            }


        }
    }, [data])

    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <SceletonBill isLoading={isLoading} />
            <Upd id={id} type={type} setType={setType} />
        </div>
    )
};

export default Detail;