import s from './Filter.module.scss';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//icons
import { ReactComponent as IconClose } from '../../../assets/icons/filters/iconClose.svg'
import { ReactComponent as IconDone } from '../../../assets/icons/filters/iconDone.svg'
//slice
import { setFilterCustomers } from '../../../redux/filters/slice';
//components
import LoaderCircle from '../LoaderCircle/LoaderCircle';




const Filter = ({ title, Icon, type, items, Component, isFetching }) => {
    const [openModal, setOpenModal] = useState(false);
    const [load, setLoad] = useState(false);
    const [done, setDone] = useState(false)
    const modalRef = useRef()
    const filterRef = useRef();
    const dispatch = useDispatch()

    useEffect(() => {
        items.length > 0 && setDone(true)
    }, [])

    useEffect(() => {
        !isFetching && setLoad(false)
        !isFetching && items.length > 0 && setDone(true)
    }, [isFetching])

    const handleOpenModal = () => {
        openModal ? setOpenModal(false) : setOpenModal(true)
    }

    const handleReset = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDone(false)
        dispatch(setFilterCustomers([]))
        setOpenModal(false)
    }

    useEffect(() => {
        const clickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target) && !filterRef.current.contains(e.target)) {
                setOpenModal(false);
            }
        };
        document.body.addEventListener('mousedown', clickOutside);
        return () => document.body.removeEventListener('mousedown', clickOutside);
    }, []);
    return (
        <div className={s.root}>
            <div ref={filterRef} onClick={handleOpenModal} className={classNames(s.filter, items?.length > 0 && s.filter_active)}>
                <div className={s.icon}>
                    <Icon className={(load || done) && s.hidden} />
                    <div className={classNames(s.loader, load && s.loader_vis)}>
                        <LoaderCircle vis={true} />
                    </div>

                    <div className={classNames(s.loader, done && s.loader_vis)}>
                        <IconDone />
                    </div>

                </div>

                <p className={s.title}>{title}</p>
                <div className={classNames(s.block, items?.length > 0 && s.block_active)}>
                    <div className={s.count}>{items?.length}</div>
                    <IconClose onClick={handleReset} className={s.close} />
                </div>
            </div>

            <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
                <Component
                    items={items}
                    handleReset={handleReset}
                    setOpenModal={setOpenModal}
                    load={load}
                    setLoad={setLoad}
                    setDone={setDone}
                    isFetching={isFetching}
                />
            </div>
        </div>
    )
};

export default Filter;