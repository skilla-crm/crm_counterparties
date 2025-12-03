// External
import { useEffect, useState } from "react";
import classNames from "classnames";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Redux
import { useSwitchBankAccountStatusMutation } from "../../../../redux/services/counterpartyDetailsApiActions";

// Components
import Switch from "components/EmailSender/Switch/Switch";
import EllipsisWithTooltip from "components/General/EllipsisWithTooltip/EllipsisWithTooltip";

// Icons
import { ReactComponent as IconDoneGrey } from "assets/icons/iconDoneGrey.svg";

// Styles
import s from "./BankAccounts.module.scss";

const BankAccounts = ({ data = [], counterpartyId }) => {
  return (
    <div className={s.root}>
      {data.length > 0 && (
        <div className={s.infoTitle}>
          <span>
            Основной счет будет использоваться в документах по умолчанию
          </span>
        </div>
      )}

      {data.length > 0 ? (
        <div className={s.contacts}>
          <div className={classNames(s.gridRow, s.header)}>
            <div>Банк</div>
            <div>БИК</div>
            <div>К/с</div>
            <div>Р/с</div>
            <div className={s.switchContainer}>Основной</div>
            <div></div>
          </div>

          {data.map((account) => (
            <BankAccountRow
              key={account.id}
              account={account}
              counterpartyId={counterpartyId}
            />
          ))}
        </div>
      ) : (
        <div className={s.empty}>Пока не добавлен ни один счет</div>
      )}
    </div>
  );
};

export default BankAccounts;

const BankAccountRow = ({ account, counterpartyId }) => {
  const { showToast } = useToast();
  const { showModal } = useModal();
  const [isActive, setIsActive] = useState(false);
  const [switchBankAccountStatus] = useSwitchBankAccountStatusMutation();

  useEffect(() => {
    setIsActive(Boolean(account.is_default));
  }, [account]);

  const handleOpenAccount = () => {
    showModal("BANK_ACCOUNT", {
      bankAccount: account,
      companyId: counterpartyId,
    });
  };

  const handleSwitchStatus = async (e) => {
    e.stopPropagation();
    if (!account.id) return;

    try {
      const res = await switchBankAccountStatus({
        accountId: account.id,
        // companyId: counterpartyId,
      }).unwrap();

      // if (res?.data?.success) {
      // } else {
      //     showToast('Не удалось изменить статус счета', 'error');
      // }
      setIsActive(!isActive);
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  return (
    <div className={classNames(s.gridRow)} onClick={handleOpenAccount}>
      <div className={s.bank}>
        <EllipsisWithTooltip text={account.bank || "-"} />
      </div>
      <div>{account.bik || "-"}</div>
      <div>{account.ks || "-"}</div>
      <div>{account.rs || "-"}</div>
      <div className={s.switchContainer}>
        {/* <Switch switchState={isActive} handleSwitch={handleSwitchStatus} /> */}
        {Boolean(account?.is_default) && <IconDoneGrey />}
      </div>
      <div></div>
    </div>
  );
};
