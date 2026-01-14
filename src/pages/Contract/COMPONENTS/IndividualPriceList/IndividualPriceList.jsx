import { useState } from "react";
import classNames from "classnames";
//icons
import { ReactComponent as IconPlusBlue } from "assets/icons/iconPlusBlue.svg";
import { ReactComponent as IconArrowDown } from "assets/icons/iconChewron.svg";

//components
import Rate from "./components/Rate";

//redux
import { useSelector, useDispatch } from "react-redux";
//slice
import {
  editPriceRates,
  addEmpityPriceRate,
} from "../../../../redux/ratesContract/slice";

//styles
import s from "./IndividualPriceList.module.scss";

const IndividualPriceList = ({ data = [], disabled }) => {
  const dispatch = useDispatch();
  const { priceRates, rateChanged, allDataRate } = useSelector(
    (state) => state.ratesContract
  );
  const [openList, setOpenList] = useState(true);
  const handleAddRate = () => {
    dispatch(addEmpityPriceRate());
    return;
  };

  const handleOpenList = () => {
    setOpenList(!openList);
  };

  return (
    <div className={s.root}>
      <div className={s.header}>
        <h3 className={s.title}>Прайс-лист договора</h3>
        <button className={s.openListBtn} onClick={handleOpenList}>
          <IconArrowDown
            className={classNames(s.arrow, openList && s.arrow_open)}
          />
        </button>
      </div>
      {priceRates.length > 0 && openList && (
        <span className={s.infoTitle}>
          Занесенный 0 в графу означает - "по согласованию". Идет только в
          договор. Ставка рабочим не публикуется.
        </span>
      )}
      <div className={s.content}>
        <div className={classNames(s.list, openList && s.list_open)}>
          {priceRates.length > 0 && (
            <>
              <div className={s.subs}>
                <span style={{ width: "100%" }}>Наименование</span>
                <span style={{ width: "300px" }}></span>
                <span style={{ width: "100px" }}>Ед. изм.</span>
                <span style={{ width: "120px" }}>Мин. единиц</span>
                <span style={{ width: "120px" }}>Клиенту</span>
                <span style={{ width: "120px" }}>Исполнителям</span>
              </div>
              {priceRates.map((el, i) => {
                return (
                  <Rate
                    disabled={disabled}
                    id={el.id}
                    number={i + 1}
                    key={el.id}
                    data={el}
                    type={"price"}
                    setValue={(value) =>
                      dispatch(
                        editPriceRates({
                          id: el.id,
                          ...value,
                        })
                      )
                    }
                  />
                );
              })}
            </>
          )}
          {!disabled && (
            <button
              className={classNames(s.add, s.add_hidden)}
              onClick={handleAddRate}
            >
              <IconPlusBlue />
              Добавить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default IndividualPriceList;
