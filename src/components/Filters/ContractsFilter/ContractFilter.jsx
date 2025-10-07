import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import FilterSearch from '../COMPONENTS/FilterSearch/FilterSearch';

// icons
import { ReactComponent as IconDocumentGrey } from 'assets/icons/iconDocumentGrey.svg';
import { ReactComponent as IconDoneGrey } from 'assets/icons/iconDoneGrey.svg';
// styles
import s from './ContractsFilter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedContract } from '../../../redux/filters/filtersSlice';

const contracts = [
  {
    id: 1,
    number: 1,
    date: '01.01.2023',
  },
  {
    id: 2,
    number: 2,
    date: '01.01.2023',
  },
  {
    id: 3,
    number: 3,
    date: '01.01.2023',
  },
];
const ContractsFilter = ({ isFetching, setActiveFilter, clearActiveFilter, name }) => {
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const selectedContract = useSelector((state) => state.filters.selectedContract);
  //   const companieslist = useSelector((state) => state.companiesList.companies) ?? [];
  const [filteredContracts, setFilteredContracts] = useState(contracts);

  const handleOpen = () => {
    setIsOpen(true);
    setActiveFilter(name);
  };

  const handleReset = (e) => {
    e?.stopPropagation();
    dispatch(setSelectedContract(null));
    setIsOpen(false);
    clearActiveFilter();
  };

  const handleSelect = (contractId) => {
    dispatch(setSelectedContract(contractId));
    setIsOpen(false);
    clearActiveFilter();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        clearActiveFilter();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={s.root}>
      <FilterButton
        title="Договор"
        Icon={IconDocumentGrey}
        count={selectedContract ? 1 : 0}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
        load={isFetching}
        done={!!selectedContract}
      />

      <div ref={modalRef} className={classNames(s.modal, { [s.modal_open]: isOpen })}>
        <div className={s.container}>
          <div className={s.header}>
            <p>Договор</p>
          </div>

          <FilterSearch
            items={contracts}
            onFilter={setFilteredContracts}
            isOpen={isOpen}
            type="contracts"
          />

          <ul className={s.list}>
            {filteredContracts.map((contract) => (
              <li
                key={contract.id}
                onClick={() => handleSelect(contract.id)}
                className={classNames(s.item, {
                  [s.item_selected]: selectedContract === contract.id,
                })}
              >
                <div className={s.info}>
                  {' '}
                  <span className={s.number}>№{contract.number}</span>
                  <span className={s.date}>{contract.date}</span>
                </div>
                {selectedContract === contract.id && (
                  <span className={s.checkmark}>
                    <IconDoneGrey />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContractsFilter;
