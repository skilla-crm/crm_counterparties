import s from './TextArea.module.scss';

const TextArea = ({ value, setValue, rows }) => {

    const handleTextValue = (e) => {
        const value = e.currentTarget.value;
        setValue(value)
    }

    return (
        <textarea
            className={s.area}
            value={value || ''}
            onChange={handleTextValue}
            type='text'
            rows={rows}

        ></textarea>
    )
};

export default TextArea;