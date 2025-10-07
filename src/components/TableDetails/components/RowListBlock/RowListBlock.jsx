// React & libs
import React, { useState, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

//Api
import { useCreateDocMutation } from '../../../../redux/services/closingDocsApiActions';

// Hooks
import { useModal } from 'hooks/useModal';

// Utils
import formatAmount from 'utils/formatAmount';

// Components
import OperationItem from 'components/TableDetails/components/OperationItem/OperationItem';
import AttachButton from '../AttachButton/AttachButton';
import CreateButton from '../CreateButton/CreateButton';

// Icons
import { ReactComponent as IconArrowBendLeft } from 'assets/icons/ArrowBendDownLeft.svg';
import { ReactComponent as IconAlertOrange } from 'assets/icons/iconAlertOrange.svg';

// Styles
import s from './RowListBlock.module.scss';

const RowListBlock = ({ list, orders, companyId }) => {
  const adittionalList = [...list];
  if (orders.length > 0) {
    adittionalList.push({ orders: orders });
  }
  return (
    <div>
      {adittionalList.map((item, i) => {
        // if (!item.orders?.length) return null;

        return (
          <div key={`item-${i}`}>
            <div className={s.infoContainer}>
              <UpdBlock item={item} companyId={companyId} />

              <OrdersBlock item={item} companyId={companyId} />
            </div>

            {i < adittionalList.length - 1 && <div className={s.line} />}
          </div>
        );
      })}
    </div>
  );
};
export default RowListBlock;
const UpdBlock = ({ item = {}, orders = [], companyId }) => {
  const [createDoc, { isLoading: isLoadingCreate }] = useCreateDocMutation();

  const types = {
    1: 'acts',
    3: 'upd',
  };
  const typesURL = {
    1: 'act',
    3: 'upd',
  };
  const { showModal } = useModal();
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const type = item.type ? types[item.type] : 'upd';

  const relatedSum = item?.attachedDocs?.reduce((acc, doc) => acc + parseFloat(doc.sum), 0);
  const updSum = item.sum ? Number(item.sum) + relatedSum : relatedSum;

  const ordersSum =
    item.orders.reduce((acc, order) => acc + parseFloat(order.sum), 0) ||
    orders.reduce((acc, order) => acc + parseFloat(order.sum), 0);
  const diff = item.difference;

  const isEmptyDay = Object.keys(item).length === 1 && item.orders.length === 0;
  const isEmptyUdps = !item.id;

  useEffect(() => {
    if (item) {
      const arr = item.orders.reduce((acc, el) => {
        acc.push(el.id);
        return acc;
      }, []);

      setSelectedOrders(arr);
    }
  }, [item]);

  const ordersIds = useMemo(() => {
    if (isEmptyUdps && item?.orders?.length > 1) {
      return selectedOrders;
    } else {
      const arr = item.orders.reduce((acc, el) => {
        acc.push(el.id);
        return acc;
      }, []);
      return arr;
    }
  }, [item.orders, isEmptyUdps, selectedOrders]);
  console.log(ordersIds);

  const handleShowAttachModal = (type) => {
    console.log('sdfsdfsdfsdfsdf', type, ordersIds);
    showModal('ATTACH_UPD', {
      ordersIds,
      companyId: companyId,
      documentId: item.id,
      type: types[item.type] ? types[item.type] : type,
    });
  };

  const handleCreateDoc = (type) => {
    createDoc({ order_ids: ordersIds, type }).then((res) => {
      if (res.data.success) {
        window.open(
          `https://lk.skilla.ru/new/${type === 'acts' ? 'act' : type}/detail/${res.data.data.id}`
        );
      }
    });
  };

  const handleVisButton = () => {
    setIsVisibleButton(true);
  };

  const handleHiddenButton = () => {
    setIsVisibleButton(false);
  };

  return (
    <div className={s.infoUpdBlock}>
      {!isEmptyDay && !isEmptyUdps && (
        <OperationItem
          key={item.id}
          onClick={() => {
            if (item?.id) {
              const url = `https://lk.skilla.ru/new/${typesURL[item.type]}/detail/${item.id}`;
              window.open(url, '_blank');
            } else {
              alert('ID не найден');
            }
          }}
          amount={item.sum}
          subtitle={`№${item.num}`}
        />
      )}

      {item?.attachedDocs?.length > 0 && (
        <div className={s.related}>
          <span>Связанные закрывающие</span>
          <ul className={s.list}>
            {item?.attachedDocs?.map((el) => {
              return (
                <OperationItem
                  key={el.id}
                  onClick={() => {
                    if (el?.id) {
                      const url = `https://lk.skilla.ru/new/${typesURL[el.type]}/detail/${el.id}`;
                      window.open(url, '_blank');
                    } else {
                      alert('ID не найден');
                    }
                  }}
                  amount={el.sum}
                  subtitle={`№${el.num}`}
                />
              );
            })}
          </ul>
        </div>
      )}

      {isEmptyUdps && (
        <div
          onMouseEnter={handleVisButton}
          onMouseLeave={handleHiddenButton}
          className={s.operationAlertWrapper}
        >
          <div
            className={classNames(
              s.operationAlert,
              (isVisibleButton || isActiveButton) && s.operationAlert_hidden
            )}
          >
            <IconAlertOrange />
            <div className={s.orangeTextDoc}>
              <span>{`Нет закрывающих док-в на ${formatAmount(ordersSum)}`}</span>
            </div>
          </div>
          <div
            className={classNames(s.buttonBlock, (isVisibleButton || isActiveButton) && s.active)}
          >
            <CreateButton
              type={'doc'}
              orders={item?.orders}
              selectedOrders={selectedOrders}
              setSelectedOrders={setSelectedOrders}
              handleCreate={handleCreateDoc}
              handleAttach={handleShowAttachModal}
              isVisibleButton={isVisibleButton}
              setIsVisibleButton={setIsActiveButton}
            />
          </div>
        </div>
      )}

      {ordersSum < updSum && item?.attachedDocs?.length > 0 && (
        <div
          onMouseEnter={handleVisButton}
          onMouseLeave={handleHiddenButton}
          className={s.operationAlertWrapper}
        >
          <div className={classNames(s.operationAlert, isVisibleButton && s.operationAlert_hidden)}>
            <IconAlertOrange />
            <div className={s.orangeTextDoc}>
              <span>{`Избыток ${formatAmount(updSum - ordersSum)}`}</span>
            </div>
          </div>
          <div className={classNames(s.buttonBlock, isVisibleButton && s.active)}>
            <AttachButton handler={handleShowAttachModal} type={'detach'} />
          </div>
        </div>
      )}

      {ordersSum > updSum && !isEmptyDay && !isEmptyUdps && (
        <div
          onMouseEnter={handleVisButton}
          onMouseLeave={handleHiddenButton}
          className={s.operationAlertWrapper}
        >
          <div
            className={classNames(
              s.operationAlert,
              (isVisibleButton || isActiveButton) && s.operationAlert_hidden
            )}
          >
            <div className={s.orangeText}>{`Не хватает ${formatAmount(ordersSum - updSum)}`}</div>
            <IconArrowBendLeft />
          </div>
          <div
            className={classNames(s.buttonBlock, (isVisibleButton || isActiveButton) && s.active)}
          >
            {/* <AttachButton handler={handleShowAttachModal} /> */}
            <CreateButton
              type={type === 'upd' ? 'attachUpd' : 'attachAct'}
              handleCreate={handleCreateDoc}
              handleAttach={handleShowAttachModal}
              isVisibleButton={isVisibleButton}
              setIsVisibleButton={setIsActiveButton}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const OrdersBlock = ({ item = {}, orders = [], companyId }) => {
  const types = {
    1: 'acts',
    3: 'upd',
  };
  const type = item.type ? types[item.type] : 'upd';
  const { showModal } = useModal();
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const diff = Math.abs(item.difference);
  const updSum = parseFloat(item.sum) ?? 0;

  const ordersSum = item.orders.reduce((acc, order) => acc + parseFloat(order.sum), 0);
  const isEmptyOrders = item.orders.length === 0;

  // const ordersSum = orders.reduce((acc, order) => acc + parseFloat(order.sum), 0);
  // const isEmptyDay = Object.keys(item).length === 0;
  // const isEmptyOrders = orders.length === 0 || item.orders.length === 0;

  const handleShowAttachModal = () => {
    showModal('ATTACH_ORDERS', {
      companyId: companyId,
      documentId: item.id,
    });
  };

  const handleNavigateToCreateOrder = () => {
    window.open('https://lk.skilla.ru/new/orders/create', '_blank');
  };

  const handleVisButton = () => {
    setIsVisibleButton(true);
  };

  const handleHiddenButton = () => {
    setIsVisibleButton(false);
  };

  return (
    <div className={s.infoUpdBlock}>
      {!isEmptyOrders &&
        item.orders.map((order, i) => (
          <OperationItem
            key={i}
            onClick={() => {
              if (order?.id) {
                const url = `https://lk.skilla.ru/new/orders/order_detail/${order.id}`;
                window.open(url, '_blank');
              } else {
                alert('ID не найден');
              }
            }}
            amount={order.sum || ''}
            subtitle={order.date ? dayjs(order.date).format('DD.MM.YY') : ''}
          />
        ))}

      {isEmptyOrders && (
        <div
          onMouseEnter={handleVisButton}
          onMouseLeave={handleHiddenButton}
          className={s.operationAlertWrapper}
        >
          <div
            className={classNames(
              s.operationAlert,
              (isVisibleButton || isActiveButton) && s.operationAlert_hidden
            )}
          >
            <IconAlertOrange />
            <div className={s.orangeText}>{`Нет заказа на ${formatAmount(diff)}`}</div>
          </div>
          <div
            className={classNames(s.buttonBlock, (isVisibleButton || isActiveButton) && s.active)}
          >
            <CreateButton
              handleCreate={handleNavigateToCreateOrder}
              handleAttach={handleShowAttachModal}
              isVisibleButton={isVisibleButton}
              setIsVisibleButton={setIsActiveButton}
            />
          </div>
        </div>
      )}

      {!isEmptyOrders && ordersSum < updSum && (
        <div
          onMouseEnter={handleVisButton}
          onMouseLeave={handleHiddenButton}
          className={s.operationAlertWrapper}
        >
          <div className={classNames(s.operationAlert, isVisibleButton && s.operationAlert_hidden)}>
            <div className={s.orangeText}>{`Не хватает ${formatAmount(updSum - ordersSum)}`}</div>
            <IconArrowBendLeft />
          </div>
          <div className={classNames(s.buttonBlock, isVisibleButton && s.active)}>
            <AttachButton handler={handleShowAttachModal} />
          </div>
        </div>
      )}
    </div>
  );
};
