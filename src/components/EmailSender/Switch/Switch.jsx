import s from './Switch.module.scss';

const Switch = ({ text, switchState, handleSwitch, disabled }) => {
    return (
        <div onClick={handleSwitch} className={`${s.container} ${disabled && s.container_disabled}`}>
            <div className={`${s.switch} ${disabled && s.switch_disabled} ${switchState && s.switch_on}`}>
                <div></div>
                
            </div>
            {text.length > 0 && <p>{text}</p>}

        </div>
    )
};

export default Switch; 