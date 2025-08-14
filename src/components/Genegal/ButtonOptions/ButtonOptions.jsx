import s from './ButtonOptions.module.scss';
import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { ReactComponent as IconChewron } from '../../../assets/icons/iconChewron.svg';
//components
import LoaderButton from '../../LoaderButton/LoaderButton';



const ButtonOptions = ({ handler, buttonText, Icon, isLoading, options }) => {
    const [openOptions, setOpenOptions] = useState(false)
    const buttonRef = useRef()
    const optionsRef = useRef()

    const handleOpenOptions = () => {
        openOptions ? setOpenOptions(false) : setOpenOptions(true)
    }

    const handleCloseOptions = () => {
        setOpenOptions(false)
    }
    
        const handleCloseModal = (e) => {
            e.stopPropagation()
            if (optionsRef.current && !optionsRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
                handleCloseOptions()
                return
            }
        }
    
        useEffect(() => {
            document.addEventListener('mousedown', handleCloseModal);
            return () => document.removeEventListener('mousedown', handleCloseModal);
        }, []);

    return (
        <div className={s.root}>
            <button onClick={handler} className={s.button}>
                <Icon />
                <p>{buttonText}</p>
                <div className={classNames(s.loader, isLoading && s.loader_vis)}>
                    <LoaderButton color={'#002CFB'} />
                </div>
            </button>



            <div className={s.line}></div>
            <button ref={buttonRef} onClick={handleOpenOptions} className={classNames(s.button, s.button_options)}>
                <IconChewron className={classNames(s.arrow, openOptions && s.arrow_open)} />
            </button>

            <ul ref={optionsRef} className={classNames(s.options, openOptions && s.options_open)}>
                {options?.map((el) => {
                    const IconOptions = el.icon;
                    return <li onClick={el.handler} onMouseUp={handleCloseOptions} key={el.id}>
                        <IconOptions />
                        <p>{el.name}</p>
                        {el.default && <div className={s.label}>
                            <p>по умолчанию</p>
                        </div>
                        }
                    </li>
                })}
            </ul>
        </div>
    )
};

export default ButtonOptions;