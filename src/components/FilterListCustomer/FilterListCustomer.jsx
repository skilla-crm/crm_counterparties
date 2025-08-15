import s from "./FilterListCustomer.module.scss";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetParametersQuery } from "../../redux/updsApiActions";
import { ReactComponent as IconSearch } from "../../assets/icons/iconSearch.svg";
import { ReactComponent as IconDone } from "../../assets/icons/filters/iconDone.svg";
import { ReactComponent as IconCloseBlue } from "../../assets/icons/iconCloseBlue.svg";
//slice
import { setFilterCustomers } from "../../redux/filters/slice";
//components
import CheckBox from "../Genegal/CheckBox/CheckBox";
import Button from "../Genegal/Button/Button";
import ButtonSecond from "../Genegal/ButtonSecond/ButtonSecond";
//utils
import { handleSearchCompany } from "../../utils/SearchCompany";

const FilterListCustomer = ({
  items,
  openModal,
  handleReset,
  setOpenModal,
  setLoad,
  load,
  setDone,
}) => {
  const { data: parameters, isLoading: isLoadingParams } =
    useGetParametersQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCompany, setActiveCompany] = useState(items || []);
  const [filterCompanies, setFilterCompanies] = useState(
    parameters?.companies || []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setFilterCompanies(parameters?.companies);
  }, [parameters]);

  useEffect(() => {
    setActiveCompany(items);
  }, [items]);

  const handleSearch = (e) => {
    const value = e.currentTarget.value;
    setSearchQuery(value);
    const result = handleSearchCompany(value, parameters?.companies);
    setFilterCompanies(result);
  };

  const handleConfirm = () => {
    setDone(false);
    setLoad(true);
    dispatch(setFilterCustomers(activeCompany));
    setOpenModal(false);
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.header}>
          <p>Контрагент</p>
        </div>

        <div className={s.search}>
          <IconSearch />
          <input
            onChange={handleSearch}
            value={searchQuery || ""}
            type="text"
          ></input>
        </div>

        <ul className={s.list}>
          {filterCompanies?.map((el) => {
            return (
              <Items
                key={el.id}
                el={el}
                activeCompany={activeCompany}
                setActiveCompany={setActiveCompany}
              />
            );
          })}
        </ul>
      </div>

      <div className={s.buttons}>
        <ButtonSecond
          Icon={IconCloseBlue}
          type={"list"}
          handler={handleReset}
          buttonText={"Сбросить"}
          isLoading={false}
        />

        <Button
          Icon={IconDone}
          type={"list"}
          handler={handleConfirm}
          buttonText={"Применить"}
          isLoading={load}
          width={true}
        />
      </div>
    </div>
  );
};

const Items = ({ el, activeCompany, setActiveCompany }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const result = activeCompany?.find((item) => item == el.id);
    result ? setActive(true) : setActive(false);
  }, [activeCompany]);

  const handleCheck = (e) => {
    const id = Number(e.currentTarget.id);
    if (!active) {
      setActiveCompany((prevState) => [...prevState, id]);
    } else {
      setActiveCompany((prevState) => [...prevState.filter((el) => el !== id)]);
    }
  };

  return (
    <div onClick={handleCheck} id={el.id} className={s.item}>
      <div className={s.check}>
        <CheckBox active={active} />
      </div>

      <div className={s.block}>
        <p>{el.name}</p>
        <span>
          ИНН: {el.inn} {el.kpp && el.kpp !== "" && `КПП: ${el.kpp}`}
        </span>
        <span></span>
      </div>
    </div>
  );
};

export default FilterListCustomer;
