import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

// icons
import { ReactComponent as IconChevron } from "assets/icons/iconChewron.svg";

// styles
import s from "./Dropdown.module.scss";
import EllipsisWithTooltip from "components/General/EllipsisWithTooltip/EllipsisWithTooltip";

const Dropdown = ({
  sub = "",
  options = [],
  value = null,
  onChange = () => {},
  placeholder = "",
  width,
  renderOption,
  type = "company", // 'company' | 'account'  | 'type' | 'person
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const hasOptions = options.length > 0;

  const toggleDropdown = () => {
    if (disabled) return;
    if (hasOptions) setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    if (disabled) return;
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const wrapperStyle =
    width && typeof width === "number" ? { width: `${width}px` } : {};

  // Отображение выбранного значения
  const renderValue = () => {
    if (!value) return placeholder;

    switch (type) {
      case "company":
        return (
          <div className={s.optionCompany}>
            <div className={s.companyName}>{value.name ?? ""}</div>
            <div
              className={s.companyDetails}
            >{`ИНН${value.inn ?? ""} КПП${value.kpp ?? ""}`}</div>
          </div>
        );
      case "account":
        return (
          <div className={s.optionAccount}>
            <div className={s.accountName}>{value.bank ?? ""}</div>
            <div>{`*${value?.rs?.slice(-4)}`}</div>
          </div>
        );
      case "type":
        return <div className={s.optionType}>{value?.type_name ?? ""}</div>;

      case "person":
        return (
          <div className={s.optionPerson}>
            {`${value?.surname ?? ""} ${value?.name ?? ""} ${value?.patronomyc ?? ""}`}
          </div>
        );
      default:
        return value?.toString?.() || placeholder;
    }
  };

  // Список опций
  const renderOptionsList = () =>
    options.map((option) => {
      let content;

      if (renderOption) {
        content = renderOption(option);
      } else {
        switch (type) {
          case "company":
            content = (
              <div className={s.optionCompany}>
                <div className={s.companyName}>{option.name ?? ""}</div>
                <div
                  className={s.companyDetails}
                >{`ИНН${option.inn ?? ""} КПП${option.kpp ?? ""}`}</div>
              </div>
            );
            break;
          case "account":
            content = (
              <div className={s.optionAccount}>
                <div className={s.accountName}>{option.bank ?? ""}</div>
                <div>{`*${option?.rs?.slice(-4)}`}</div>
              </div>
            );

            break;

          case "type":
            content = (
              <div className={s.optionType}>{option?.type_name ?? ""}</div>
            );
            break;

          case "person":
            content = (
              <div className={s.optionPerson}>
                {`${option?.surname ?? ""} ${option?.name ?? ""} ${option?.patronomyc ?? ""}`}
              </div>
            );
            break;
          default:
            content = option?.toString() || "";
            break;
        }
      }

      const isSelected = value?.id === option.id;

      return (
        <div
          key={option.id}
          className={classNames(s.option, {
            [s.selected]: isSelected,
          })}
          onClick={() => handleOptionClick(option)}
        >
          {content}
        </div>
      );
    });

  return (
    <div className={s.root} style={wrapperStyle} ref={wrapperRef}>
      {sub && <div className={s.sub}>{sub}</div>}

      <div
        className={classNames(s.field, disabled && s.field_disabled)}
        onClick={toggleDropdown}
      >
        {renderValue()}

        {!disabled && hasOptions && (
          <IconChevron
            className={classNames(s.chevron, isOpen && s.chevron_open)}
          />
        )}
      </div>

      {hasOptions && isOpen && !disabled && (
        <ul
          className={classNames(
            s.block,
            options.length > 6 && s.block_scroll,
            s.block_open
          )}
        >
          <div className={s.list}>{renderOptionsList()}</div>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
