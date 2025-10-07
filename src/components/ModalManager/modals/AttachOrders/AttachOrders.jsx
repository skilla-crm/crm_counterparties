// React & libs
import { useState, useCallback } from 'react';
import classNames from 'classnames';

import 'dayjs/locale/ru';
import debounce from 'lodash.debounce';
import InfiniteScroll from 'react-infinite-scroll-component';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { resetModalDates } from '../../../../redux/filters/dateRangeAttachModalSlice';
import { useGetOrdersInfiniteQuery } from '../../../../redux/services/ordersApiActions';
import { debtsApiActions } from '../../../../redux/services/debtsApiActions';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import LoaderCircle from 'components/General/LoaderCircle/LoaderCircle';
import Modal from 'components/General/Modal/Modal';
import ModalAttachDateFilter from 'components/Filters/ModalAttachDateFilter/ModalAttachDateFilter';
import AttachTableRow from './components/AttachTableRow';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg';
import { ReactComponent as IconAttach } from 'assets/icons/IconAttachBlack.svg';

// Styles
import s from './AttachOrders.module.scss';

const AttachOrders = ({ type }) => {
  const dispatch = useDispatch();
  const { modalProps, hideModal } = useModal();
  const { companyId, documentId } = modalProps;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocal, setSearchlocal] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const { modalDateStartPicker, modalDateEndPicker } = useSelector(
    (state) => state.dateAttachModalRange || {}
  );

  const params = {
    'filter[search]': searchLocal,
    'filter[date_start]': modalDateStartPicker || dateStart,
    'filter[date_end]': modalDateEndPicker || dateEnd,
  };

  const { data, currentData, fetchNextPage, isLoading, isFetching, hasNextPage } =
    useGetOrdersInfiniteQuery({
      document_id: [documentId],
      company_id: companyId,
      // order_id: documentId,
      ...params,
    });
  console.log(data);
  const allData = data?.pages?.flatMap((page) => page.data) || [];
  const handleClose = () => {
    resetModalDates();
    dispatch(debtsApiActions.util.invalidateTags(['details']));
    hideModal();
  };
  const handleSearch = (e) => {
    const value = e.currentTarget.value;
    setSearchQuery(value);
    updateSearchValue(value);
  };

  const updateSearchValue = useCallback(
    debounce((valueFilter) => {
      const letterPattern = /[а-яА-Яa-zA-Z]/;

      letterPattern.test(valueFilter)
        ? setSearchlocal(valueFilter)
        : setSearchlocal(valueFilter.replace(/\D/g, ''));
    }, 200),
    []
  );

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={s.modal}>
        <div className={s.header}>
          {
            <div className={s.title}>
              <IconAttach className={s.iconAttach} />
              <p>Прикрепить заказ к закрывающему документу</p>
            </div>
          }
          <div onClick={handleClose} className={s.close}>
            <IconCloseBlack />
          </div>
        </div>
        <div className={s.subheader}>
          <div className={s.search}>
            <IconSearch />
            <input
              className={s.input}
              onChange={handleSearch}
              value={searchQuery || ''}
              type="text"
              placeholder="Искать..."
            ></input>
          </div>

          <ModalAttachDateFilter
            setDateStart={setDateStart}
            setDateEnd={setDateEnd}
            dateStart={dateStart}
            dateEnd={dateEnd}
            shadow={true}
            isLoading={isFetching}
          />
        </div>
        <div className={s.container}>
          <div className={classNames(s.loader, isLoading && s.loader_vis)}>
            <LoaderCircle vis={true} />
          </div>
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.date}>Дата</th>
                <th className={s.adress}>Основной адрес</th>
                <th className={s.sum}>Сумма, ₽</th>
                <th className={s.status}>Статус</th>
                <th className={s.updsChain}>Закрывающие</th>
                <th className={s.switch}></th>
              </tr>
            </thead>
          </table>

          <div id="scrollableModal" className={classNames(s.block, isLoading && s.block_hidden)}>
            <InfiniteScroll
              scrollThreshold={0.8}
              dataLength={allData?.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              scrollableTarget="scrollableModal"
              style={{ overflow: 'hidden' }}
            >
              {allData.length > 0 ? (
                allData?.map((el) => {
                  return (
                    <AttachTableRow
                      key={el.id}
                      el={el}
                      documentId={documentId}
                      type={type}
                      loadList={isFetching}
                    />
                  );
                })
              ) : (
                <p className={s.notFound}>Не найдено ни одного заказа</p>
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default AttachOrders;
