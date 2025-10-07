import { useEffect, useRef, useState } from 'react';

// utils
import renderOgrn from 'utils/renderOgrn';

// components
import FilterSearch from 'components/Filters/COMPONENTS/FilterSearch/FilterSearch';
import CheckBox from 'components/General/CheckBox/CheckBox';
import UniButton from 'components/General/UniButton/UniButton';
import CompanyLabelBadge from 'components/General/CompanyLabelBadge/CompanyLabelBadge';
// icons
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDone } from 'assets/icons/iconDoneWhite.svg';
// styles
import s from './CompaniesList.module.scss';

const CompaniesList = ({ items, selected, onChange, onConfirm, onReset, isOpen }) => {
  const companies = Array.isArray(items) ? items : [];
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  const listRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('auto');

  useEffect(() => {
    setFilteredCompanies(companies);
  }, [items]);

  const handleCheck = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((receiverId) => receiverId !== id)
      : [...selected, id];
    onChange(updated);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (listRef.current) {
        const listItems = listRef.current.querySelectorAll('li');
        let heightSum = 0;
        for (let i = 0; i < 4 && i < listItems.length; i++) {
          heightSum += listItems[i].offsetHeight;
        }
        setMaxHeight(`${heightSum}px`);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [items]);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.header}>
          <p>Контрагент</p>
        </div>

        <FilterSearch
          items={companies}
          onFilter={setFilteredCompanies}
          isOpen={isOpen}
          type="companies"
        />

        <ul className={s.list} style={{ maxHeight }} ref={listRef}>
          {filteredCompanies.map((el) => (
            <li key={el.id} onClick={() => handleCheck(el.id)} className={s.item}>
              <div className={s.check}>
                <CheckBox active={selected.includes(el.id)} />
              </div>
              <div className={s.block}>
                {el?.inn?.length === 10 ? (
                  <div className={s.blockDetails}>
                    <p>{el.name}</p>
                    <span>
                      {el?.inn && `ИНН ${el.inn} `}
                      {el?.kpp && `КПП ${el.kpp}`}
                    </span>
                  </div>
                ) : (
                  <div className={s.blockDetails}>
                    <p>{el.name}</p>
                    <span>{el?.inn && `ИНН ${el.inn} `}</span>
                    <span> {el?.ogrn && `ОГРНИП ${el.ogrn}`}</span>
                  </div>
                )}
                <CompanyLabelBadge label={el.label} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={s.buttons}>
        <UniButton icon={IconCloseBlue} type="outline" onClick={onReset} text="Сбросить" />
        <UniButton
          icon={IconDone}
          type="primary"
          onClick={onConfirm}
          text="Применить"
          width={268}
        />
      </div>
    </div>
  );
};

export default CompaniesList;
const partnership = {
  partnership_name: 'ООО «ТЕСТОВАЯ КОМПАНИЯ»',
  inn: '6317148649',
  kpp: '',
  rs: '33333333333333333333',
  bank: 'СБЕРтест',
  city: 'Санкт-Петербург',
  num: 1,
  partnership_id: 17,
  nds: 20,
  bill_num: 1,
  act_num: 1,
  invoice_num: 1,
  upd_num: 1,
  ogrn: '123123123',
};
