// External
import { useEffect, useState } from "react";
import classNames from "classnames";

// Hooks
import useToast from "hooks/useToast";

// Redux
import { useSwitchObjectStatusMutation } from "../../../../redux/services/counterpartyDetailsApiActions";

// Components
import EllipsisWithTooltip from "components/General/EllipsisWithTooltip/EllipsisWithTooltip";

// Icons

import { ReactComponent as IconDoneGrey } from "assets/icons/iconDoneGrey.svg";

// Styles
import s from "./Objects.module.scss";

const data = [
  {
    id: 1,
    name: "Центральный офис",
    address: "г. Москва, ул. Ленина, д. 15",
    is_default: true,
  },
  {
    id: 2,
    name: "Склад №1",
    address: "г. Санкт-Петербург, пр. Мира, д. 42",
    is_default: false,
  },
  {
    id: 3,
    name: "Филиал в Новосибирске",
    address: "г. Новосибирск, ул. Кирова, д. 8",
    is_default: false,
  },
];

const Objects = ({ counterpartyId }) => {
  return (
    <div className={s.root}>
      <span style={{ color: "red" }}>МОКОВНЫЕ ДАННЫЕ!!!!!!!!!!</span>
      <div className={s.infoTitle}>
        <span>Основной объект будет использоваться по умолчанию</span>
      </div>
      <div className={s.objects}>
        <div className={classNames(s.gridRow, s.header)}>
          <div>Название</div>
          <div>Адрес</div>
          <div className={s.switchContainer}>Основной</div>
          <div></div>
        </div>

        {data.length > 0 ? (
          data.map((object) => (
            <ObjectsRow
              key={object.id}
              object={object}
              counterpartyId={counterpartyId}
            />
          ))
        ) : (
          <div className={s.empty}>Пока не добавлен ни один объект</div>
        )}
      </div>
    </div>
  );
};
export default Objects;

const ObjectsRow = ({ object, counterpartyId }) => {
  const { showToast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [switchObjectStatus] = useSwitchObjectStatusMutation();

  useEffect(() => {
    setIsActive(Boolean(object.is_default));
  }, [object]);

  const handleSwitchStatus = async () => {
    if (!object.id) return;

    try {
      const res = await switchObjectStatus({
        objectId: object.id,
        companyId: counterpartyId,
      }).unwrap();

      if (res?.data?.success) {
        setIsActive(!isActive);
      } else {
        showToast("Не удалось изменить статус оъекта", "error");
      }
    } catch {
      showToast("Произошла ошибка", "error");
    }
  };

  return (
    <div className={classNames(s.gridRow)}>
      <div>
        <EllipsisWithTooltip text={object.name} />
      </div>
      <div>
        <EllipsisWithTooltip text={object.address} />
      </div>

      <div className={s.switchContainer}>{isActive && <IconDoneGrey />}</div>
      <div></div>
    </div>
  );
};
