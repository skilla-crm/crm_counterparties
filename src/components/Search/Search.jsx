import s from './Search.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//icons
import { ReactComponent as IconSearch } from '../../assets/icons/iconSearch.svg'
import { ReactComponent as IconEnter } from '../../assets/icons/iconEnter.svg'
import { ReactComponent as IconClose } from '../../assets/icons/iconClose.svg'
import { ReactComponent as IconDone } from '../../assets/icons/filters/iconDone.svg'
//components
import LoaderCircle from '../Genegal/LoaderCircle/LoaderCircle';
//slice
import { setSearchQuery } from '../../redux/filters/slice';


const Search = ({ isFetching }) => {
    const { search } = useSelector((state) => state.filters);
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [load, setLoad] = useState(false);
    const [done, setDone] = useState(false)
    const [query, setQuery] = useState('');
    const inputRef = useRef()
    const buttonRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            setQuery(localStorage.getItem('searchQueryBills'))
            localStorage.getItem('searchQueryBills').length > 0 && !load && setDone(true)
        }, 200)
    }, [search])


    useEffect(() => {
        !isFetching && setLoad(false)
    }, [isFetching])

    useEffect(() => {
        !load && query.length > 0 && setDone(true)
    }, [load])


    const handleFocus = () => {
        setActive(true)
    }

    const handleBlur = () => {
        setActive(false)
    }

    const handleQuery = (e) => {
        const value = e.currentTarget.value;
        setDone(false)
        setQuery(value)
        value.length === 0 && dispatch(setSearchQuery(''))
        localStorage.setItem('searchQueryBills', value)
    }

    const handleReset = () => {
        setDone(false)
        dispatch(setSearchQuery(''))
        setQuery('')
        localStorage.setItem('searchQueryBills', '')

    }

    const handleOnFocus = () => {
        query.length === 0 && inputRef.current.focus()
    }

    const handleSearch = () => {
        if (query.length > 0) {
            setLoad(true)
            dispatch(setSearchQuery(query))
            return
        }

    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
            inputRef.current.blur()
            return
        }

        if (e.key === 'Escape') {
            handleReset()
            inputRef.current.focus()
        }
    };

    return (
        <div onKeyDown={handleKeyPress} onClick={handleOnFocus} className={classNames(s.root, active && s.root_active)}>
            <div className={classNames(s.icons, (active || query.length > 0) && !load && !done && s.icons_hidden)}>
                {!load && !done && <IconSearch className={classNames(s.icon, (active || query.length > 0 || isFetching) && s.icon_hidden)} />}
                {done && <IconDone />}
                <LoaderCircle vis={load} />
            </div>

            <input
                ref={inputRef}
                onChange={handleQuery}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={query || ''}
                placeholder='Искать...'>
            </input>

            <IconClose onClick={handleReset} className={classNames(s.clear, query.length > 0 && s.clear_vis)} />
            <button onClick={handleSearch} ref={buttonRef} className={classNames(s.button, query.length > 0 && !done && s.button_vis)}>
                <p>Поиск</p>
                <IconEnter />
            </button>
        </div>
    )
};

export default Search;