// External
import dayjs from 'dayjs';
import classNames from 'classnames';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import UniButton from 'components/General/UniButton/UniButton';
import LogoUpload from 'components/General/LogoUpload/LogoUpload';
import EditableField from 'pages/Detail/ui/EditableField/EditableField';
import Label from 'pages/Detail/ui/Label/Label';

// Icons
import { ReactComponent as CircleCheck } from 'assets/icons/circleCheck.svg';
import { ReactComponent as IconAlert } from 'assets/icons/iconAlertOrange.svg';
import { ReactComponent as IconEdit } from 'assets/icons/iconEdit.svg';

// Styles
import s from './ContentHeader.module.scss';

const ContentHeader = ({ data, companyId }) => {
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
                {' '}
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
                        style={{ height: '24px' }}
                        onClick={(companyId) => {
                            showModal('REMOVE_RISK_BADGE', {
                                companyId: companyId,
                            });
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
                            <div>{`Проверен платформой ${dayjs(verified_date).format('DD.MM.YYYY')}`}</div>
                        </div>
                        <button
                            className={s.reportBtn}
                            onClick={() => {
                                showModal('MISTAKE_REPORT', {
                                    id: verified_id,
                                });
                            }}
                        >
                            <IconEdit />
                            <span>Сообщить о неточности</span>
                        </button>
                    </div>
                )}
                {!Boolean(verified_id) && (
                    <div className={s.flexRow}>
                        <div className={s.notVerified}>
                            <IconAlert />
                            <div>
                                Не найден в базах, не может быть проверен
                                платформой
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ContentHeader;
