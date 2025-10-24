// External
import { useEffect, useState } from 'react';
import classNames from 'classnames';

// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Redux
import { useSwitchBankAccountStatusMutation } from '../../../../redux/services/counterpartyDetailsApiActions';

// Components
import Switch from 'components/EmailSender/Switch/Switch';
import EllipsisWithTooltip from 'components/General/EllipsisWithTooltip/EllipsisWithTooltip';

// Styles
import s from './BankAccounts.module.scss';

const BankAccounts = ({ data = [], counterpartyId }) => {
    return (
        <div className={s.root}>
            <div className={s.infoTitle}>
                <span>
                    Основной счет будет использоваться в документах по умолчанию
                </span>
            </div>
            <div className={s.contacts}>
                <div className={classNames(s.gridRow, s.header)}>
                    <div>Банк</div>
                    <div>БИК</div>
                    <div>К/с</div>
                    <div>Р/с</div>
                    <div className={s.switchContainer}>Основной</div>
                    <div></div>
                </div>

                {data.length > 0 ? (
                    data.map((account) => (
                        <BankAccountRow
                            key={account.id}
                            account={account}
                            counterpartyId={counterpartyId}
                        />
                    ))
                ) : (
                    <div className={s.empty}>Пока не добавлен ни один счет</div>
                )}
            </div>
        </div>
    );
};
export default BankAccounts;

const BankAccountRow = ({ account, counterpartyId }) => {
    const { showToast } = useToast();
    const [isActive, setIsActive] = useState(false);
    const [switchBankAccountStatus] = useSwitchBankAccountStatusMutation();

    useEffect(() => {
        setIsActive(Boolean(account.is_default));
    }, [account]);

    const handleSwitchStatus = async () => {
        if (!account.id) return;

        try {
            const res = await switchBankAccountStatus({
                accountId: account.id,
                companyId: counterpartyId,
            }).unwrap();

            if (res?.data?.success) {
                setIsActive(!isActive);
            } else {
                showToast('Не удалось изменить статус счета', 'error');
            }
        } catch {
            showToast('Произошла ошибка', 'error');
        }
    };

    return (
        <div className={classNames(s.gridRow)}>
            <div>
                <EllipsisWithTooltip text={account.bank || '-'} />
            </div>
            <div>{account.bik || '-'}</div>
            <div>{account.ks || '-'}</div>
            <div>{account.rs || '-'}</div>
            <div className={s.switchContainer}>
                <Switch
                    switchState={isActive}
                    handleSwitch={handleSwitchStatus}
                />
            </div>
            <div></div>
        </div>
    );
};
