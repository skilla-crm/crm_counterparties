import s from "./EmailSender.module.scss";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
//api
import { useSendByEmailContractMutation } from "../../redux/services/contractApiActions";
//icons
import { ReactComponent as IconClose } from "./icons/iconCloseBlack.svg";
import { ReactComponent as IconMailBlack } from "./icons/IconMailBlack.svg";
import { ReactComponent as IconCloseBlue } from "./icons/iconCloseBlue.svg";
import { ReactComponent as IconPlane } from "./icons/iconPlane.svg";
import { ReactComponent as IconCloseS } from "./icons/iconCloseS.svg";
//components
import LoaderButton from "./LoaderButton/LoaderButton";
import Switch from "./Switch/Switch";
import FormatList from "./FormatList/FormatList";
//utils
import { emailValidate } from "./utils/EmailValidate";

//hooks
import useToast from "hooks/useToast";
const formatMap = {
  1: { format: "pdf", sign: 1 },
  2: { format: "pdf", sign: 0 },
  3: { format: "docx", sign: 1 },
  4: { format: "docx", sign: 0 },
};

const EmailSender = ({
  id,
  open,
  setOpen,
  contacts,
  theme,
  text,
  formats,
  docs = [],
  partnerEmail,
  handleSendEmailSuccess,
  detailState,
}) => {
  const [sendByEmailContract, { data, isError, isLoading }] =
    useSendByEmailContractMutation();
  const [emails, setEmails] = useState([]);
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const [filterContacts, setFilterContacts] = useState(contacts || []);
  const [errorText, setErrorText] = useState("");
  const [themeValue, setThemeValue] = useState(theme || "");
  const [textValue, setTextValue] = useState(text || "");
  const [sendDetailing, setSendDetailing] = useState(false);
  const [sendCopy, setSendCopy] = useState(false);
  const [sendInvoice, setSendInoice] = useState(false);
  const [sendAct, setSendAct] = useState(true);
  const [formatDoc, setFormatDoc] = useState(1);
  const [selectedDocs, setSelectedDocs] = useState([]);

  const modalRef = useRef();
  const textAreaRef = useRef();
  const emailsRef = useRef();
  const contactsRef = useRef();
  const { showToast } = useToast();

  useEffect(() => {
    if (docs.length > 0) {
      setSelectedDocs([docs[0].id]);
    }
  }, [docs]);

  useEffect(() => {
    setThemeValue(theme);
  }, [theme]);

  useEffect(() => {
    setTextValue(text);
  }, [text]);

  useEffect(() => {
    const result = contacts
      ?.filter((el) => el.e_mail.trim() !== "")
      .map((item) => {
        return { ...item, e_mail: item.e_mail };
      });

    setEmails(result);
  }, [contacts]);

  useEffect(() => {
    const result = contacts?.filter(
      (item) =>
        !emails?.some((el) => el.e_mail === item.e_mail) &&
        item.e_mail.trim() !== ""
    );
    setFilterContacts(result);
  }, [contacts, emails]);

  useEffect(() => {
    if (emailError) {
      setOpenContacts(false);
      return;
    }
  }, [emailError]);

  const handleToggleDoc = (id) => {
    setSelectedDocs((prev) => {
      if (docs[0].id === id) return prev;
      if (prev.includes(id)) {
        return prev.filter((docId) => docId !== id);
      }
      return [...prev, id];
    });
  };
  const handleSendEmail = async () => {
    const { format, sign } = formatMap[formatDoc] || {
      format: "docx",
      sign: 0,
    };

    const dataForSend = {
      emails: emails.map((el) => el.e_mail),
      // sendCopy: sendCopy ? 1 : 0,
      format,
      sign,
      text: textValue,
      subject: themeValue,
      contract_id: Number(id),
      doc_id: selectedDocs,
    };

    try {
      const res = await sendByEmailContract({ data: dataForSend }).unwrap();
      if (res.success) {
        handleSendEmailSuccess?.();
        setEmails(contacts?.filter((el) => el.e_mail !== ""));
        setThemeValue(theme);
        setTextValue(text);
        setSendDetailing(false);
        showToast("Сообщение отправлено", "success");
        setOpen(false);
      }
    } catch (err) {
      showToast("Ошибка при отправке", "error");
    }
  };

  const handleUniqEmail = (email) => {
    const result = emails?.find((el) => el.email === email);

    if (result) {
      return false;
    } else {
      return true;
    }
  };

  const handleValueEmail = () => {
    const email = textAreaRef.current.textContent;
    setEmailError(false);
    setEmailValue(email.trim());
  };

  const handleWriteEmail = () => {
    const email = textAreaRef.current.textContent.trim();
    const valid = emailValidate(email);
    const uniq = handleUniqEmail(email);

    if (email.length > 0) {
      if (valid && uniq) {
        const existingEmail = contacts.find((el) => el.e_mail === email);
        setEmails((prevState) => [
          ...prevState,
          {
            email: email,
            name: existingEmail ? existingEmail?.name : "",
          },
        ]);
        setEmailValue("");
        textAreaRef.current.textContent = "";
      } else {
        setEmailError(true);

        uniq
          ? setErrorText("Неверный эл.адрес")
          : setErrorText("Email уже выбран для отправки");
      }
      return;
    }
  };

  const handleActiveEmail = (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      textAreaRef.current.focus();
      setEmailValue(emailValue.trim());
      handleWriteEmail();
    }
  };

  const handleFocusInput = () => {
    textAreaRef.current.focus();
    !emailError && setOpenContacts(true);
  };

  const handleThemeValue = (e) => {
    const value = e.currentTarget.value;
    setThemeValue(value);
  };

  const handleTextValue = (e) => {
    const value = e.currentTarget.value;
    setTextValue(value);
  };

  const handleSendDetailing = () => {
    sendDetailing ? setSendDetailing(false) : setSendDetailing(true);
  };

  const handleSendCopy = () => {
    sendCopy ? setSendCopy(false) : setSendCopy(true);
  };

  const handleSendInvoice = () => {
    sendInvoice ? setSendInoice(false) : setSendInoice(true);
  };

  const handleSendAct = () => {
    sendAct ? setSendAct(false) : setSendAct(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
      return;
    }
  };

  const handleAddEmail = (el) => {
    const uniq = handleUniqEmail(el?.e_mail);
    uniq &&
      setEmails((prevState) => [
        ...prevState,
        { e_mail: el?.e_mail, name: `${el.name} ${el.surname}` },
      ]);
  };

  const handleCloseContacts = () => {
    setOpenContacts(false);
  };

  const handleCloseContact = (e) => {
    e.stopPropagation();
    if (
      emailsRef.current &&
      !emailsRef.current.contains(e.target) &&
      !contactsRef.current.contains(e.target)
    ) {
      handleCloseContacts();
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);
    return () => document.removeEventListener("mousedown", handleCloseModal);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleCloseContact);
    return () => document.removeEventListener("click", handleCloseContact);
  }, []);

  return (
    <div className={classNames(s.window, open && s.window_open)}>
      <div ref={modalRef} className={classNames(s.modal, open && s.modal_open)}>
        <div className={s.header}>
          <div className={s.title}>
            <IconMailBlack />
            <p>Отправка по e-mail</p>
          </div>
          <div onClick={handleClose} className={s.close}>
            <IconClose />
          </div>
        </div>

        <div className={s.container}>
          <div className={s.block}>
            <span>Кому</span>
            <div
              ref={emailsRef}
              onClick={handleFocusInput}
              className={s.emails}
            >
              {emails?.map((el, i) => {
                return (
                  <Email
                    key={el.email}
                    el={el}
                    emails={emails}
                    setEmails={setEmails}
                  />
                );
              })}
              <div
                contentEditable="true"
                onBlur={handleWriteEmail}
                onKeyUp={handleActiveEmail}
                onKeyDown={handleValueEmail}
                ref={textAreaRef}
                rows={1}
                className={classNames(
                  s.emailArea,
                  emailError && s.emailArea_error
                )}
              ></div>
            </div>
            <div ref={contactsRef} className={s.container_contacts}>
              <ul
                className={classNames(
                  s.contacts,
                  openContacts && s.contacts_open
                )}
              >
                {filterContacts?.map((el) => {
                  return (
                    <li onClick={() => handleAddEmail(el)} key={el.id}>
                      <p>{el.e_mail}</p>
                      <span>
                        {el.name} {el.surname}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <span className={classNames(s.text, emailError && s.text_red)}>
              {errorText}
            </span>
          </div>

          <div className={s.block}>
            <span>Тема</span>
            <input
              className={s.input}
              type="text"
              value={themeValue || ""}
              onChange={handleThemeValue}
            ></input>
          </div>

          <div className={s.block}>
            <span>Текст письма</span>
            <textarea
              value={textValue || ""}
              onChange={handleTextValue}
              type="text"
              rows={8}
              maxLength={1000}
              className={s.textarea}
            ></textarea>
            <div className={s.count}>
              <p>
                {textValue?.length} / {1000}
              </p>
            </div>
          </div>

          <div className={s.block}>
            <span>Прикрепленные документы</span>
            <div className={s.switches}>
              {docs?.map((el, i) => (
                <Switch
                  text={el.name}
                  disabled={i === 0}
                  key={el.id}
                  switchState={selectedDocs.includes(el.id)}
                  handleSwitch={() => handleToggleDoc(el.id)}
                />
              ))}
            </div>
          </div>

          <div className={s.block}>
            <span>Формат</span>
            <FormatList
              formats={formats}
              format={formatDoc}
              setFormat={setFormatDoc}
            />
          </div>

          <Switch
            text={`Копию письма отправить на почту компании ${partnerEmail}`}
            switchState={sendCopy}
            handleSwitch={handleSendCopy}
            disabled={false}
          />
        </div>

        <div className={s.buttons}>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className={s.cancel}
          >
            Отмена
            <IconCloseBlue />
          </button>

          <button
            onClick={handleSendEmail}
            disabled={isLoading || emails?.length === 0}
            className={s.button}
          >
            Отправить
            <div className={classNames(s.icon, isLoading && s.icon_load)}>
              <IconPlane />

              <div className={classNames(s.loader, isLoading && s.loader_vis)}>
                <LoaderButton color={"#fff"} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const Email = ({ el, emails, setEmails }) => {
  const [anim, setAnim] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setAnim(true);
  }, []);

  const handleDeleteEmail = (e) => {
    const id = e.currentTarget.id;
    const result = emails.filter((el) => el.e_mail !== id);
    /*    setHidden(true); */
    setTimeout(() => {
      setEmails(result);
    }, 200);
  };

  return (
    <div
      id={el.e_mail}
      className={classNames(
        s.item,
        anim && s.item_anim,
        hidden && s.item_hidden
      )}
    >
      <span>{el.e_mail}</span>
      {el.name && <p>{el.name}</p>}
      <IconCloseS id={el.e_mail} onClick={handleDeleteEmail} />
    </div>
  );
};

export default EmailSender;
