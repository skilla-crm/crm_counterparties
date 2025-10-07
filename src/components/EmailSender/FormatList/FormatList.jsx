import s from './FormatList.module.scss';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { ReactComponent as IconChewron } from '../icons/iconChewron.svg';


const FormatList = ({ formats, format, setFormat }) => {
    const [openList, setOpenList] = useState(false);
    const listRef = useRef()
    const fieldRef = useRef()

    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true)
    }

    const handleActiveFormat = (e) => {
        const id = e.currentTarget.id;
        setFormat(id)
        setOpenList(false)
    }

    const handleCloseList = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target) && !fieldRef.current.contains(e.target)) {
            setOpenList(false)
            return
        }
    }


    useEffect(() => {
        document.addEventListener('mousedown', handleCloseList);
        return () => document.removeEventListener('mousedown', handleCloseList);
    }, []);

    return (
        <div className={s.root}>
            <div ref={fieldRef} onClick={handleOpenList} className={s.field}>
                <p>{formats?.find(el => el.id == format)?.name}</p>
                <IconChewron className={classNames(s.arrow, openList && s.arrow_open)}/>
            </div>

            <ul ref={listRef} className={classNames(s.list, openList && s.list_open)}>
                {formats?.map(el => {
                    return <li onClick={handleActiveFormat} key={el.id} id={el.id}>{el.name}</li>
                })}
            </ul>
        </div>
    )
};

export default FormatList;