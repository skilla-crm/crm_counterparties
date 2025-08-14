import s from './Contact.module.scss';

const Contact = ({ el }) => {
    return (
        <div className={s.root}>
            <div className={s.block}>
                <p>{el?.name} {el?.surname}</p>
                <div className={s.subs}>
                    {el?.e_mail && <span>{el?.e_mail}</span>}
                </div>
            </div>
            {el?.label && <div className={s.label}><p>{el?.label}</p></div>}
        </div>
    )
};

export default Contact;