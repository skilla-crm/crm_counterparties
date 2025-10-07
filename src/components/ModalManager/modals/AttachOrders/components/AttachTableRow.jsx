// React & libs
import { useState, useEffect, useRef, memo, useCallback } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Redux
import { useDispatch } from 'react-redux';
import {
  useAttachOrderToClosingDocMutation,
  useDetachOrderFromClosingDocMutation,
} from '../../../../../redux/services/ordersApiActions';
import { debtsApiActions } from '../../../../../redux/services/debtsApiActions';

// Utils
import formatAmount from 'utils/formatAmount';

// Components
import Goal from 'components/General/Goal/Goal';
import UniButton from 'components/General/UniButton/UniButton';

// Icons
import { ReactComponent as IconAttach } from 'assets/icons/iconAttachGrey.svg';
import { ReactComponent as IconLink } from 'assets/icons/AttachModalAssets/iconLink.svg';
import { ReactComponent as LinkBreak } from 'assets/icons/AttachModalAssets/LinkBreak.svg';
import { ReactComponent as StatusSuccess } from 'assets/icons/AttachModalAssets/StatusSuccess.svg';
import { ReactComponent as StatusRed } from 'assets/icons/AttachModalAssets/StatusRed.svg';
import { ReactComponent as StatusWait } from 'assets/icons/AttachModalAssets/StatusWait.svg';

// Styles
import s from './AttachTableRow.module.scss';
import classNames from 'classnames';

const getStatusIcon = (status) => {
  const sIcon = s.statusIcon;
  const numStatus = Number(status);

  if ([4, 7, 8].includes(numStatus)) return <StatusSuccess className={sIcon} />;
  if (numStatus === 5) return <StatusRed className={sIcon} />;
  if (numStatus < 4) return <StatusWait className={sIcon} />;

  return null;
};

const AttachTableRow = memo(({ el, documentId }) => {
  dayjs.extend(customParseFormat);
  const [isHover, setIsHover] = useState(false);
  const [isAttach, setIsAttach] = useState(false);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const [attachDocument, { isLoading: isAttaching }] = useAttachOrderToClosingDocMutation();
  const [detachDocument, { isLoading: isDetaching }] = useDetachOrderFromClosingDocMutation();

  useEffect(() => {
    setIsAttach(el?.is_pinned);
  }, [el?.is_pinned]);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  const handleAttach = () => {
    setLoad(true);
    attachDocument({ docs: [documentId], order_id: el.id })
      .then((res) => {
        if (res?.success) {
          setIsAttach(true);
        } else console.warn('Не удалось прикрепить заказ', res);
      })
      .catch((err) => {
        console.error('Ошибка при прикреплении заказа:', err);
      })
      .finally(() => {
        setLoad(false);
        dispatch(debtsApiActions.util.invalidateTags(['details']));
      });
  };

  const handleDetach = () => {
    setLoad(true);
    detachDocument({ docs: [documentId], order_id: el.id })
      .then((res) => {
        if (res?.success) setIsAttach(false);
        else console.warn('Не удалось открепить заказ', res);
      })
      .catch((err) => {
        console.error('Ошибка при откреaплении заказа:', err);
      })
      .finally(() => {
        setLoad(false);
        dispatch(debtsApiActions.util.invalidateTags(['details']));
      });
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={s.row}>
      <div className={s.date}>{dayjs(el?.date, 'DD.MM.YYYY').format('DD.MM.YY')}</div>
      <div className={s.adress}>
        <Goal text={el?.address} />
      </div>
      <div className={s.sum}>
        <span>{formatAmount(el?.sum).slice(0, -3)}</span>
        <span className={s.gray}>{formatAmount(el?.sum).slice(-3)}</span>
      </div>
      <div className={s.status}>{getStatusIcon(el.status)}</div>
      <div className={s.updsChain}>
        {el?.pinned_docs_count > 0 && (
          <>
            <IconAttach />
            <span>{el?.pinned_docs_count}</span>
          </>
        )}
      </div>
      <div className={classNames(s.attachSwitch, (isHover || isAttach || isAttaching) && s.attachSwitch_vis)}>
        {' '}
        <UniButton
          text={isAttach ? 'Открепить' : 'Прикрепить'}
          type={isAttach ? 'outline' : 'outline'}
          onClick={isAttach ? handleDetach : handleAttach}
          icon={isAttach ? LinkBreak : IconLink}
          width={150}
          isLoading={isAttach ? isDetaching : isAttaching}
          loaderColor={isAttach ? 'blue' : 'blue'}
        />
      </div>
    </div>
  );
});

export default AttachTableRow;
