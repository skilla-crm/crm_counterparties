import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// Redux
import { setSelectedCompanies } from '../../../redux/filters/filtersSlice';
import { selectSelectedCompanies } from '../../../redux/filters/filtersSelectors';

// Components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import CompaniesList from 'components/Filters/CompanyFilter/CompaniesList/CompaniesList';

// Icons
import { ReactComponent as IconDocBag } from 'assets/icons/iconDocBag.svg';

// Styles
import s from './CompanyFilter.module.scss';

const CompanyFilter = ({ isFetching, setActiveFilter, clearActiveFilter, name }) => {
  const dispatch = useDispatch();
  const selectedCompanies = useSelector(selectSelectedCompanies);
  const companieslist = useSelector((state) => state.companiesList.companies) ?? [];
  const [localSelected, setLocalSelected] = useState(selectedCompanies);
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    setActiveFilter(name);
  };

  const handleConfirm = () => {
    dispatch(setSelectedCompanies(localSelected));
    setActiveFilter('companies');
    setIsOpen(false);
  };

  const handleReset = (e) => {
    e?.stopPropagation();
    setLocalSelected([]);
    dispatch(setSelectedCompanies([]));
    setIsOpen(false);
    clearActiveFilter();
  };

  const handleChange = (newSelected) => {
    setLocalSelected(newSelected);
  };
  useEffect(() => {
    setLoad(isFetching);

    const hasSelected = selectedCompanies?.length > 0;
    setDone(!isFetching && hasSelected);
  }, [isFetching, selectedCompanies]);

  useEffect(() => {
    setLocalSelected(selectedCompanies);
  }, [selectedCompanies]);

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
        title="Контрагент"
        Icon={IconDocBag}
        count={selectedCompanies.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
        load={load}
        done={done}
      />

      <div ref={modalRef} className={classNames(s.modal, { [s.modal_open]: isOpen })}>
        <CompaniesList
          isOpen={isOpen}
          items={companieslist}
          selected={localSelected}
          onChange={handleChange}
          onConfirm={handleConfirm}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default CompanyFilter;
