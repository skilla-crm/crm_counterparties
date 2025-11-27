import { useState, useEffect, useRef, useCallback } from "react";
import useDebounce from "hooks/useSimpleDebounce";

import CompanyListInn from "../CompanyList/CompanyListInn";
import classNames from "classnames";
import s from "./InputCompanyName.module.scss";
import { useGetCompaniesByNameMutation } from "../../../redux/services/dadataApiActions";

const InputCompanyName = ({
  value,
  setValue,
  setField,
  types,
  disabled,
  width,
  placeholder,
  form,
  isEditMode,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [fieldFocus, setFieldFocus] = useState(false);
  const [noFind, setNoFind] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef();
  const [getCompaniesByName] = useGetCompaniesByNameMutation();
  // const [debouncedValue] = useDebounce(value, 500);

  useEffect(() => {
    if (isEditMode) return;
    if (!value) {
      setSuggestions([]);
      setNoFind(false);
      setOpenList(false);
      setError("");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getCompaniesByName({
          data: value,
        }).unwrap();

        setSuggestions(res.suggestions);
        setNoFind(res.suggestions.length === 0 && fieldFocus);
        setOpenList(res.suggestions.length > 0 && fieldFocus);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
        setNoFind(false);
        setOpenList(false);
      }
    };

    fetchData();
  }, [value, getCompaniesByName, fieldFocus]);

  const handleChoose = useCallback(
    (company) => {
      if (!isEditMode) {
        setField("inn", company.inn);
      }
      setField("kpp", company.kpp);
      setField("ogrn", company.ogrn);
      setField("name", company?.name?.short_with_opf);
      setField("ur_address", company?.address?.unrestricted_value);
      setField("address", company?.address?.value);
      setField("director", company?.management?.name || "");
      setField("director_position", company?.management?.post || "");

      setOpenList(false);
    },
    [setField, types, isEditMode]
  );

  const handleBlur = () => {
    setTimeout(() => setOpenList(false), 200);
    setFieldFocus(false);
  };

  return (
    <div
      className={s.container}
      style={{ width: width ? `${width}px` : "100%" }}
    >
      <input
        className={`${s.input} ${error ? s.error : ""}`}
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setNoFind(false);
        }}
        onFocus={() => {
          setFieldFocus(true);
          if (suggestions.length > 0) setOpenList(true);
        }}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
      />

      {error && (
        <div className={classNames(s.errorText, s.errorText_active)}>
          <p>{error}</p>
        </div>
      )}

      {openList && (
        <CompanyListInn
          list={suggestions}
          openList={openList}
          listScroll={suggestions.length > 5}
          noFind={noFind}
          handleChose={handleChoose}
          selectedInn={value}
        />
      )}
    </div>
  );
};

export default InputCompanyName;
