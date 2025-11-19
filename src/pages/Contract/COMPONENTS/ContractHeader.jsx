// React
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

// Libs
import dayjs from "dayjs";

// Hooks
import useToast from "hooks/useToast";

//state
import { setActiveTab } from "../../../redux/slices/detailTabSlice";
// API
import {
  useDeleteContractMutation,
  useDownloadContractMutation,
} from "../../../redux/services/contractApiActions";

// Components
import ButtonOptions from "components/General/ButtonOptions/ButtonOptions";
import UniButton from "components/General/UniButton/UniButton";
import EmailSender from "components/EmailSender/EmailSender";

// Icons
import { ReactComponent as IconDelete } from "assets/icons/iconDeleteRed.svg";
import { ReactComponent as IconDoc } from "assets/icons/iconDoc.svg";
import { ReactComponent as IconDocDoc } from "assets/icons/iconDocDoc.svg";
import { ReactComponent as IconDocPdf } from "assets/icons/iconDocPdf.svg";
// import { ReactComponent as IconMail } from 'assets/icons/iconMail.svg';
import { ReactComponent as IconDownload } from "assets/icons/iconDownload.svg";
import { ReactComponent as IconEdit } from "assets/icons/iconEdit.svg";
import { ReactComponent as IconMail } from "assets/icons/iconMail.svg";
import { ReactComponent as IconPrint } from "assets/icons/iconPrint.svg";
import { ReactComponent as IconGoToBack } from "assets/icons/IconGoToBack.svg";
import { ReactComponent as IconDone } from "assets/icons/iconDone.svg";

// Styles
import s from "./ContractHeader.module.scss";

const ContractHeader = ({
  settings,
  handleSave,
  handleCreate,
  isLoading,
  isEditMode = false,
  isCreateMode = false,
  setIsEditMode,
  contractId,
  contract = {},
  contacts = [],
  refetch,
  isDeletableContract,
}) => {
  const parameters = [];
  const [isPrinting, setIsPrinting] = useState(false);

  const params1 = {
    sign: 1,
    format: "pdf",
  };
  const params2 = {
    sign: 0,
    format: "pdf",
  };
  const params3 = {
    sign: 0,
    format: "docx",
  };

  const downloadOptions = [
    {
      id: 1,
      name: "PDF с печатью",
      icon: IconDocPdf,
      default: true,
      handler: () => handleDownload(params1),
    },

    {
      id: 2,
      name: "PDF без печати",
      icon: IconDocPdf,
      default: false,
      handler: () => handleDownload(params2),
    },

    {
      id: 3,
      name: "WORD без печати",
      icon: IconDocDoc,
      default: false,
      handler: () => handleDownload(params3),
    },
  ];
  const printOptions = [
    {
      id: 1,
      name: "С печатью",
      icon: IconDoc,
      default: true,
      handler: () => handlePrint(params1),
    },

    {
      id: 2,
      name: "Без печати",
      icon: IconDoc,
      default: false,
      handler: () => handlePrint(params2),
    },
  ];
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isOpenSender, setIsOpenSender] = useState(false);

  const [deleteContract, { isLoading: isLoadingDelete }] =
    useDeleteContractMutation();

  const [downloadContract, { isLoading: isLoadingDownload }] =
    useDownloadContractMutation();
  const handleDelete = async () => {
    try {
      const res = await deleteContract({ contractId }).unwrap();

      if (res.success) {
        showToast("Договор удален", "success");
        navigate(-1);
      } else {
        showToast("Не удалось удалить договор", "error");
      }
    } catch (err) {
      showToast("Ошибка при удалении договора", "error");
    }
  };
  // const handleSendEmailSuccess = () => {
  //     handleCloseNotification();
  //     clearTimeout(timerId);
  //     setTimeout(() => {
  //         setTimerId(setTimeout(() => handleCloseNotification(), 2500));
  //         setNotification({
  //             state: true,
  //             type: 'email',
  //             text: 'Письмо отправлено',
  //         });
  //     }, 200);
  // };

  const handleDownload = async (params) => {
    try {
      const blob = await downloadContract({
        contractId,
        data: { ...params },
      }).unwrap();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Договор №${contract.number} от ${dayjs(contract.date).format("DD.MM.YYYY")}.${params.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      showToast("Ошибка при скачивании документа", "error");
    }
  };

  const handlePrint = async (params) => {
    setIsPrinting(true);
    let url = null;

    try {
      const blob = await downloadContract({
        contractId,
        data: { ...params },
      }).unwrap();

      url = URL.createObjectURL(blob);
      const win = window.open(url);

      if (win) {
        win.onload = () => {
          win.focus();
          win.print();
        };
      } else {
        showToast("Разрешите всплывающие окна", "error");
      }
    } catch (e) {
      showToast("Ошибка при подготовке печати", "error");
    } finally {
      setIsPrinting(false);
      if (url) URL.revokeObjectURL(url);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={s.header}>
      <h2>
        {!isCreateMode
          ? `Договор №${contract.number} от ${dayjs(contract.date).format(
              "DD.MM.YYYY"
            )}`
          : `Договор №${settings?.prefix || ""}${settings?.contract_num || ""} от ${dayjs(
              new Date()
            ).format("DD.MM.YYYY")}`}
      </h2>

      {/* КНОПКИ В РЕЖИМE ПРОСМОТРА  */}
      {!isEditMode && !isCreateMode && (
        <div className={s.headerButtons}>
          {isDeletableContract && (
            <UniButton
              type="danger"
              icon={IconDelete}
              onClick={handleDelete}
              width={40}
            />
          )}
          <UniButton
            text="Редактировать"
            type="outline"
            icon={IconEdit}
            onClick={() => setIsEditMode(true)}
          />
          <ButtonOptions
            handler={() => handleDownload(params1)}
            buttonText={"Скачать"}
            Icon={IconDownload}
            isLoading={isLoadingDownload && !isPrinting}
            options={downloadOptions}
          />

          <ButtonOptions
            handler={() => handlePrint(params1)}
            buttonText={"Печать"}
            Icon={IconPrint}
            isLoading={isLoadingDownload && isPrinting}
            options={printOptions}
          />

          <UniButton
            text="Отправить по e-mail"
            icon={IconMail}
            width={200}
            onClick={() => setIsOpenSender(true)}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* КНОПКИ В РЕЖИМЕ РЕДАКТИРОВАНИЯ  */}
      {isEditMode && !isCreateMode && (
        <div className={s.headerButtons}>
          <UniButton
            text="Отменить"
            type="outline"
            icon={IconGoToBack}
            onClick={() => {
              refetch();

              setIsEditMode(false);
            }}
          />

          <UniButton
            text="Cохранить"
            icon={IconDone}
            width={200}
            onClick={handleSave}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* КНОПКИ В РЕЖИМЕ СОЗДАНИЯ  */}
      {isCreateMode && (
        <div className={s.headerButtons}>
          <UniButton
            text="Отменить"
            type="outline"
            icon={IconGoToBack}
            onClick={handleGoBack}
          />

          <UniButton
            text="Cохранить"
            icon={IconDone}
            width={200}
            onClick={handleCreate}
            isLoading={isLoading}
          />
        </div>
      )}
      <EmailSender
        id={contractId}
        open={isOpenSender}
        setOpen={setIsOpenSender}
        contacts={contacts}
        docs={[
          {
            id: contractId,
            name: `Договор №${contract.number} от ${dayjs(contract.date).format("DD.MM.YYYY")}`,
          },
          ...(Array.isArray(contract?.docs) ? contract.docs : []),
        ]}
        theme={`Договор №${contract.number} от ${dayjs(contract.date).format("DD.MM.YYYY")}`}
        text={settings?.contract_mail_template?.value || ""}
        formats={[
          { id: 1, name: "PDF с печатью" },
          { id: 2, name: "Word с печатью" },
        ]}
        partnerEmail={settings?.partnership_email}
        handleSendEmailSuccess={() =>
          showToast("Сообщение отправлено", "success")
        }
        detailState={true}
      />
    </div>
  );
};

export default ContractHeader;
