'use client'
import s from './Notification.module.scss';
import classNames from 'classnames';
import { ReactComponent as IconClose } from '../../../assets/icons/notification/iconClose.svg';
import { ReactComponent as IconPrint } from '../../../assets/icons/notification/iconClose.svg'
import { ReactComponent as IconDownload } from '../../../assets/icons/notification/iconClose.svg'
import { ReactComponent as IconEmail } from '../../../assets/icons/notification/iconEmail.svg';
import { useEffect, useState } from 'react';

const Notification = ({ type, text, open, setOpen }) => {
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        if (open) {
            setAnim(true)

        } else {
            setAnim(false)
        }
    }, [open, text])

    const handleClose = () => {
        setAnim(false)

        setTimeout(() => {
            setOpen(false)
        }, 200)

    }



    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <div className={classNames(s.notification, anim && s.notification_anim)}>
                <div className={classNames(s.line, s.line_red)}></div>
                {type === 'email' && <IconEmail className={s.icon}/>}
                <p>{text}</p>
                {type !== 'copy' && <div onClick={handleClose} className={s.close}><IconClose /></div>}
            </div>
        </div>

    )
};

export default Notification