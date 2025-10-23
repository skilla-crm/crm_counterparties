import UniButton from 'components/General/UniButton/UniButton';
import { ReactComponent as IconDelete } from 'assets/icons/iconDeleteRed.svg';
import { ReactComponent as IconEdit } from 'assets/icons/iconEditWhite.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
import s from './Header.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks/useModal';
const Header = ({ isChecked, tab = 'general', counterpartyId }) => {
    const navigate = useNavigate();
    const { showModal } = useModal();

    //GENERAL HANDLERS

    //DETAILS HANDLERS
    const handleEditDetails = () => {
        navigate(`/create/${counterpartyId}`);
    };
    //CONTACTS HANDLERS
    const handleOpenConact = () => {
        showModal('CONTACT', { companyId: counterpartyId });
    };

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
            case 'details':
                return (
                    <div className={classNames(s.headerBtns)}>
                        <UniButton
                            text="Редактировать"
                            icon={IconEdit}
                            onClick={handleEditDetails}
                        />
                    </div>
                );
            case 'contacts':
                return (
                    <div className={classNames(s.headerBtns)}>
                        <UniButton
                            text="Добавить представителя"
                            icon={IconPlus}
                            onClick={handleOpenConact}
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
