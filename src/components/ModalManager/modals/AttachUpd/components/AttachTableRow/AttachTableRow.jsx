// React & libs
import { useState, useEffect, memo } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

// Utils
import formatAmount from 'utils/formatAmount';

// Components
import UniButton from 'components/General/UniButton/UniButton';
import Status from '../Status/Status';

// Icons
import { ReactComponent as IconAttach } from 'assets/icons/iconAttachGrey.svg';
import { ReactComponent as IconLink } from 'assets/icons/AttachModalAssets/iconLink.svg';
import { ReactComponent as LinkBreak } from 'assets/icons/AttachModalAssets/LinkBreak.svg';

// Redux services
import {
  useAttachUpdToOrdersMutation,
  useDetachUpdFromOrdersMutation,
} from '../../../../../../redux/services/closingDocsApiActions';
import { debtsApiActions } from '../../../../../../redux/services/debtsApiActions';
import { useDispatch } from 'react-redux';

// Styles
import s from './AttachTableRow.module.scss';

const AttachTableRow = memo(({ el, ordersIds, type, loadList }) => {
  const [attachUpd, { isLoading: isAttaching }] = useAttachUpdToOrdersMutation();
  const [detachUpd, { isLoading: isDetaching }] = useDetachUpdFromOrdersMutation();
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const [isAttach, setIsAttach] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setIsAttach(el?.is_pinned);
  }, [el?.is_pinned]);
  const handleAttach = () => {
    setLoad(true);
    attachUpd({ doc_id: el.id, order_ids: ordersIds, type })
      .unwrap()
      .then((res) => {
        if (res?.success) {
          setIsAttach(true);
        } else {
          console.warn('Не удалось прикрепить заказ', res);
        }
      })
      .catch((error) => {
        console.error('Ошибка при прикреплении заказа:', error);
      })
      .finally(() => {
        setLoad(false);
        dispatch(debtsApiActions.util.invalidateTags(['details']));
      });
  };

  const handleDetach = () => {
    setLoad(true);
    detachUpd({ doc_id: el.id, order_ids: ordersIds, type })
      .unwrap()
      .then((res) => {
        if (res?.success) {
          setIsAttach(false);
        } else {
          console.warn('Не удалось открепить заказ', res);
        }
      })
      .catch((error) => {
        console.error('Ошибка при откреплении заказа:', error);
      })
      .finally(() => {
        setLoad(false);
        dispatch(debtsApiActions.util.invalidateTags(['details']));
      });
  };


  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={s.row}>
      <div className={s.date}>{dayjs(el?.date).format('DD.MM.YYYY')}</div>
      <div className={s.number}>{el?.num}</div>
      <div className={s.sum}>
        <span>{formatAmount(el?.sum).slice(0, -3)}</span>
        <span className={s.gray}>{formatAmount(el?.sum).slice(-3)}</span>
      </div>
      <div className={s.status} style={{ paddingLeft: '40px' }}>
        <Status type={el?.exchange} />
      </div>
      <div className={s.updsChain}>
        {el?.orders.length > 0 && (
          <>
            <IconAttach />
            <span>{el?.orders.length}</span>
          </>
        )}
      </div>
      <div className={classNames(s.attachSwitch, (isHover || isAttach || isAttaching) && s.attachSwitch_vis)}>
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
