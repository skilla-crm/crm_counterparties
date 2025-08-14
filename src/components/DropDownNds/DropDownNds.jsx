import classNames from 'classnames';
import s from './DropDownNds.module.scss';
import { useState, useRef, useEffect } from 'react';
//icons
import { ReactComponent as IconChewron } from '../../assets/icons/iconChewron.svg';

const ndsList = [
    { id: 0, text: 'Без НДС' },
    { id: 5, text: '5%' },
    { id: 7, text: '7%' },
    { id: 10, text: '10%' },
    { id: 20, text: '20%' },
]


const DropDownNds = ({ value, setValue, disabled }) => {
    const [openList, setOpenList] = useState(false);
    const modalRef = useRef();
    const fieldRef = useRef();

    const handleOpen = () => {
        openList ? setOpenList(false) : setOpenList(true)
    }

    const handleChose = (e) => {
        const id = e.currentTarget.id;
        setValue(id)
        setOpenList(false)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target) && !fieldRef.current.contains(e.target)) {
            setOpenList(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    console.log(value)

    return (
        <div className={s.root}>
            <span className={s.sub}>Ставка НДС</span>
            <div ref={fieldRef} onClick={handleOpen} className={classNames(s.field, disabled && s.field_disabled)}>
                <p>{ndsList.find(el => el.id == value)?.text}</p>
                <IconChewron className={classNames(s.chewron, openList && s.chewron_open)} />
            </div>
            <ul ref={modalRef} className={classNames(s.list, openList && s.list_open)}>

                {ndsList?.map(el => <li onClick={handleChose} key={el.id} id={el.id}>{el.text}</li>)}

            </ul>
        </div>
    )
};

export default DropDownNds;