// External
import classNames from 'classnames';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import EllipsisWithTooltip from 'components/General/EllipsisWithTooltip/EllipsisWithTooltip';

// Icons

import { ReactComponent as IconDoneGrey } from 'assets/icons/iconDoneGrey.svg';

// Styles
import s from './Objects.module.scss';

const Objects = ({ data, counterpartyId }) => {
    const { showModal } = useModal();
    const handleOpenAddObject = (data) => {
        showModal('ADD_OBJECT', { companyId: counterpartyId, data });
    };
    return (
        <div className={s.root}>
            {data.length > 0 ? (
                <div className={s.objects}>
                    <div className={classNames(s.gridRow, s.header)}>
                        <div>Название</div>
                        <div>Адрес</div>
                        <div className={s.switchContainer}>Основной</div>
                        <div></div>
                    </div>
                    {data.map((object) => (
                        <ObjectsRow
                            onClick={() => handleOpenAddObject(object)}
                            key={object.id}
                            object={object}
                            counterpartyId={counterpartyId}
                        />
                    ))}
                </div>
            ) : (
                <div className={s.empty}>Пока не добавлен ни один объект</div>
            )}
        </div>
    );
};
export default Objects;

const ObjectsRow = ({ object }) => {
    const { is_default, name, street, home, city } = object;
    return (
        <div className={classNames(s.gridRow)}>
            <div>
                <EllipsisWithTooltip text={name || ''} />
            </div>
            <div>
                <EllipsisWithTooltip
                    text={[street, home, city].filter(Boolean).join(', ')}
                />
            </div>

            <div className={s.switchContainer}>
                {Boolean(is_default) && <IconDoneGrey />}
            </div>
            <div></div>
        </div>
    );
};
