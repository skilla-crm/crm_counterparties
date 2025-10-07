import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

// Hooks
import { useModal } from 'hooks/useModal';
import useDeleteTransaction from 'hooks/useDeleteTransaction';

// Redux
import {
  useGetTransactionQuery,
  useUpdateTransactionMutation,
} from '../../../../redux/services/transactionApi';
import { useSelector } from 'react-redux';

// Components
import Combobox from 'components/General/Combobox/Combobox';
import DateInput from 'components/General/DateInput/DateInput';
import DatePickerCalendar from 'components/General/DatePickerCalendar/DatePickerCalendar';
import Dropdown from 'components/General/Dropdown/Dropdown';
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';
import PaymentDetails from './PaymentsDetails';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconDeleteRed } from 'assets/icons/iconDeleteRed.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// Styles
import s from './Transaction.module.scss';

const transactionTypeMap = {
  income: 'Поступление',
  refund_income: 'Возврат поступления',
  outcome: 'Платеж',
  refund_outcome: 'Возврат платежа',
};

const typeGroups = {
  income: ['income', 'refund_income'],
  outcome: ['outcome', 'refund_outcome'],
};

const getKeyByValue = (obj, value) => Object.keys(obj).find((key) => obj[key] === value);

const Transaction = () => {
  const { hideModal, modalProps } = useModal();
  const id = modalProps?.id;

  const [updateTransaction] = useUpdateTransactionMutation();
  const { data } = useGetTransactionQuery({ id });

  const companies = useSelector((state) => state.companiesList.companies) ?? [];

  const handleDeleteTransaction = useDeleteTransaction();
  const [transaction, setTransaction] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [hasValidationError, setHasValidationError] = useState(false);

  const typeKey = getKeyByValue(transactionTypeMap, transactionType);

  const isIncomeType = useMemo(() => typeGroups.income.includes(typeKey), [typeKey]);

  const transactionTypeOptions = useMemo(() => {
    const group = isIncomeType ? typeGroups.income : typeGroups.outcome;
    return group.map((key) => transactionTypeMap[key]);
  }, [isIncomeType]);

  const company = useMemo(
    () => ({
      name: data?.company_name,
      inn: data?.inn,
      kpp: data?.kpp,
      bank: data?.bank,
      bik: data?.bik,
      ks: data?.ks,
      rs: data?.rs,
    }),
    [data]
  );

  const payer = isIncomeType ? company : data?.partnership;
  const receiver = isIncomeType ? data?.partnership : company;

  const companyOptions = useMemo(
    () =>
      companies.map((company) => ({
        value: company.id,
        label: company.name,
        badge: company.label,
        inn: company.inn,
        kpp: company.kpp,
        ogrnip: company.ogrnip,
      })),
    [companies]
  );

  useEffect(() => {
    const company = companyOptions.find((c) => c.value === selectedCompanyId) ?? null;
    setSelectedCompany(company);
  }, [selectedCompanyId, companyOptions]);

  useLayoutEffect(() => {
    if (!data) return;
    setTransaction(data);
    setSelectedCompanyId(data?.company_id ?? null);
    setSelectedDate(dayjs(data.date, 'DD.MM.YYYY'));
    setTransactionType(transactionTypeMap[data.type]);
  }, [data]);
  // useLayoutEffect(() => {
  //   if (!modalProps?.id || !data) return;
  //   setTransaction(data);
  //   setSelectedCompanyId(data?.company_id ?? null);
  //   setSelectedDate(dayjs(data.date, 'DD.MM.YYYY'));
  //   setTransactionType(transactionTypeMap[data.type]);
  // }, [data, modalProps?.id]);

  const handleUpdateTransaction = () => {
    const typeKey = getKeyByValue(transactionTypeMap, transactionType);
    const isInvalid = !selectedCompanyId || !typeKey || !selectedDate;

    if (isInvalid) {
      setHasValidationError(true);
      return;
    }

    setHasValidationError(false);

    const payload = {
      date: selectedDate.format('DD.MM.YYYY'),
      type: typeKey,
      company_id: selectedCompanyId,
    };

    updateTransaction({ id: transaction.id, data: payload })
      .unwrap()
      .then(hideModal)
      .catch(console.error);
  };

  if (!transaction) return null;

  return (
    <Modal onClose={hideModal}>
      <div className={s.modal}>
        <header className={s.modalHeader}>
          <div className={s.title}>
            <h3>{`Транзакция ${transaction.number} от ${transaction.date}`}</h3>
          </div>
          <button className={s.close} onClick={hideModal}>
            <IconCloseBlack />
          </button>
        </header>

        <section className={s.body}>
          <PaymentDetails payer={payer} receiver={receiver} data={transaction} />
        </section>

        {/* <footer className={s.controlSection}>
          <div className={s.control}>
            <DateInput selectedDate={selectedDate} setOpenCalendar={setOpenCalendar} />
            {openCalendar && (
              <DatePickerCalendar
                value={selectedDate}
                setValue={setSelectedDate}
                setOpenCalendar={setOpenCalendar}
                nosub={false}
              />
            )}
            <Dropdown
              options={transactionTypeOptions}
              value={transactionType}
              style={{ width: '240px' }}
              onChange={setTransactionType}
            />
          </div>

          <div>
            <Combobox
              hasError={hasValidationError}
              value={selectedCompany}
              className={s.combobox}
              options={companyOptions}
              onChange={(option) => setSelectedCompanyId(option.value)}
            />
          </div>

          <div className={s.control_btn}>
            <UniButton
              width={120}
              iconPosition="right"
              type="danger"
              icon={IconDeleteRed}
              text="Удалить"
              onClick={(e) => handleDeleteTransaction(transaction.id, e)}
            />
            <UniButton
              iconPosition="right"
              width={314}
              type="primary"
              icon={IconDoneWhite}
              text="Сохранить"
              onClick={handleUpdateTransaction}
            />
          </div>
        </footer> */}

        <div className={s.footer}></div>
      </div>
    </Modal>
  );
};

export default Transaction;
