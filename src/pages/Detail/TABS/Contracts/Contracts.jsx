// External
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

// Hooks
import { useModal } from "hooks/useModal";

// Redux
import { useSwitchObjectStatusMutation } from "../../../../redux/services/counterpartyDetailsApiActions";

// Components
import EllipsisWithTooltip from "components/General/EllipsisWithTooltip/EllipsisWithTooltip";
import UniButton from "components/General/UniButton/UniButton";
import Progress from "./COMPONENTS/Progress";
import Status from "./COMPONENTS/Status";
import Label from "components/General/Label/Label";

// Icons
import { ReactComponent as IconAttach } from "assets/icons/iconAttachGrey.svg";
import { ReactComponent as IconKebab } from "assets/icons/iconKebab.svg";

// Styles
import s from "./Contracts.module.scss";

const Contracts = ({ data }) => {
  return (
    <div className={s.root}>
      {/* <div className={s.infoTitle}></div> */}
      {data?.length > 0 ? (
        <div className={s.objects}>
          <div className={classNames(s.gridRow, s.header)}>
            <div>Компания</div>
            <div>Тип</div>
            <div className={s.switchContainer}>Номер</div>
            <div>Дата</div>
            <div className={s.docCount}>Вложения</div>
            <div>Прогресс</div>
            <div>Обмен оригиналом</div>
            <div></div>
          </div>

          {data.length > 0 &&
            data.map((contract, i) => (
              <ContractRow
                key={contract.id}
                contract={contract}
                lastLines={data?.length - i < 2}
              />
            ))}
        </div>
      ) : (
        <div className={s.empty}>Пока не добавлен ни один договор</div>
      )}
    </div>
  );
};
export default Contracts;

const ContractRow = ({ contract, lastLines }) => {
  const { showModal } = useModal();
  // const [openMenu, setOpenMenu] = useState(false);
  // const optionsRef = useRef(null);

  const {
    id,
    name,
    bank,
    bank_rs_zipped,
    contract_template_name,
    prefix,
    date,
    dop_doc_count,
    label,
    number,
    exchange,
    progress,
    risk,
    is_archived,
  } = contract;
  const navigate = useNavigate();
  const hadleOpenContract = () => {
    navigate(`/details/contract/${id}`);
  };

  // useEffect(() => {
  //     const handleClickOutside = (e) => {
  //         if (optionsRef.current && !optionsRef.current.contains(e.target)) {
  //             setOpenMenu(false);
  //         }
  //     };

  //     document.addEventListener('mousedown', handleClickOutside);

  //     return () => {
  //         document.removeEventListener('mousedown', handleClickOutside);
  //     };
  // }, []);
  // const handleOpenOptions = (e) => {
  //     e.stopPropagation();
  //     setOpenMenu(!openMenu);
  // };
  // const handleMarkSent = () => {
  //     console.log('Отметка об отправке оригиналов');
  //     setOpenMenu(false);
  // };

  // const handleMarkSigned = () => {
  //     console.log('Отметка о подписании');
  //     setOpenMenu(false);
  // };

  // const handleSendEmail = () => {
  //     console.log('Отправить по e-mail');
  //     setOpenMenu(false);
  // };

  // const handleDownloadPDF = () => {
  //     console.log('Скачать PDF');
  //     setOpenMenu(false);
  // };

  // const handleDownloadWord = () => {
  //     console.log('Скачать WORD');
  //     setOpenMenu(false);
  // };

  // const handlePrintPDF = () => {
  //     console.log('Печать PDF');
  //     setOpenMenu(false);
  // };

  // const handlePrintWord = () => {
  //     console.log('Печать WORD');
  //     setOpenMenu(false);
  // };
  // const operations = [
  //     { label: 'Отметка об отправке оригиналов', handler: handleMarkSent },
  //     { label: 'Отметка о подписании', handler: handleMarkSigned },
  //     { label: 'Отправить по e-mail', handler: handleSendEmail },
  //     { label: 'Скачать PDF', handler: handleDownloadPDF },
  //     { label: 'Скачать WORD', handler: handleDownloadWord },
  //     { label: 'Печать PDF', handler: handlePrintPDF },
  //     { label: 'Печать WORD', handler: handlePrintWord },
  // ];

  return (
    <div className={classNames(s.gridRow)} onClick={hadleOpenContract}>
      <div className={s.flexCell}>
        <div className={s.companyInfo}>
          <EllipsisWithTooltip text={name} />
          <EllipsisWithTooltip
            text={`${bank_rs_zipped || ""} ${bank || ""}`}
            textStyle={{
              color: "#71869d",
              // fontSize: '16px',
            }}
          />
          {/* <span className={s.grayText}></span> */}
          <Label label={label} />
        </div>
        {/* КНОПКА РИСК */}
        {/* {Boolean(true) && (
                    <UniButton
                        text="Риск"
                        type="danger"
                        width={44}
                        style={{ height: '24px', padding: '0' }}
                        onClick={(id) => {
                            showModal('REMOVE_RISK_BADGE', { id });
                        }}
                    />
                )} */}
      </div>

      <div className={s.flexCell}>
        <EllipsisWithTooltip text={contract_template_name} />
      </div>
      <div>{`${prefix} ${number}`}</div>
      <div>{date}</div>
      <div>
        {Boolean(dop_doc_count) && (
          <div className={s.docCount}>
            <IconAttach />
            <span className={s.grayText}>{dop_doc_count}</span>
          </div>
        )}
      </div>
      <div className={s.progress}>
        {" "}
        <Progress lastLines={lastLines} progress={progress} />
      </div>
      <div className={s.exchange}>
        {" "}
        {is_archived ? (
          <span style={{ color: "#71869D" }}>Архив</span>
        ) : (
          <Status lastLines={lastLines} exchange={exchange} />
        )}
      </div>
      {/* <div
                className={s.optionsBtn}
                onClick={handleOpenOptions}
                ref={optionsRef}
            >
                <IconKebab />
                {openMenu && (
                    <div className={s.dropDownMenu}>
                        {operations.map((operation) => (
                            <div
                                key={operation.label}
                                className={s.dropDownItem}
                                onClick={operation.handler}
                            >
                                {operation.label}
                            </div>
                        ))}
                    </div>
                )}
            </div> */}
    </div>
  );
};
