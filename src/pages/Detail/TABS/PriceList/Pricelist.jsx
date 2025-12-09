import Rate from "components/General/Rate/Rate";
import s from "./PriceList.module.scss";
import classNames from "classnames";
//icons
import { ReactComponent as IconPlusBlue } from 'assets/icons/iconPlusBlue.svg';
//redux
import { useSelector, useDispatch } from 'react-redux';
//slice
import { editPriceRates, addEmpityPriceRate } from "../../../../redux/rates/slice";

const PriceList = ({ data = [] }) => {
  const dispatch = useDispatch();
  const { priceRates, rateChanged, allDataRate } = useSelector((state) => state.rates);

  const handleAddRate = () => {
      dispatch(addEmpityPriceRate())
      return  
  }

  return (
    <div className={s.root}>
      {priceRates.length > 0 && (
        <span className={s.infoTitle}>
          Занесенный 0 в графу означает - "по согласованию". Идет только в
          договор. Ставка рабочим не публикуется.
        </span>
      )}
      <div className={s.content}>
        {priceRates.length > 0 ? (
          <div className={s.list}>
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
                  id={el.id}
                  number={i + 1}
                  key={el.id}
                  data={el}
                  type={"price"}
                  setValue={(value) => dispatch(editPriceRates({ id: el.id, ...value }))}
                />
              );
            })}
            <button className={classNames(s.add, s.add_hidden)} onClick={handleAddRate}><IconPlusBlue />Добавить</button>
          </div>
        ) : (
          <div className={s.empty}>Пока не добавлен ни один прайс-лист</div>
        )}
      </div>
    </div>
  );
};
export default PriceList;
