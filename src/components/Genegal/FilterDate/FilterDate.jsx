import s from './FilterDate.module.scss';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//icons
import { ReactComponent as IconClose } from '../../../assets/icons/filters/iconClose.svg'
import { ReactComponent as IconDone } from '../../../assets/icons/filters/iconDone.svg'
//slice
import { setDateStart, setDateEnd, setDateStartPicker, setDateEndPicker } from '../../../redux/dateRange/slice';
//components
import LoaderCircle from '../LoaderCircle/LoaderCircle';
import { DateMenu } from './DateMenu/DateMenu';
//utils
import { getTitleDateDuration } from './DateMenu/utils/date';


const FilterDate = ({ title, Icon, isFetching }) => {
    const { dateStart, dateEnd, dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange);
    const [openCalendar, setOpenCalendar] = useState(false)
    const [load, setLoad] = useState(false);
    const [done, setDone] = useState(false)
    const dispatch = useDispatch();
    const dateRef = useRef()

    const resetDate = () => {
        if (dateStartPicker && !dateEndPicker) {
            dispatch(setDateStartPicker(dateStart ? new Date(dateStart) : null));
            dispatch(setDateEndPicker(dateEnd ? new Date(dateEnd) : null));
        }
    };

    const handleResetFilter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setLoad(true)
        setDone(false)
        dispatch(setDateStart(''))
        dispatch(setDateEnd(''))
    }

    const handleOpenCalendar = () => {
        setOpenCalendar(true)
        resetDate();
    }

    useEffect(() => {
        dateStart !== '' && setDone(true)
    }, [])

    useEffect(() => {
        !isFetching && setLoad(false)
        !isFetching && dateStart !== '' && setDone(true)
    }, [isFetching])


    useEffect(() => {
        resetDate();
    }, []);



    useEffect(() => {
        const clickOutside = (e) => {
            if (dateRef.current && !e.composedPath().includes(dateRef.current)) {
                setOpenCalendar(false);

            }
        };
        document.body.addEventListener('click', clickOutside);
        return () => document.body.removeEventListener('click', clickOutside);
    }, []);



    return (
        <div className={s.root}>
            <div ref={dateRef} onClick={handleOpenCalendar} className={classNames(s.filter, /* s.root_active */)}>
                <div className={s.icon}>
                    <Icon />
                    <div className={classNames(s.loader, load && s.loader_vis)}>
                        <LoaderCircle vis={true} />
                    </div>

                    <div className={classNames(s.loader, done && s.loader_vis)}>
                        <IconDone />
                    </div>

                </div>

                {/*   <p>{title}</p> */}
                <p>{getTitleDateDuration(dateStart, dateEnd)}</p>
                <div onClick={handleResetFilter} className={classNames(s.block, done && s.block_active)}>
                    <IconClose className={s.close} />
                </div>



            </div>
            <DateMenu isOpen={openCalendar} setIsOpen={setOpenCalendar} setLoadFilter={setLoad} setDone={setDone} />
        </div>

    )
};

export default FilterDate;