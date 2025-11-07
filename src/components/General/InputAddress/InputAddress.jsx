import s from './InputAddress.module.scss';

const InputAddress = ({ address, setAddress }) => {
    const handleText = (e) => {
        const value = e.currentTarget.value;
        setAddress(value);
    };

    return (
        <div className={s.field}>
            <span className={s.label}>Почтовый адрес</span>
            <input
                className={s.input}
                onChange={handleText}
                value={address || ''}
                placeholder="Нет адреса"
            ></input>
        </div>
    );
};

export default InputAddress;
