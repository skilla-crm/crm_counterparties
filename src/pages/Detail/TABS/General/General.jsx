// External
import { useEffect, useState } from "react";
import dayjs from "dayjs";

// Hooks
import useToast from "hooks/useToast";

// Redux
import {
  useSwitchCounterpartyHiddenMutation,
  useSwitchCounterpartyStatisticMutation,
  useSwitchCounterpartyStopListMutation,
  useUpdateNoteMutation,
  useUpdateLabelMutation
} from "../../../../redux/services/counterpartyDetailsApiActions";

// Utils
import formatNumWithSpace from "utils/formatNumWithSpace";

// Components
import Switch from "components/EmailSender/Switch/Switch";
import TextArea from "components/General/TextArea/TextArea";
import IconWithTooltip from "components/General/IconWithTooltip/IconWithTooltip";

// Icons
import { ReactComponent as IconCloseRed } from "assets/icons/iconCloseRed.svg";
import { ReactComponent as IconDoneGreen } from "assets/icons/iconDoneGreen.svg";
import { ReactComponent as IconUnknown } from "assets/icons/iconUnknown.svg";
import { ReactComponent as IconInfo } from "assets/icons/iconInfo.svg";

// Styles
import s from "./General.module.scss";

const hasValue = (value) => {
  if (value === null || value === undefined) {
    return false;
  }
  return String(value).trim() !== "" && String(value).trim() !== "0";
};

const formatText = (...values) =>
  values
    .filter((value) => hasValue(value))
    .join(" ")
    .trim();

const General = ({ data = {} }) => {
  const { showToast } = useToast();
  const {
    okved,
    okved_name,
    employee_count,
    revenue,
    is_black,
    is_hidden,
    statistic_hidden,
    label,
    notes,
    person_add,
    edo_enabled,
    site,
    date_add,
    company_id,
  } = data;

  const [isHidden, setIiHidden] = useState(false); // больше не работаем c контрагентом
  const [isBlack, setIsBlack] = useState(false); //стоп лист
  const [isStatisticHidden, setIsStatisticHidden] = useState(false); // не учитывать в статистике
  const [labelValue, setLabelValue] = useState('')
  const [comment, setComment] = useState("");
  const [updateNote] = useUpdateNoteMutation();
  const [updateLabel] = useUpdateLabelMutation();

  const [switchCounterpartyStatistic] =
    useSwitchCounterpartyStatisticMutation();
  const [switchCounterpartyStopList] = useSwitchCounterpartyStopListMutation();
  const [switchCounterpartyHidden] = useSwitchCounterpartyHiddenMutation();

  useEffect(() => {
    setComment(notes ?? "");
  }, [notes]);

  useEffect(() => {
    setLabelValue(label ?? "");
  }, [label]);

  useEffect(() => {
    setIiHidden(Boolean(is_hidden));
  }, [is_hidden]);
  useEffect(() => {
    setIsBlack(Boolean(is_black));
  }, [is_black]);
  useEffect(() => {
    setIsStatisticHidden(Boolean(statistic_hidden));
  }, [statistic_hidden]);

  const handleSwitchIsHidden = () => {
    switchCounterpartyHidden(company_id)
      .unwrap()
      .then((res) => {
        if (res.message === "Request processed successfully") {
          setIiHidden(!isHidden);
        }
      })
      .catch((e) => {
        showToast("Произошла ошибка", "error");
      });
  };
  const handleSwitchIsBlack = () => {
    switchCounterpartyStopList(company_id)
      .unwrap()
      .then((res) => {
        if (res.message === "Request processed successfully") {
          setIsBlack(!isBlack);
        }
      })
      .catch((e) => {
        showToast("Произошла ошибка", "error");
      });
  };
  const handleSwitchStatistic = () => {
    switchCounterpartyStatistic(company_id)
      .unwrap()
      .then((res) => {
        if (res.message === "Request processed successfully") {
          setIsStatisticHidden(!isStatisticHidden);
        }
      })
      .catch((e) => {
        showToast("Произошла ошибка", "error");
      });
  };

  const handleUpdateLabel = () => {
    if (label !== labelValue) {
      updateLabel({ data: { label: labelValue }, companyId: company_id })
        .unwrap()
        .then((res) => {
          if (res.success) {
            showToast("Ярлык обновлен", "success");
          }
        })
        .catch((e) => {
          showToast("Произошла ошибка", "error");
        });
      return
    }
  };

  const handleUpdateNote = () => {
    if (notes !== comment) {
      updateNote({ data: { notes: comment }, companyId: company_id })
        .unwrap()
        .then((res) => {
          if (res.success) {
            showToast("Заметка обновлена", "success");
          }
        })
        .catch((e) => {
          showToast("Произошла ошибка", "error");
        });
      return
    }
  };

  const handleKeyDownLabel = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleUpdateLabel();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleUpdateNote();
    }
  };
  return (
    <div className={s.root}>
      <div className={s.gridContainer}>
        <div className={s.row}>
          <p>ЭДО</p>
          <div>
            {edo_enabled !== 1 ? (
              <div className={s.rowElement}>
                <IconCloseRed />
                <span style={{ color: "#E10D0D" }}>Не подключен</span>
              </div>
            ) : (
              <div className={s.rowElement}>
                <IconDoneGreen />
                <span style={{ color: "#28A879" }}>Подключен</span>
              </div>
            )}
          </div>
        </div>
        <div className={s.row}>
          <p>ОКВЭД</p>
          {hasValue(okved) ? (
            <div>{formatText(okved, okved_name)}</div>
          ) : (
            <Unknown />
          )}
        </div>
        <div className={s.row}>
          <p>Выручка за пред. год</p>
          {hasValue(revenue) ? (
            <div>{`${formatNumWithSpace(revenue)}`}</div>
          ) : (
            <Unknown />
          )}
        </div>
        <div className={s.row}>
          <p>Среднесписочная численность</p>
          {hasValue(employee_count) ? (
            <div>{`${formatNumWithSpace(employee_count)} чел.`}</div>
          ) : (
            <Unknown />
          )}
        </div>
        <div className={s.row}>
          <p>Сайт</p>
          {hasValue(site) ? <div>{site}</div> : <Unknown />}
        </div>
        <div className={s.row}>
          <p>Ярлык</p>
          <div>
            <TextArea
              value={labelValue}
              setValue={setLabelValue}
              rows={1}
              onBlur={handleUpdateLabel}
              onKeyDown={handleKeyDownLabel}
              width={200}
            />
          </div>
        </div>
        <div className={s.row}>
          <p>Комментарий</p>
          <div>
            <TextArea
              value={comment}
              setValue={setComment}
              rows={4}
              onBlur={handleUpdateNote}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className={s.row}>
          <p>Стоп-лист</p>
          <div>
            {" "}
            <Switch
              switchState={isBlack}
              handleSwitch={handleSwitchIsBlack}
              text="Не принимать заказы"
            />
          </div>
        </div>
        <div className={s.row}>
          <p>Активность</p>
          <div className={s.rowElement}>
            {" "}
            <Switch
              switchState={isHidden}
              handleSwitch={handleSwitchIsHidden}
              text="Больше не работаем с этим контрагентом"
            />
            <IconWithTooltip
              icon={<IconInfo />}
              tooltipText="Все данные и задолженности по данному контрагенту будут скрыты в сводных таблицах и дашборде"
            />
          </div>
        </div>
        <div className={s.row}>
          <p>Исключение</p>
          <div>
            {" "}
            <Switch
              switchState={isStatisticHidden}
              handleSwitch={handleSwitchStatistic}
              text="Не учитывать в статистике"
            />
          </div>
        </div>
        <div className={s.row}>
          <p>Добавлен</p>
          {hasValue(date_add) ? (
            <p>{`${dayjs(date_add).format("DD.MM.YYYY")} ${formatText(
              person_add?.name,
              person_add?.surname
            )}`}</p>
          ) : (
            <Unknown />
          )}
        </div>
      </div>
    </div>
  );
};

export default General;

const Unknown = () => (
  <div className={s.rowElement}>
    <IconUnknown />
    <span style={{ color: "#71869D" }}>Неизвестно</span>
  </div>
);
