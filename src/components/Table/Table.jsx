import s from "./Table.module.scss";
import classNames from "classnames";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ru";
//iconsiconTime
import { ReactComponent as IconDone } from "../../assets/icons/iconDone.svg";
import { ReactComponent as IconCloseBlue } from "../../assets/icons/iconCloseBlue.svg";
import { ReactComponent as IconInfo } from "../../assets/icons/iconInfo.svg";
import { ReactComponent as IconUp } from "../../assets/icons/iconUp.svg";
import { ReactComponent as IconTime } from "../../assets/icons/iconTime.svg";
import { ReactComponent as IconDoneWhite } from "../../assets/icons/iconDoneWhite.svg";
//utils
import { addSpaceNumber } from "../../utils/addSpaceNumber";

const Table = ({ data }) => {
  const [openTooltip, setOpenTooltip] = useState("");

  const handleOpenTooltip = (e) => {
    const id = e.currentTarget.id;
    setOpenTooltip(id);
  };

  const handleCloseTooltip = () => {
    setOpenTooltip("");
  };

  return (
    <table className={s.root}>
      <thead>
        <tr>
          <th className={s.date}>Дата</th>
          <th className={s.number}>Номер</th>
          <th className={s.customer}>Контрагент </th>
          <th className={s.inn}>ИНН</th>
          <th className={s.inn}>КПП</th>
          <th className={s.recipient}>Компания</th>
          <th className={s.summ}>Сумма, ₽</th>
          <th className={s.progress}>Прогресс</th>
          <th className={s.progress}>Обмен оригиналом</th>
          <th className={s.button}></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((el, i) => {
          return <Row lastLines={data?.length - i < 2} key={el.id} bill={el} />;
        })}
      </tbody>
    </table>
  );
};

const Row = ({ bill, lastLines }) => {
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/detail/${bill?.id}`);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <tr
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={s.row}
      onClick={handleNavigate}
    >
      <div className={s.border}></div>
      <td className={s.date}>
        <p>{dayjs(bill?.date).format("DD.MM.YY")}</p>
      </td>
      <td className={s.number}>
        <p>{bill?.number}</p>
      </td>
      <td className={s.customer}>
        <p>{bill?.company?.name}</p>
        {bill?.company?.lable && (
          <div className={s.lable}>
            <span>{bill?.company?.lable}</span>
          </div>
        )}
      </td>

      <td className={s.inn}>{bill?.company?.inn}</td>
      <td className={s.inn}>{bill?.company?.kpp}</td>

      <td className={s.recipient}>
        <p>{bill?.partnership?.partnership_name}</p>
      </td>
      <td className={s.summ}>
        <p>
          {addSpaceNumber(bill?.sum?.split(".").shift())}
          <span>.{bill?.sum?.split(".").pop()}</span>
        </p>
      </td>
      <td className={s.progress}>
        <Progress lastLines={lastLines} progress={bill?.progress} />
      </td>

      <td className={s.progress}>
        <Status lastLines={lastLines} exchange={bill?.exchange} />
      </td>
      <td className={classNames(s.button, focus && s.button_vis)}>
        {/* <IconCloseBlue/> */}
      </td>
    </tr>
  );
};

const Tooltip = ({ open, id }) => {
  return (
    <div
      className={classNames(
        s.tooltip,
        open && s.tooltip_open,
        id === "pay" && s.tooltip_pay
      )}
    >
      <IconUp />
      {id === "order" && <p>Показывает наличие привязки УПД к заказу</p>}
      {id === "pay" && <p>Старый функционал будет убран 1 июля 2025</p>}
    </div>
  );
};

const Progress = ({ lastLines, progress }) => {
  const [openTooltip, setOpenTooltip] = useState("");

  const handleOpenTooltip = (num) => {
    setOpenTooltip(num);
  };

  const handleCloseTooltip = () => {
    setOpenTooltip("");
  };

  return (
    <div className={s.line}>
      <div
        id={1}
        className={classNames(s.bar, progress?.first?.date && s.bar_active)}
        onMouseEnter={() => handleOpenTooltip(1)}
        onMouseLeave={handleCloseTooltip}
      >
        <TooltipProgress
          id={1}
          lastLines={lastLines}
          open={openTooltip === 1}
          firstString={`Создан ${dayjs(progress?.first?.date).format(
            "DD.MM.YY в HH:mm"
          )}`}
          secondString={`${
            progress?.first?.person?.position === "director"
              ? "Руководитель"
              : "Бухгалтер"
          } ${progress?.first?.person?.name} ${
            progress?.first?.person?.surname
          }`}
        />
      </div>
      <div
        id={2}
        className={classNames(s.bar, progress?.second?.date && s.bar_active)}
        onMouseEnter={() => handleOpenTooltip(2)}
        onMouseLeave={handleCloseTooltip}
      >
        <TooltipProgress
          id={2}
          lastLines={lastLines}
          open={openTooltip === 2}
          firstString={`Отправлен на e-mail ${dayjs(
            progress?.second?.date
          ).format("DD.MM.YY в HH:mm")}`}
          secondString={`${
            progress?.second?.person?.position === "director"
              ? "Руководитель"
              : "Бухгалтер"
          } ${progress?.second?.person?.name} ${
            progress?.second?.person?.surname
          }`}
        />
      </div>
      <div
        id={3}
        className={classNames(s.bar, progress?.third?.date && s.bar_active)}
        onMouseEnter={() => handleOpenTooltip(3)}
        onMouseLeave={handleCloseTooltip}
      >
        <TooltipProgress
          id={3}
          lastLines={lastLines}
          open={openTooltip === 3}
          firstString={`Просмотрен ${dayjs(progress?.third?.date).format(
            "DD.MM.YY в HH:mm"
          )}`}
          secondString={""}
        />
      </div>
    </div>
  );
};

const TooltipProgress = ({
  isStatus,
  lastLines,
  open,
  firstString,
  secondString,
}) => {
  return (
    <div
      className={classNames(
        s.tooltip,
        s.tooltip_progress,
        isStatus && s.tooltip_status,
        open && s.tooltip_open,
        lastLines && s.tooltip_last
      )}
    >
      <IconUp />
      {firstString !== "" && <p>{firstString}</p>}
      {secondString !== "" && <p>{secondString}</p>}
    </div>
  );
};

const Status = ({ lastLines, exchange }) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [firstString, setFirstString] = useState("");
  const [secondString, setSecondString] = useState("");

  const handleOpenTooltip = () => {
    (exchange?.send === 1 || exchange?.sign === 1) && setOpenTooltip(true);
    const position =
      exchange?.person?.position === "director"
        ? "Руководитель"
        : exchange?.person?.position === "accountant"
        ? "Бухгалтер"
        : "Менеджер";
    if (exchange?.send === 1 && exchange?.sign !== 1) {
      setFirstString(
        `Отправлен ${dayjs(exchange?.send_date).format("DD.MM.YY")}`
      );
      exchange?.person?.id &&
        setSecondString(
          `${position} ${exchange?.person?.name} ${exchange?.person?.surname}`
        );
      return;
    }

    if (exchange?.send === 1 && exchange?.sign === 1) {
      setFirstString(
        `Подписан ${dayjs(exchange?.sign_date).format("DD.MM.YY")}`
      );
      exchange?.person?.id &&
        setSecondString(
          `${position} ${exchange?.person?.name} ${exchange?.person?.surname}`
        );
      return;
    }
  };

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };
  return (
    <div
      onMouseEnter={handleOpenTooltip}
      onMouseLeave={handleCloseTooltip}
      className={classNames(
        s.status,
        exchange?.send === 1 && exchange?.sign !== 1 && s.status_1,
        exchange?.send === 1 && exchange?.sign === 1 && s.status_2
      )}
    >
      {exchange?.send !== 1 && exchange?.sign !== 1 && <p>Не отправлен</p>}
      {exchange?.send === 1 &&
        exchange?.sign !== 1 &&
        exchange?.send_type !== "edo" && (
          <p>
            <IconTime /> На бумаге{" "}
          </p>
        )}
      {exchange?.send === 1 &&
        exchange?.sign !== 1 &&
        exchange?.send_type === "edo" && (
          <p>
            <IconTime /> ЭДО
          </p>
        )}
      {exchange?.send === 1 &&
        exchange?.sign === 1 &&
        exchange?.sign_type !== "edo" && (
          <p>
            <IconDoneWhite /> На бумаге{" "}
          </p>
        )}
      {exchange?.send === 1 &&
        exchange?.sign === 1 &&
        exchange?.sign_type === "edo" && (
          <p>
            <IconDoneWhite /> ЭДО
          </p>
        )}
      <TooltipProgress
        lastLines={lastLines}
        isStatus={true}
        open={openTooltip}
        firstString={firstString}
        secondString={secondString}
      />
    </div>
  );
};

export default Table;
