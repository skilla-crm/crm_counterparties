import s from './Position.module.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import "dayjs/plugin/customParseFormat";
//icons
import { ReactComponent as IconCloseRed } from '../../assets/icons/iconCloseRed.svg'
//components
import InputNum from '../Genegal/InputNum/InputNum';
import InputText from '../Genegal/InputText/InputText';
import InputFinancial from '../Genegal/InputFinancial/InputFinancial';
import InputNumFloat from '../Genegal/InputNumFloat/InputNumFloat';
import DropDown from '../Genegal/DropDown/DropDown';
import Rate from '../Rate/Rate';
//slice
import { setDeletePosition, setPositionValues } from '../../redux/positions/slice';
import { useEffect, useState } from 'react';


const Position = ({ data, id, i, length, rates, disabled }) => {
    const [anim, setAnim] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setAnim(true)
    }, [])

    const handleDelete = () => {
        setAnim(false)

        setTimeout(() => {
            dispatch(setDeletePosition(id))
        }, 200)
    }

    const nameService = data?.rate?.name_service?.trim()
    const firstSymbolsDate = dayjs(`20${nameService?.slice(6, 8)}-${nameService?.slice(3, 5)}-${nameService?.slice(0, 2)}`).isValid()

    return (
        <div id={id} className={classNames(s.root, i === 0 && s.root_first, anim && s.root_anim)}>

            <div className={s.position}>
                <p className={s.number}>{i + 1}.</p>
                <div className={s.name}>
                    <DropDown
                        z={10 - i}
                        type={'position'}
                        sub={null}
                        list={rates}
                        ListItem={Rate}
                        activeItem={data?.rate}
                        setActiveItem={(value) => dispatch(setPositionValues({ key: 'rate', id, rate: firstSymbolsDate && value?.id ? { ...value, name_service: `${nameService?.slice(0, 8)} ${value?.name_service}` } : value }))}
                        disabled={disabled}
                    />
                </div>
                <div className={s.count}>


                    <InputNumFloat
                        sum={data?.count}
                        setSum={(count) => dispatch(setPositionValues({ key: 'count', id, count: Number(count) }))} />
                </div>
                <div className={s.units}>
                    <InputText
                        text={data?.units}
                        setText={(units) => dispatch(setPositionValues({ key: 'units', id, units }))}
                    />
                </div>
                <div className={s.code}>
                    <InputNum
                        num={data?.code}
                        setNum={(code) => dispatch(setPositionValues({ key: 'code', id, code }))}
                    />
                </div>

                <div className={s.price}>
                    <InputFinancial
                        sum={data?.price}
                        setSum={(price) => dispatch(setPositionValues({ key: 'price', id, price }))} />
                </div>
                <div className={s.total}>
                    <InputFinancial
                        sum={data?.total}
                        setSum={(total) => dispatch(setPositionValues({ key: 'total', id, total }))} />
                </div>
                <div>
                    <button className={classNames(s.button, (length === 1 || disabled) && s.button_hidden)} onClick={handleDelete}><IconCloseRed /></button>
                </div>
            </div>

        </div>
    )
};

export default Position;