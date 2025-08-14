import s from './ModalDelete.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
//api
import { useDeleteUpdMutation } from '../../redux/updsApiActions';
import { useEffect, useRef } from 'react';
import { ReactComponent as IconClose } from '../../assets/icons/iconCloseBlack.svg' 
import { ReactComponent as IconDeleteBlack } from '../../assets/icons/iconDeleteBlack.svg'
import { ReactComponent as IconDeleteWhite } from '../../assets/icons/iconDeleteWhite.svg'
//components
import LoaderButton from '../LoaderButton/LoaderButton';

const ModalDelete = ({ open, setOpen, id }) => {
    const [deleteUpd, { data, isError, isLoading }] = useDeleteUpdMutation();
    const modalRef = useRef()
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        deleteUpd(id)
        .then(res => {
            const data = res.data
            data.success && navigate('/')
        })
    }

    const handleCloseModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseModal);
        return () => document.removeEventListener('mousedown', handleCloseModal);
    }, []);

    return (
        <div className={classNames(s.window, open && s.window_open)}>

            <div ref={modalRef} className={classNames(s.modal,open && s.modal_open)}>
                <div className={s.header}>
                    <div className={s.title}>
                         <IconDeleteBlack />
                        <p>Удаление счета</p>
                    </div>


                    <div onClick={handleClose} className={s.close}>
                        <IconClose />
                    </div>
                </div>

                <p className={s.text}>Все данные будут безвозвратно удалены</p>

                <div className={s.buttons}>
                    <button onClick={handleClose} disabled={isLoading} className={s.cancel}>Не удалять</button>

                    <button onClick={handleDelete} disabled={isLoading} className={s.action}>Удалить безвозвратно
                        <div className={classNames(s.icon, isLoading && s.icon_load)}>
                              <IconDeleteWhite />

                            <div className={classNames(s.loader, isLoading && s.loader_vis)}>
                                  <LoaderButton color={'#fff'}/>
                            </div>
                        </div>
                    </button>
                </div>


            </div>
        </div>
    )
};

export default ModalDelete;