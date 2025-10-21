import Label from "pages/Detail/ui/Label/Label";
import s from "./ContentHeader.module.scss";
import classNames from "classnames";
import { ReactComponent as CircleCheck } from "assets/icons/circleCheck.svg";
import { ReactComponent as IconAlert } from "assets/icons/iconAlertOrange.svg";

import EllipsisWithTooltip from "components/General/EllipsisWithTooltip/EllipsisWithTooltip";
import UniButton from "components/General/UniButton/UniButton";
import { useModal } from "hooks/useModal";
import dayjs from "dayjs";
import EditableField from "pages/Detail/ui/EditableField/EditableField";
import LogoUpload from "components/General/LogoUpload/LogoUpload";

const ContentHeader = ({ data }) => {
  const { showModal } = useModal();
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
  return (
    <div className={classNames(s.contentHeader)}>
      <div className={classNames(s.logo)}>
        {" "}
        <LogoUpload
          disabled={false}
          buttonText="Загрузить логотип"
          buttonWidth={176}
          width={176}
          height={80}
          logo={logo}
          setLogo={(val) => {}}
        />
      </div>
      <div className={s.section}>
        <div className={s.flexRow}>
          <Label label={label} />
          <UniButton
            text="Риск"
            type="danger"
            width={44}
            style={{ height: "24px" }}
            onClick={(verified_id) => {
              showModal("REMOVE_RISK_BADGE", { id: verified_id });
            }}
          />
        </div>
        <h3>{name}</h3>
        <div className={s.flexRow}>
          {inn && <p>{`ИНН ${inn}`}</p>}
          {kpp && <p>{`КПП ${kpp}`}</p>}
          {ogrn && <p>{`ОГРН ${ogrn}`}</p>}
        </div>
        <div className={s.description}>{okved_name}</div>
        {Boolean(verified_id) && (
          <div className={s.flexRow}>
            <div className={s.verified}>
              <CircleCheck />
              <div>{`Проверен платформой ${dayjs(verified_date).format("DD.MM.YYYY")}`}</div>
            </div>
            <EditableField title="Сообщить о неточности" />
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
