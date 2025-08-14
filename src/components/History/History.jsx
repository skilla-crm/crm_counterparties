import s from './History.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
//icons
import { ReactComponent as IconChewron } from '../../assets/icons/iconChewron.svg';
//utils
import { handlerLog } from '../../utils/handlerLog';

const History = ({ logs }) => {
    const [open, setOpen] = useState(false);
    const [logsItems, setLogsItems] = useState(logs.slice(0, 11) || []);
    const [dates, setDates] = useState([])

    useEffect(() => {
        setLogsItems(logs.slice(0, 11))
    }, [logs])

    useEffect(() => {
        const dates = logsItems?.reduce((acc, curr) => {
            if (acc.findIndex(el => dayjs(el.date_create).format('DD.MM.YYYY') === dayjs(curr.date_create).format('DD.MM.YYYY')) === -1) {
                acc.push(curr);
            }
            return acc;
        }, []).map((el) => { return dayjs(el.date_create).format('YYYY-MM-DD') });
        setDates(dates)
    }, [logsItems])

    const handleOpen = () => {
        if (open) {
            setOpen(false)
            setTimeout(() => {
                setLogsItems(logs.slice(0, 11))
            }, 200)
        } else {
            setOpen(true)
            setTimeout(() => {
                setLogsItems(logs)
            })
        }
    }


    return (
        <div className={s.root}>
            <h3>История изменений</h3>
            <div className={classNames(s.container, open && s.container_open)}>
                {dates?.map(el => {
                    const logsList = logsItems?.filter((item) => dayjs(item.date_create).format('YYYY-MM-DD') === el)
                    console.log(dates, logsList)
                    const currentYear = dayjs(el).format('YYYY') == dayjs().format('YYYY')
                    const today = dayjs(el).format('D MM YYYY') == dayjs().format('D MM YYYY')
                    const tomorrow = dayjs(el).format('MM YYYY') == dayjs().format('MM YYYY') && dayjs().format('D') - dayjs(el).format('D') == 1;
                    console.log(tomorrow, dayjs().format('D'), dayjs(el), el)
                    return <div className={s.block} key={el}>
                        {currentYear && today && <span>Сегодня</span>}
                        {currentYear && tomorrow && <span>Вчера</span>}
                        {(!currentYear || (!tomorrow && !today)) && <span>{dayjs(el).format('DD.MM.YYYY')}</span>}
                        <ul className={s.list}>
                            {logsList?.map((log) => {
                                return <li className={s.log} key={log.id}>
                                    <p>{handlerLog(log)}</p>
                                    <span>{dayjs(log?.date_create).format('HH:mm')}</span>
                                </li>
                            })}
                        </ul>

                    </div>
                })}
            </div>

            {logs?.length > 10 && <button className={classNames(s.button)} onClick={handleOpen}>
                {!open && 'Развернуть'}
                {open && 'Cвернуть'}
            </button>
            }

        </div>
    )
};

export default History;