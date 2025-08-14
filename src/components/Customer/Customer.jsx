import s from './Customer.module.scss';

const Customer = ({ el }) => {
    const label = el?.label?.trim()
    return (
        <div className={s.root}>
            <div className={s.block}>
                <p>{el.name}</p>
                <div className={s.subs}>
                    {el?.inn && <span>ИНН {el?.inn}</span>}
                    {el?.kpp && <span>КПП {el?.kpp}</span>}
                    {el?.partnership_name && <span>Договор с {el?.partnership_name}</span>}
                </div>
            </div>
            {label && label !== '' && <div className={s.label}><p>{label}</p></div>}
        </div>
    )
};

export default Customer;