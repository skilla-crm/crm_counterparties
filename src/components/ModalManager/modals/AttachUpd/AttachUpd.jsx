// React & libs
import { useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import 'dayjs/locale/ru';

//Hooks
import { useModal } from 'hooks/useModal';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { useGetClosingDocsInfiniteQuery } from '../../../../redux/services/closingDocsApiActions';
import { debtsApiActions } from '../../../../redux/services/debtsApiActions';
import { resetModalDates } from '../../../../redux/filters/dateRangeAttachModalSlice';

// Components
import LoaderCircle from 'components/General/LoaderCircle/LoaderCircle';
import Modal from 'components/General/Modal/Modal';
import ModalAttachDateFilter from 'components/Filters/ModalAttachDateFilter/ModalAttachDateFilter';
import AttachTableRow from './components/AttachTableRow/AttachTableRow';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg';
import { ReactComponent as IconAttach } from 'assets/icons/IconAttachBlack.svg';

// Styles
import s from './AttachUpd.module.scss';

const AttachUpd = () => {
  const { modalProps, hideModal } = useModal();
  const { ordersIds, type, companyId, documentId } = modalProps;

  const dispatch = useDispatch();
  const { modalDateStartPicker, modalDateEndPicker } = useSelector(
    (state) => state.dateAttachModalRange || {}
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocal, setSearchlocal] = useState('');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetClosingDocsInfiniteQuery({
      docType: type,
      company_id: companyId,
      order_id: documentId,
      'filter[search]': searchLocal || '',
      'filter[date_start]': modalDateStartPicker || '',
      'filter[date_end]': modalDateEndPicker || '',
    });

  const allData = data?.pages?.flatMap((page) => page.data) || [];

  const handleClose = () => {
    resetModalDates();
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
              <p>{`Прикрепить ${type === 'upd' ? 'УДП' : 'АКТ'} к заказам`}</p>
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

          <ModalAttachDateFilter isFetching={isLoading} />
        </div>
        <div className={s.container}>
          <div className={classNames(s.loader, isLoading && s.loader_vis)}>
            <LoaderCircle vis={true} />
          </div>
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.date}>Дата</th>
                <th className={s.number}>Номер</th>
                <th className={s.sum}>Сумма, ₽</th>
                <th className={s.status}>Обмен оригиналом</th>
                <th className={s.updsChain}>Заказы</th>
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
              // endMessage={
              //   <p style={{ textAlign: 'center' }}>
              //     <b>Все УПД загружены</b>
              //   </p>
              // }
            >
              {allData.length > 0 ? (
                allData?.map((el) => {
                  return (
                    <AttachTableRow
                      key={el.id}
                      el={el}
                      ordersIds={ordersIds}
                      type={type}
                      loadList={isLoading}
                    />
                  );
                })
              ) : (
                <p
                  className={s.notFound}
                >{`Не найдено ни одного ${type === 'upd' ? 'УПД' : 'акта'}`}</p>
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default AttachUpd;
