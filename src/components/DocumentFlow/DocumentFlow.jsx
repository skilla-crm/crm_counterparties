import s from './DocumentFlow.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ReactComponent as IconMailBlue } from '../../assets/icons/IconMailBlue.svg';
import { ReactComponent as IconDocSuccess } from '../../assets/icons/iconDocSuccess.svg';
import { ReactComponent as IconDoneGreen } from '../../assets/icons/iconDoneGreen.svg';
import { ReactComponent as IconMailBlack } from '../../assets/icons/IconMailBlack.svg';
import { ReactComponent as IconDocSuccessBlack } from '../../assets/icons/iconDocSuccessBlack.svg';
import { ReactComponent as IconClose } from '../../assets/icons/iconCloseBlack.svg';
//API
import { useSendOriginalUpdMutation, useSignOriginalUpdMutation, useUnmarkUpdMutation } from '../../redux/updsApiActions';
//components
import InputData2 from '../InputData/InputData2';
import RadioButtons from '../Genegal/RadioButtons/RadioButtons';
import InputAddress from '../Genegal/InputAddress/InputAddress';
import LoaderButton from '../LoaderButton/LoaderButton';


const DocumentFlow = ({ id, exchange }) => {

    const [containerStaus, setContainerStatus] = useState(0);
    const [blockStatus, setBlockStatus] = useState(0);
    const modalRef = useRef()

    console.log(exchange)

    const handleContainerStatus = (e) => {
        const id = Number(e.currentTarget.id);

        if (containerStaus !== 0) {
            setContainerStatus(0)
            setTimeout(() => {
                setBlockStatus(0)
            }, 250)
        } else {
            setContainerStatus(id)
            setBlockStatus(id)
        }
    }

    const handleClose = () => {
        setContainerStatus(0)
        setTimeout(() => {
            setBlockStatus(0)
        }, 250)
    }

    const handleCloseModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseModal);
        return () => document.removeEventListener('mousedown', handleCloseModal);
    }, []);

    return (
        <div ref={modalRef} className={s.root}>
            <div className={s.block}>
                <h3>Статус обмена оригиналами</h3>
                <div onClick={handleContainerStatus} id={exchange?.send === 1 ? 3 : 1} className={s.item}>
                    {exchange?.send === 1 ? <IconDoneGreen /> : <IconMailBlue />}
                    {exchange?.send !== 1 && <p>Подтвердить отправку оригиналов</p>}
                    {exchange?.send === 1 && exchange?.send_type === 'self_pickup' && <p>Бумажный оригинал передан</p>}
                    {exchange?.send === 1 && exchange?.send_type === 'courier' && <p>Бумажный оригинал отправлен</p>}
                    {exchange?.send === 1 && exchange?.send_type === 'edo' && <p>Оригинал отправлен по ЭДО</p>}
                    {exchange?.send === 1 && exchange?.send_type === 'post' && <p>Бумажный оригинал отправлен</p>}
                </div>

                <div onClick={handleContainerStatus} id={exchange?.sign === 1 ? 4 : 2} className={classNames(s.item, exchange?.send !== 1 && s.item_hidden)}>
                    {exchange?.sign === 1 ? <IconDoneGreen /> : <IconDocSuccess />}
                    {exchange?.sign !== 1 && <p>Подтвердить подписание</p>}
                    {exchange?.sign === 1 && exchange?.sign_type === 'edo' && <p>Подписан по ЭДО</p>}
                    {exchange?.sign === 1 && exchange?.sign_type === 'pepper' && <p>Подписан бумажный оригинал</p>}
                </div>
            </div>

            <div className={classNames(s.container, containerStaus === 1 && s.container_1, containerStaus === 2 && s.container_2, (containerStaus === 3 || containerStaus === 4) && s.container_3)}>
                {blockStatus === 1 && <BlockSend handleClose={handleClose} id={id} />}
                {blockStatus === 2 && <BlockSign handleClose={handleClose} id={id} />}
                {blockStatus === 3 && <BlockReject handleClose={handleClose} type={'send'} id={id} />}
                {blockStatus === 4 && <BlockReject handleClose={handleClose} type={'sign'} id={id} />}
            </div>
        </div>

    )
};

const BlockSend = ({ handleClose, id }) => {
    const [sendOriginal, { data, isError, isLoading }] = useSendOriginalUpdMutation();
    const [date, setDate] = useState(dayjs().locale('ru') || null)
    const [sendType, setSendType] = useState('self_pickup');
    const [address, setAddress] = useState(null)

    useEffect(() => {
        sendType !== 'post' && setAddress(null)
    }, [sendType])

    const handleSendOriginal = () => {
        const dataForSend = {
            date: date.format('YYYY-MM-DD'),
            type: sendType,
            address
        }
        sendOriginal({ body: dataForSend, id })
            .then(res => {
                res.data.success && handleClose()
            })
    }

    const list = [{ id: 'self_pickup', name: 'Самовывоз' }, { id: 'courier', name: 'Курьером' }, { id: 'edo', name: 'Отправлен по ЭДО' }, { id: 'post', name: 'Почтой' }]
    return (
        <div className={classNames(s.block, s.block_inner)}>
            <div className={s.header}>
                <h3><IconMailBlack /> Отметка об отправке документа</h3>
                <IconClose onClick={handleClose} className={s.close} />
            </div>

            <InputData2 sub={'Дата отправки'} nosub={true} setDate={setDate} date={date} />
            <RadioButtons list={list} active={sendType} setActive={setSendType} sub={'Способ отправки'} />
            <div className={classNames(s.address, sendType == 'post' && s.address_open)}>
                <InputAddress address={address} setAddress={setAddress} />
            </div>

            <button onClick={handleSendOriginal} className={s.button}>
                <div className={classNames(s.loader, isLoading && s.loader_vis)}><LoaderButton color={'#fff'} /></div>
                <p>Подтвердить</p>
            </button>

        </div>
    )
}

const BlockSign = ({ handleClose, id }) => {
    const [signOriginal, { data, isError, isLoading }] = useSignOriginalUpdMutation();
    const [date, setDate] = useState(dayjs().locale('ru') || null)
    const [sendType, setSendType] = useState('pepper');

    const handleSignOriginal = () => {
        const dataForSend = {
            date: date.format('YYYY-MM-DD'),
            type: sendType,
        }
        signOriginal({ body: dataForSend, id })
            .then(res => {
                res.data.success && handleClose()
            })
    }



    const list = [{ id: 'pepper', name: 'Оригинал на бумаге' }, { id: 'edo', name: 'ЭДО' }]
    return (
        <div className={classNames(s.block, s.block_inner)}>
            <div className={s.header}>
                <h3><IconDocSuccessBlack /> Отметка о подписи оригинала</h3>
                <IconClose onClick={handleClose} className={s.close} />
            </div>

            <InputData2 sub={'Дата подписания'} nosub={true} setDate={setDate} date={date} />
            <RadioButtons list={list} active={sendType} setActive={setSendType} sub={'Способ, которым документ был подписан обеими сторонами'} />
            <button onClick={handleSignOriginal} className={s.button}>
                <div className={classNames(s.loader, isLoading && s.loader_vis)}><LoaderButton color={'#fff'} /></div>
                <p>Подтвердить</p>
            </button>

        </div>
    )
}

const BlockReject = ({ handleClose, type, id }) => {
    const [unmarkUpd, { data, isError, isLoading }] = useUnmarkUpdMutation();

    const handleUnmark = (e) => {
        const idType = e.currentTarget.id;
        unmarkUpd({ body: { type: idType }, id })
            .then(res => {
                res.data.success && handleClose()
            })
    }
    return (
        <div className={classNames(s.block, s.block_inner)}>
            <div className={s.header}>
                {type === 'send' && <h3><IconMailBlack /> Отметка об отправке документа</h3>}
                {type === 'sign' && <h3><IconDocSuccessBlack /> Отметка о подписи оригинала</h3>}
                <IconClose onClick={handleClose} className={s.close} />
            </div>



            <button onClick={handleUnmark} id={type} className={classNames(s.button, s.button_red)}>
                <div className={classNames(s.loader, isLoading && s.loader_vis)}><LoaderButton color={'#fff'} /></div>
                <p>Снять отметку</p>
            </button>

        </div>
    )
}

export default DocumentFlow;