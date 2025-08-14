import s from './Rate.module.scss';
import classNames from 'classnames';


const Rate = ({ el }) => {
    const label = el?.price
    return (
        <div className={s.root}>
            <div className={classNames(s.block, label && label !== '' && label !== '0' && s.block_label)}>
                <p>{el.name_button}</p>
                {el.name_service && !label && el.name_service !== '' && <span> - {el.name_service}</span>}
            </div>
            {label && label !== '' && label !== '0' && <div className={s.label}><p>{label}</p></div>}
        </div>
    )
};

export default Rate;