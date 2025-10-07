import s from './CheckBoxList.module.scss';
import classNames from 'classnames';
import dayjs from 'dayjs';
//components
import CheckBox from '../CheckBox/CheckBox';
import OperationItem from 'components/TableDetails/components/OperationItem/OperationItem';

const CheckBoxList = ({ list, active, setActive, column }) => {

    const handleActive = (e) => {
        const id = e.currentTarget.id
        if (active?.some(el => el == id)) {
            setActive(prevState => [...prevState].filter(el => el != id))
        } else {
            setActive(prevState => [...prevState, id])
        }
    }
    return (
        <div className={classNames(s.root, column && s.root_column)}>
            {list?.map(el => {
                const isActive = active?.some(item => item == el.id)
                return <li onClick={handleActive} key={el.id} id={el.id} className={classNames(s.item, isActive && s.item_active)}>
                    <CheckBox active={isActive} />
                    <OperationItem
                        disableHover={true}
                        key={el.id}
                        amount={el.sum || ''}
                        subtitle={el.date ? dayjs(el.date).format('DD.MM.YY') : ''}
                    />
               
                </li>
            })}

        </div>
    )
};

export default CheckBoxList;