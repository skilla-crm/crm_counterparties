import classNames from 'classnames';
import s from './ContractInput.module.scss';
import InputText from '../Genegal/InputText/InputText';

const ContractInput = ({ text, setText, disabled, error, errorText }) => {
    return (
        <div className={s.root}>
            <span className={s.sub}>Документ (основание передачи)</span>
            <div className={classNames(s.field, s.field_disabled)}>
                <InputText text={text} setText={setText} disabled={disabled} />
            </div>
           {/*  <span className={classNames(s.error, error && s.error_vis)}>{errorText}</span> */}
        </div>
    )
};

export default ContractInput;