import s from './Detail.module.scss';

const Detail = ({ el }) => {
    return (
        <div className={s.root}>
            <div className={s.block}>
                <p>{el?.partnership_name}</p>
                <div className={s.subs}>
                    {el?.inn && <span>ИНН {el?.inn}</span>}
                    {el?.kpp && <span>КПП {el?.kpp}</span>}
                    {<span>{el?.bank} {el?.rs?.length > 4 ? `*${el?.rs?.slice(-4)}` : el?.rs}</span>}
                </div>
            </div>
            {el?.label && <div className={s.label}><p>{el?.label}</p></div>}
        </div>
    )
};

export default Detail;