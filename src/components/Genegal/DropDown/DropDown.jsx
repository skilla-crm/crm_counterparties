import { useReducer, useRef, useState, useEffect } from 'react';
import s from './DropDown.module.scss';
import classNames from 'classnames';
import { useAutoAnimate } from '@formkit/auto-animate/react';
//icons
import { ReactComponent as IconChewron } from '../../../assets/icons/iconChewron.svg';
import { ReactComponent as IconWarning } from '../../../assets/icons/iconWarning.svg';
//utils
import { handleSearchCompany } from '../../../utils/SearchCompany';

const DropDown = ({ z, type, sub, list, ListItem, header, activeItem, setActiveItem, disabled, error, errorText, resetError, overlay, noActive }) => {
    const [parent] = useAutoAnimate({ duration: 150 });
    const [query, setQuery] = useState('');
    const [caption, setCaption] = useState('')
    const [lable, setLable] = useState('')
    const [openList, setOpenList] = useState(false);
    const [searchList, setSearchList] = useState([])
    const inputRef = useRef();
    const modalRef = useRef();
    const fieldRef = useRef();

    useEffect(() => {
        setSearchList(list)
    }, [list])

    useEffect(() => {

        if (activeItem?.id || activeItem?.partnership_id) {
            type == 'customer' && setQuery(activeItem?.name)
            type == 'customer' && setCaption(`${activeItem?.inn ? `ИНН ${activeItem?.inn}` : ''} ${activeItem?.kpp ? `КПП ${activeItem?.kpp}` : ''}`)
            type == 'customer' && setLable(activeItem?.label?.trim())

            type == 'detail' && setQuery(activeItem?.partnership_name)
            type == 'detail' && setCaption(`${activeItem?.bank} ${activeItem?.rs?.length > 4 ? `*${activeItem?.rs?.slice(-4)}` : activeItem?.rs}`)

            type == 'position' && activeItem?.name_service && activeItem?.name_service !== '' && setQuery(activeItem?.name_service)
            type == 'position' && (!activeItem?.name_service || activeItem?.name_service == '') && setQuery(activeItem?.name_button)

            type == 'signatory' && activeItem?.surname && setQuery(`${activeItem?.name} ${activeItem?.surname}`)
            type == 'signatory' && !activeItem?.surname && setQuery(`${activeItem?.name}`)
            type == 'signatory' && activeItem?.e_mail && setCaption(activeItem?.e_mail)
            type == 'signatory' && !activeItem?.e_mail && setCaption('')
            return
        } else {
            type == 'detail' && setQuery('')
            setCaption('')
            setLable('')
        }
    }, [activeItem])

    const handleSearch = (e) => {
        const value = e.currentTarget.value;
        setQuery(value)
        setActiveItem({})
        type == 'signatory' && setActiveItem({ id: 'another', name: value })
        type == 'position' && setActiveItem({ name_service: value })
        const result = handleSearchCompany(value, list)
        setSearchList(result)
        type !== 'position' && type !== 'signatory' && resetError()
    }
    const handleOpenList = () => {
        !openList && setOpenList(true)
    }

    const handleFocus = () => {
        inputRef.current.focus()
    }

    const handleChoseActiveItem = (el) => {
        setActiveItem(el)
        setOpenList(false)
        type !== 'position' && type !== 'signatory' && resetError()
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

    return (
        <div className={classNames(s.root, type == 'signatory' && s.root_wide, noActive && s.root_noactive)}>
            {sub && sub !== '' && <span className={s.sub}>{sub}</span>}
            <div ref={fieldRef} onClick={overlay ? handleFocus : null} className={classNames(s.field, disabled && s.field_disabled, disabled && !overlay && s.field_disabledover, error && s.field_error)}>
                <input disabled={disabled} ref={inputRef} onFocus={handleOpenList} value={query || ''} onChange={handleSearch}></input>
                {overlay && <div className={classNames(s.overlay, !openList && s.overlay_active, disabled && s.overlay_disabled)}>
                    <p>{query}</p>
                    {caption.length > 0 && !openList && <span>{caption}</span>}
                    {lable.length > 0 && !openList && <div className={s.label}><p>{lable}</p></div>}
                </div>}

                <IconChewron onClick={handleChoseActiveItem} className={classNames(s.chewron, openList && s.chewron_open)} />
            </div>
            <ul
                ref={modalRef}
                /*   style={{ zIndex: z }} */
                className={classNames(s.block, openList && s.block_open, searchList?.length > 6 && s.block_scroll, type == 'position' && s.block_position)}
            >
                {header?.title && <div className={s.header}></div>}
                {!noActive && <div /* ref={parent}  */ className={s.list}>
                    {searchList?.length === 0 && <div className={s.notfound}>Не найдено по запросу “{query}”</div>}
                    {searchList?.map((el, i) => {
                        return <div key={el.id ? el.id : i} onClick={() => handleChoseActiveItem(el)}><ListItem el={el} /></div>
                    })}
                </div>}

            </ul>

            <span className={classNames(s.error, error && s.error_vis)}><IconWarning /> {errorText}</span>
        </div>
    )
};

export default DropDown;