import s from './RadioButtons.module.scss';
import classNames from 'classnames';

const RadioButtons = ({ list, active, setActive, sub }) => {
    return (
        <div className={s.root}>
            <span>{sub}</span>
            {list?.map(el => {
                return <Item key={el.id} data={el} active={active == el.id} setActive={setActive} />
            })}
        </div>
    )
};

const Item = ({ data, active, setActive }) => {

    const handleActive = (e) => {
        const id = e.currentTarget.id
        setActive(id)
    }
    return (
        <div onClick={handleActive} id={data.id} className={s.item}>
            <div className={classNames(s.radio, active && s.radio_active)}>
                <div></div>
            </div>
            <p>{data.name}</p>
        </div>
    )
}

export default RadioButtons;