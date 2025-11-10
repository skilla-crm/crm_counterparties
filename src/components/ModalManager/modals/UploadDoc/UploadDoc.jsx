import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//libs
import { useDropzone } from "react-dropzone";
import classNames from "classnames";

//redux
import { useAddAttachmentsMutation } from "../../../../redux/services/contractApiActions";

//hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

//components

import Modal from "components/General/Modal/Modal";
import UniButton from "components/General/UniButton/UniButton";

//icons
import { ReactComponent as FolderIcon } from "assets/icons/folderIcon.svg";
import { ReactComponent as IconCloseBlack } from "assets/icons/iconCloseBlack.svg";
import { ReactComponent as IconPlus } from "assets/icons/iconPlusBlack.svg";
import { ReactComponent as IconCloseRound } from "assets/icons/iconCloseRound.svg";
import { ReactComponent as IconDelete } from "assets/icons/iconDelete.svg";
import { ReactComponent as IconDoneGrey } from "assets/icons/iconDoneGrey.svg";
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconDoneDouble } from "assets/icons/iconDoneDouble.svg";
import { ReactComponent as IconUploadBlack } from "assets/icons/iconUploadBlack.svg";

//styles
import s from "./UploadDoc.module.scss";
import Dropdown from "components/General/Dropdown/Dropdown";

const UploadDoc = () => {
  const isLoading = false;
  const [addAttachments, { isLoading: isLoadingAddAttachments }] =
    useAddAttachmentsMutation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [type, setType] = useState();
  const [file, setFile] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [uploadError, setUploadError] = useState("");

  const [success, setSucces] = useState("");

  const { hideModal, modalProps } = useModal();
  const { contractId, docTypes } = modalProps;

  useEffect(() => {
    return () => {
      setFile(null);
      setSucces("");
      setValidationError("");
      setUploadError("");
    };
  }, []);

  useEffect(() => {
    if (docTypes?.length > 0 && !type) {
      setType(docTypes[0].id);
    }
  }, [docTypes, type]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadError("");
      setSucces("");
      setValidationError("");
    }
  }, []);

  const onDropRejected = useCallback(() => {
    setValidationError("Размер файла не должен превышать 20 МБ");
    setFile(null);
  }, []);

  const handleDelete = () => {
    setFile(null);
    setValidationError("");
    setUploadError("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    maxSize: 20 * 1024 * 1024,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
  });

  const controllerRef = useRef(null);

  const handleSubmit = async () => {
    if (!file) {
      setValidationError("Файл не выбран");
      return;
    }

    const formData = new FormData();

    formData.append("name", file.name);
    formData.append("type_id", 1);
    formData.append("contract_id", contractId);
    formData.append("date_add", new Date().toISOString().split("T")[0]);
    formData.append("file", file);

    controllerRef.current = new AbortController();

    try {
      await addAttachments({
        body: formData,
        signal: controllerRef.current.signal,
      }).unwrap();

      showToast("Документ успешно загружен", "success");
      hideModal();
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      showToast("Произошла ошибка при загрузке файла", "error");
    } finally {
      controllerRef.current = null;
    }
  };

  const handleCancelUpload = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setValidationError("");
    setUploadError("");
    setFile(null);
    setSucces("");
    hideModal();
  };

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.modal_header}>
          <div className={s.title}>
            <IconPlus />
            <h3>Новый документ</h3>
          </div>
          <button className={s.close} onClick={hideModal}>
            <IconCloseBlack />
          </button>
        </div>

        {docTypes?.length > 0 && (
          <Dropdown
            options={docTypes}
            value={type}
            onChange={(opt) => setType(opt)}
            renderOption={(opt) => opt.name}
            placeholder="Выберите тип документа"
          />
        )}
        <div className={classNames(s.file_info, file && s.file_info_vis)}>
          <div className={uploadError ? s.postErrorContainer : s.file}>
            {!uploadError ? <FolderIcon /> : <IconCloseRound />}

            <div className={s.textWrapper}>
              <div className={s.fileName}>{file?.name}</div>
              {(uploadError || success) && (
                <div className={classNames(s.postMsg, success && s.success)}>
                  {uploadError || success}
                </div>
              )}
            </div>
          </div>

          {!success && (
            <IconDelete className={s.delete} onClick={handleDelete} />
          )}
        </div>
        <div
          {...getRootProps({
            className: classNames(
              s.dropzone,
              (file || uploadError) && s.dropzone_vis
            ),
          })}
        >
          <input {...getInputProps()} />
          <div className={s.uploadLabel}>
            {isDragActive ? (
              <span>Отпустите здесь файл</span>
            ) : (
              <>
                Перетащи или <span className={s.dropTitle}>загрузи файл</span>
              </>
            )}
          </div>
          <div className={s.sizeInfo}>Файлы до 20 Мбайт</div>
        </div>

        {validationError && <div className={s.error}>{validationError}</div>}
        <div className={s.buttonsWrapper}>
          <UniButton
            disabled={!file}
            iconPosition="right"
            icon={IconDoneWhite}
            text={"Добавить"}
            isLoading={isLoadingAddAttachments}
            type="primary"
            onClick={handleSubmit}
            className={classNames(
              s.submit,
              (!file || isLoadingAddAttachments) && s.disabledLike
            )}
            width={300}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UploadDoc;
