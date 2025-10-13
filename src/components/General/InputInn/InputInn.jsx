import { useState, useEffect, useRef, useCallback } from "react";
import { useGetCompanyInfoMutation } from "../../../redux/services/dadataApiActions";
import CompanyListInn from "../CompanyList/CompanyListInn";
import s from "./Input.module.scss";
import useDebounce from "hooks/useSimpleDebounce";
import classNames from "classnames";

const InputInn = ({
  value,
  setValue,
  valueKpp,
  setField,
  types,
  disabled,
  form,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [fieldFocus, setFieldFocus] = useState(false);
  const [addKppValue, setAddKppValue] = useState(valueKpp || "");
  const [noFind, setNoFind] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef();
  const [getCompanyInfo] = useGetCompanyInfoMutation();
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (!debouncedValue) {
      setError("");
      return;
    }

    if (debouncedValue.length !== 10 && debouncedValue.length !== 12) {
      setError("ИНН должен содержать 10 или 12 цифр");
      setSuggestions([]);
      setNoFind(false);
      setOpenList(false);
      return;
    }

    setError("");

    const fetchData = async () => {
      try {
        const res = await getCompanyInfo({
          query: debouncedValue,
          kpp: addKppValue,
        }).unwrap();

        setSuggestions(res.suggestions);
        setNoFind(res.suggestions.length === 0 && fieldFocus);
        setOpenList(res.suggestions.length > 0 && fieldFocus);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [debouncedValue, addKppValue, getCompanyInfo, fieldFocus]);

  const handleChoose = useCallback(
    (company) => {
      setField("inn", company.inn);
      setField("kpp", company.kpp);
      setField("ogrn", company.ogrn);
      setField("name", company?.name?.short_with_opf);
      setField("ur_adress", company?.address?.unrestricted_value);
      setField("adress", company?.address?.value);
      setField("signature", company?.management?.name || "");
      setField("signature_position", company?.management?.post || "");

      const legalForm = types.find(
        (el) =>
          el.name === company?.opf?.short ||
          el.full_name === company?.type?.full
      );
      setField("legal_form_id", legalForm ? legalForm.id : "");

      setOpenList(false);
    },
    [setField, types]
  );

  const handleBlur = () => {
    setTimeout(() => setOpenList(false), 200);
    setFieldFocus(false);
  };

  return (
    <div className={s.container}>
      <input
        className={`${s.input} ${error ? s.error : ""}`}
        ref={inputRef}
        value={value}
        onChange={(e) => {
          !disabled && setValue(e.target.value.replace(/\D/g, ""));
          setNoFind(false);
        }}
        onFocus={() => {
          setFieldFocus(true);
          if (suggestions.length > 0) setOpenList(true);
        }}
        onBlur={handleBlur}
        disabled={disabled}
      />

      <div className={classNames(s.errorText, error && s.errorText_active)}>
        <p>ИНН должен состоять из 10 или 12 цифр</p>
      </div>

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

export default InputInn;
