import { heIL } from "@mui/x-date-pickers/locales";
import s from "./DropZone.module.scss";
import classNames from "classnames";
import { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
//icons
import { ReactComponent as FolderIcon } from "./assets/folderIcon.svg";
import { ReactComponent as IconDelete } from "./assets/iconDelete.svg";
import { ReactComponent as IconDownload } from "./assets/iconDownload.svg";
import { ReactComponent as IconReplace } from "./assets/iconReplace.svg";
import { ReactComponent as IconDelete2 } from "./assets/iconDelete2.svg";

const accepts = [
  {
    type: "image",
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  },

  {
    type: "png",
    accept: {
      "image/png": [".png"],
    },
  },

  {
    type: "doc",
    accept: {
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/pdf": [".pdf"],
    },
  },
];

const DropZone = ({
  width,
  height,
  multiple,
  maxSize,
  type,
  file,
  setFile,
  disabled,
  fileName,
  onDelete,
}) => {
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageHover, setImageHover] = useState(false);

  useEffect(() => {
    if ((type === "image" || type === "png") && file) {
      typeof file === "string"
        ? setImage(file)
        : setImage(URL.createObjectURL(file));
    }
  }, [type, file]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);
      console.log(file);
      setFile(file);
    });
  }, []);
  // const onDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     if (!file) return;

  //     if (file.type !== "image/png") {
  //       setError("Неверный формат файла: требуется PNG");
  //       return;
  //     }

  //     if (file.size > 300 * 1024) {
  //       setError("Файл слишком большой: до 300 КБ");
  //       return;
  //     }

  //     const img = new Image();
  //     img.onload = () => {
  //       if (img.width > 317 || img.height > 80) {
  //         setError("Неверный размер изображения: требуется 317x80 пикселей");
  //         return;
  //       }
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const binaryStr = reader.result;
  //       };
  //       reader.readAsArrayBuffer(file);
  //       console.log("dropzone", file);
  //       setError(false);
  //       setFile(file);
  //     };
  //     img.onerror = () => setError("Не удалось прочитать изображение");
  //     img.src = URL.createObjectURL(file);
  //   },
  //   [setFile]
  // );

  const onDropRejected = () => {
    setError(true);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      onDropRejected,
      multiple: multiple,
      maxSize: maxSize * 1024 * 1024,
      accept: accepts.find((el) => el.type === type).accept,
      disabled,
    });

  useEffect(() => {
    if (isDragActive) {
      setError(false);
    }
  }, [isDragActive]);

  const handleStopPropagination = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDownloadFile = () => {
    const url = typeof file === "string" ? file : URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName ? fileName : file.name}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = () => {
    setFile(null);
    if (onDelete) onDelete();
  };

  const handleReplace = () => {
    document.getElementById("inputfile").click();
  };

  const handleImageHover = () => {
    setImageHover(true);
  };

  const handleImageBlur = () => {
    setImageHover(false);
  };

  return (
    <div style={{ width: width ? width : "" }} className={s.root}>
      <div
        {...getRootProps()}
        className={classNames(s.overlay, isDragActive && s.overlay_drag)}
      >
        <div
          style={{ height: height ? height : "" }}
          className={classNames(
            s.field,
            isDragActive && s.field_hidden,
            type === "doc" && file && s.field_doc
          )}
        >
          <input id={"inputfile"} className={s.input} {...getInputProps()} />
          <p className={s.text}>
            Перетащи или{" "}
            <span>загрузи {type === "doc" ? "документ" : "изображение"}</span>
            <br />
            {/* {type === "image" && (
              <span>Изображение должно быть квадратным (1:1)</span>
            )} */}
          </p>
        </div>

        <div className={classNames(s.drag, isDragActive && s.drag_vis)}>
          {!error && (
            <p className={classNames(s.text, s.text_second)}>
              Отпусти файл здесь
            </p>
          )}
        </div>

        <div
          onClick={handleStopPropagination}
          className={classNames(s.doc, type === "doc" && file && s.doc_vis)}
        >
          <div className={s.block}>
            <FolderIcon />
            <p>{fileName ? fileName : file?.name}</p>
          </div>

          {file && (
            <div className={s.buttons}>
              <button
                className={classNames(s.button, s.button_download)}
                onClick={handleDownloadFile}
              >
                <IconDownload /> <p>скачать</p>
              </button>
              {!disabled && (
                <button
                  className={classNames(s.button, s.button_delete)}
                  onClick={handleDelete}
                >
                  <IconDelete /> <p>удалить</p>
                </button>
              )}
            </div>
          )}
        </div>

        <div
          onMouseEnter={handleImageHover}
          onMouseLeave={handleImageBlur}
          onClick={handleStopPropagination}
          className={classNames(
            s.image,
            (type === "image" || type === "png") && file && s.image_vis
          )}
        >
          <div
            className={classNames(s.overlay_image, imageHover && s.overlay_vis)}
          >
            <div className={s.buttons}>
              <IconReplace
                className={s.button_overlay}
                onClick={handleReplace}
              />
              {!disabled && (
                <IconDelete2
                  className={s.button_overlay}
                  onClick={handleDelete}
                />
              )}
            </div>
          </div>
          {<img src={image}></img>}
        </div>
      </div>

      <div className={classNames(s.error, error && s.error_active)}>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default DropZone;
