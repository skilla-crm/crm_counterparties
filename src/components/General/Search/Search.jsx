import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

// styles
import s from "./Search.module.scss";

// icons
import { ReactComponent as IconClose } from "./icons/iconClose.svg";
import { ReactComponent as IconDone } from "./icons/iconDone.svg";
import { ReactComponent as IconEnter } from "./icons/iconEnter.svg";
import { ReactComponent as IconSearch } from "./icons/iconSearch.svg";

// components
import LoaderCircle from "./LoaderCircle/LoaderCircle";

const Search = ({
  isFetching,
  searchValue,
  setSearchQuery,
  placeholder = "Искать...",
  style = {},
}) => {
  const [active, setActive] = useState(false);
  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);
  const [enterState, setEnterState] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    query.length > 0 && setLoad(isFetching);
    isFetching && setDone(false);
  }, [isFetching, query]);

  useEffect(() => {
    !load && query.length > 0 && setDone(true);
    load && setDone(false);
  }, [load]);

  useEffect(() => {
    searchValue.length === 0 && handleReset();
  }, [searchValue]);

  const handleFocus = () => setActive(true);
  const handleBlur = () => setActive(false);

  const handleQuery = (e) => {
    const value = e.currentTarget.value;
    setQuery(value);
    setDone(false);
    setEnterState(true);
    if (value.length === 0) setSearchQuery("");
  };

  const handleReset = () => {
    setSearchQuery("");
    setQuery("");
    setLoad(false);
    setDone(false);
    setEnterState(true);
  };

  const handleOnFocus = () => {
    if (query.length === 0) inputRef.current.focus();
  };

  const handleSearch = () => {
    if (query.length > 0) {
      setEnterState(false);
      setSearchQuery(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      inputRef.current.blur();
    }
    if (e.key === "Escape") {
      handleReset();
      inputRef.current.focus();
    }
  };

  return (
    <div
      onKeyDown={handleKeyPress}
      onClick={handleOnFocus}
      className={classNames(s.root, active && s.root_active)}
      style={style}
    >
      <div
        className={classNames(
          s.icons,
          (active || query.length > 0) && !load && !done && s.icons_hidden
        )}
      >
        {!load && !done && (
          <IconSearch
            className={classNames(
              s.icon,
              (active || query.length > 0 || isFetching) && s.icon_hidden
            )}
          />
        )}
        {done && <IconDone />}
        <LoaderCircle vis={load} />
      </div>

      <input
        ref={inputRef}
        onChange={handleQuery}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={query}
        placeholder={placeholder}
      />

      <IconClose
        onClick={handleReset}
        className={classNames(s.clear, query.length > 0 && s.clear_vis)}
      />
      <button
        onClick={handleSearch}
        ref={buttonRef}
        className={classNames(
          s.button,
          query.length > 0 && enterState && s.button_vis
        )}
      >
        <p>Поиск</p>
        <IconEnter />
      </button>
    </div>
  );
};

export default Search;
