import UniButton from 'components/General/UniButton/UniButton';
import { ReactComponent as IconDelete } from 'assets/icons/iconDeleteRed.svg';
import s from './Header.module.scss';
import classNames from 'classnames';
const Header = ({ isChecked, tab = 'general' }) => {
    const renderBtns = (tab) => {
        switch (tab) {
            case 'general':
                return (
                    <div className={classNames(s.headerBtns)}>
                        <UniButton
                            text="Удалить"
                            type="danger"
                            icon={IconDelete}
                        />
                    </div>
                );

            default:
                return <div className={classNames(s.headerBtns)}></div>;
        }
    };
    return (
        <div className={classNames(s.header)}>
            <h1>{isChecked ? 'Контрагент' : 'Не проверенный контрагент'}</h1>

            {renderBtns(tab)}
        </div>
    );
};
export default Header;
