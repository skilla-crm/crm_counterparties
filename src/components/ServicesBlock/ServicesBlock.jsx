import s from './ServicesBlock.module.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconWarning } from '../../assets/icons/iconWarning.svg';
import { ReactComponent as IconPlusBlue } from '../../assets/icons/iconPlusBlue.svg';
//components
import Position from '../Position/Position';
//slice
import { setAddPosition, setTotal } from '../../redux/positions/slice';
import { useEffect, useState } from 'react';
//utils
import { addSpaceNumber } from '../../utils/addSpaceNumber';

const ServicesBlock = ({ parameters, error, errorText, resetError, disabled }) => {
    const dispatch = useDispatch()
    const { positions, total } = useSelector((state) => state.positions);
    const { customer, detail, nds } = useSelector((state) => state.mainInfo);
    const [rates, setRates] = useState([]);

    useEffect(() => {
        resetError()
        const sum = positions.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.total ? Number(currentValue.total) : 0)
        }, 0);
        dispatch(setTotal(sum))
    }, [positions])

    useEffect(() => {
        if (customer?.works?.length > 0 && parameters?.document_buttons?.length > 0) {
            const result = customer?.works?.map(el => {
                return {
                    id: el.work,
                    name_button: el.work,
                    name_service: el.work,
                    price: el.price
                }
            })
            setRates([...parameters?.document_buttons, ...result])
        } else {
            setRates(parameters?.document_buttons)
        }

    }, [parameters, customer])

    const handleAddRow = () => {
        dispatch(setAddPosition())
    }

    return (
        <div className={classNames(s.root, disabled && s.root_disabled)}>
            <div className={s.header}>
                <h3>Услуги или товары</h3>
                <span className={classNames(s.error, error && s.error_vis)}><IconWarning /> {errorText}</span>
            </div>

            <div className={s.container}>
                <div className={s.subs}>
                    <div className={s.number}></div>
                    <span className={s.name}>Наименование</span>
                    <span className={s.count}>Кол-во</span>
                    <span className={s.units}>Ед. изм.</span>
                    <div className={s.code}>
                        <span>Код</span>
                    </div>

                    <div className={s.price}>
                        <span>За ед.{nds && nds > 0 ? ` с НДС ${nds}%` : ''}</span>
                    </div>
                    <span className={s.total}>Итого{nds && nds > 0 ? ` с НДС ${nds}%` : ''}</span>
                    <div className={s.button}></div>
                </div>
                {positions.map((el, i) => {
                    return <Position
                        data={el}
                        key={el.id}
                        id={el.id}
                        i={i}
                        length={positions.length}
                        rates={rates}
                        works={customer?.works}
                        disabled={disabled}
                    />
                })}

            </div>

            <div className={s.bottom}>
                <button className={classNames(s.button_add, disabled && s.button_add_hidden)} onClick={handleAddRow}>
                    <IconPlusBlue />
                    <p>Добавить</p>
                </button>
                <p>Итого {addSpaceNumber(total)} ₽</p>
            </div>

        </div>
    )
};

export default ServicesBlock;