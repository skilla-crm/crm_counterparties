// Components
import UniButton from 'components/General/UniButton/UniButton';

// Icons
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// Styles
import s from './CounterpartyHeader.module.scss';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

const CounterpartyHeader = ({ onSave, isLoading }) => {
    return (
        <div className={s.header}>
            <h2>Новый контрагент</h2>

            <div className={s.headerButtons}>
                <UniButton
                    text="Сохранить"
                    icon={IconDoneWhite}
                    width={200}
                    onClick={onSave}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default CounterpartyHeader;
