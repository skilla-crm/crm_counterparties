// External
import { useEffect, useState } from "react";
import classNames from "classnames";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Redux
import { useSwitchObjectStatusMutation } from "../../../../redux/services/counterpartyDetailsApiActions";

// Components
import Switch from "components/EmailSender/Switch/Switch";
import EllipsisWithTooltip from "components/General/EllipsisWithTooltip/EllipsisWithTooltip";

// Icons
import { ReactComponent as IconInfo } from "assets/icons/iconInfo.svg";
import { ReactComponent as IconAttach } from "assets/icons/iconAttachGrey.svg";
import { ReactComponent as IconDone } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconCloseBlue } from "assets/icons/iconCloseBlue.svg";

import { ReactComponent as IconUp } from "assets/icons/iconUp.svg";
import { ReactComponent as IconTime } from "assets/icons/iconTime.svg";
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";

// Styles
import s from "./Contracts.module.scss";
import Label from "components/General/Label/Label";
import dayjs from "dayjs";

const mockContract = {
  id: 3084,
  label: "Действует",
  contract_template_name: "Договор поставки №45/П",
  number: "45/П",
  prefix: "П",
  date: "2024-12-10",
  dop_doc_count: 3,
  progress: {
    first: {
      date: "2025-10-15 19:52:29",
      person: {
        name: "Иннокентий",
        surname: "",
        position: "accountant",
      },
    },
    second: {
      date: null,
      person: null,
    },
    third: {
      date: null,
    },
  },
  exchange: null,
};

const Contracts = ({ counterpartyId, data }) => {
  console.log(data);
  return (
    <div className={s.root}>
      <div className={s.infoTitle}></div>
      <div className={s.objects}>
        <div className={classNames(s.gridRow, s.header)}>
          <div>Компания</div>
          <div>Тип</div>
          <div className={s.switchContainer}>Номер</div>
          <div>Дата</div>
          <div>Вложения</div>
          <div>Прогресс</div>
          <div>Обмен оригиналом</div>
          <div></div>
        </div>

        {data.length > 0 ? (
          data.map((contract) => (
            <ContractRow
              key={contract.id}
              contract={contract}
              counterpartyId={counterpartyId}
            />
          ))
        ) : (
          <div className={s.empty}>Пока не добавлен ни один договор</div>
        )}
      </div>
    </div>
  );
};
export default Contracts;

const ContractRow = ({ contract, counterpartyId }) => {
  // console.log(contract);
  // const {
  //   contract_template_name,
  //   date,
  //   dop_doc_count,
  //   exchange,
  //   label,
  //   number,
  //   prefix,
  //   progress,
  // } = contract;
  const {
    contract_template_name,
    prefix,
    date,
    dop_doc_count,
    label,
    number,
    exchange,
    progress,
  } = mockContract;

  console.log(date);
  // const handleSwitchStatus = async () => {
  //   if (!object.id) return;

  //   try {
  //     const res = await switchObjectStatus({
  //       objectId: object.id,
  //       companyId: counterpartyId,
  //     }).unwrap();

  //     if (res?.data?.success) {
  //       setIsActive(!isActive);
  //     } else {
  //       showToast("Не удалось изменить статус оъекта", "error");
  //     }
  //   } catch {
  //     showToast("Произошла ошибка", "error");
  //   }
  // };

  return (
    <div className={classNames(s.gridRow)}>
      <div>
        <EllipsisWithTooltip text={contract_template_name} />
        <Label label={label} />
      </div>
      <div>тип</div>

      <div>{`${prefix} ${number}`}</div>
      <div>{dayjs(date).format("DD.MM.YYYY")}</div>

      <div>
        {Boolean(dop_doc_count) && (
          <div>
            <IconAttach />
            <span>{dop_doc_count}</span>
          </div>
        )}
      </div>
      <div className={s.progress}>
        {" "}
        <Progress lastLines={true} progress={progress} />
      </div>
      <div>{exchange}</div>
      <div></div>
    </div>
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
          firstString={`Создан ${dayjs(progress?.first?.date).format("DD.MM.YY в HH:mm")}`}
          secondString={`${progress?.first?.person?.position === "director" ? "Руководитель" : "Бухгалтер"} ${progress?.first?.person?.name} ${progress?.first?.person?.surname}`}
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
          firstString={`Отправлен на e-mail ${dayjs(progress?.second?.date).format("DD.MM.YY в HH:mm")}`}
          secondString={`${progress?.second?.person?.position === "director" ? "Руководитель" : "Бухгалтер"} ${progress?.second?.person?.name} ${progress?.second?.person?.surname}`}
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
          firstString={`Просмотрен ${dayjs(progress?.third?.date).format("DD.MM.YY в HH:mm")}`}
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
