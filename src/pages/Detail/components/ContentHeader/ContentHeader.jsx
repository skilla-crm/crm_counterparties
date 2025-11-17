// External
import dayjs from "dayjs";
import classNames from "classnames";

//react
import { useEffect, useState } from "react";

//Query
import { useUploadLogoMutation } from "../../../../redux/services/counterpartyDetailsApiActions";

// Hooks
import { useModal } from "hooks/useModal";
import useToast from "hooks/useToast";

// Components
import UniButton from "components/General/UniButton/UniButton";
import LogoUpload from "components/General/LogoUpload/LogoUpload";
import Label from "pages/Detail/ui/Label/Label";

// Icons
import { ReactComponent as CircleCheck } from "assets/icons/circleCheck.svg";
import { ReactComponent as IconAlert } from "assets/icons/iconAlertOrange.svg";
import { ReactComponent as IconEdit } from "assets/icons/iconEdit.svg";

// Styles
import s from "./ContentHeader.module.scss";

const isValidValue = (val) => val && val.trim() !== "" && val !== "0";

const ContentHeader = ({ data, companyId }) => {
  const { showModal } = useModal();
  const { showToast } = useToast();
  const {
    kpp,
    inn,
    ogrn,
    okved_name,
    name,
    label,
    verified_date,
    verified_id,
    logo,
  } = data || {};

  const [counterparyLogo, setCounterparyLogo] = useState(null);

  const [uploadLogo, { isLoading }] = useUploadLogoMutation();

  useEffect(() => {
    if (logo) {
      setCounterparyLogo(logo);
    }
  }, [logo]);

  const handleUploadLogo = async (val) => {
    setCounterparyLogo(val);
    await uploadLogo({
      companyId: companyId,
      logo: { logo: val },
    })
      .unwrap()
      .then((res) => {
        if (res.success && val !== null)
          showToast("Логотип загружен", "success");
      })
      .catch((err) => {
        showToast("Произошла ошибка", "error");
        setCounterparyLogo(logo);
      });
  };

  const handleOpenMistakeReport = () => {
    showModal("MISTAKE_REPORT", {
      companyId: companyId,
    });
  };
  return (
    <div className={classNames(s.contentHeader)}>
      {/* <div className={classNames(s.logo)}>
                {Boolean(verified_id) ? (
                    counterparyLogo ? (
                        <img
                            src={counterparyLogo}
                            alt="Логотип контрагента"
                            width={200}
                            height={49}
                            style={{
                                objectFit: 'contain',
                                borderRadius: '8px',
                            }}
                        />
                    ) : (
                        <div className={s.noLogo}>
                            <span>Логотип отсутствует</span>
                            <Field info="Логотип у проверенного контрагента загружает администратор" />
                        </div>
                    )
                ) : (
                    <LogoUpload
                        disabled={isLoading}
                        buttonText="Загрузить логотип"
                        buttonWidth={176}
                        width={200}
                        height={49}
                        logo={counterparyLogo}
                        setLogo={handleUploadLogo}
                    />
                )}
            </div> */}

      {counterparyLogo && (
        <div className={s.logo}>
          <img src={counterparyLogo} alt="logo" className={s.logo} />
        </div>
      )}

      <div className={s.section}>
        <div className={s.flexRow}>
          <Label label={label} />
          {/* КНОПКА РИСК */}
          {/* <UniButton
            text="Риск"
            type="danger"
            width={44}
            style={{ height: "24px" }}
            onClick={(companyId) => {
              showModal("REMOVE_RISK_BADGE", {
                companyId: companyId,
              });
            }}
          /> */}
        </div>
        <h3>{name}</h3>
        <div className={s.flexRow}>
          {isValidValue(inn) && <p>{`ИНН ${inn}`}</p>}
          {isValidValue(kpp) && <p>{`КПП ${kpp}`}</p>}
          {isValidValue(ogrn) && <p>{`ОГРН ${ogrn}`}</p>}
        </div>

        <div className={s.description}>{okved_name}</div>
        {Boolean(verified_id) && (
          <div className={s.flexRow}>
            <div className={s.verified}>
              <CircleCheck />
              <div>{`Проверен платформой ${dayjs(verified_date).format("DD.MM.YYYY")}`}</div>
            </div>
            {/* <button className={s.reportBtn} onClick={handleOpenMistakeReport}>
              <IconEdit />
              <span>Сообщить о неточности</span>
            </button> */}
          </div>
        )}
        {!Boolean(verified_id) && (
          <div className={s.flexRow}>
            <div className={s.notVerified}>
              <IconAlert />
              <div>Не найден в базах, не может быть проверен платформой</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ContentHeader;
