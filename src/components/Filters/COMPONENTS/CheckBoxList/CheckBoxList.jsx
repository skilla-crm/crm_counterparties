import classNames from 'classnames';

//components
import CheckBox from 'components/General/CheckBox/CheckBox';

import s from './CheckBoxList.module.scss';

const CheckBoxList = ({ list, active, setActive, column }) => {
  const handleActive = (e) => {
    const id = e.currentTarget.dataset.id;
    if (active?.some((el) => el === id)) {
      setActive((prevState) => [...prevState].filter((el) => el !== id));
    } else {
      setActive((prevState) => [...prevState, id]);
    }
  };

  return (
    <div className={classNames(s.root, column && s.root_column)}>
      {list?.map((el) => {
        const isActive = active?.some((item) => item === el.id);
        return (
          <li
            onClick={handleActive}
            key={el.id}
            data-id={el.id}
            className={classNames(s.item, isActive && s.item_active)}
          >
            <CheckBox active={isActive} />
            <div className={s.item_content}>
              <p className={s.companyName}>{el.name}</p>
              <div className={s.companyDetails}>
                ИНН {el.inn} {el.kpp && <>КПП {el.kpp}</>}
                {el.ogrnip && (
                  <>
                    <br />
                    ОГРНИП {el.ogrnip}
                  </>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default CheckBoxList;
