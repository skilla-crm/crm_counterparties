import { useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { approvedCounterparties, notApprovedCounterparties } from 'mock/contr';

import { useDispatch, useSelector } from 'react-redux';
import { useGetCounterpartiesInfiniteQuery } from '../../redux/services/counterpartiesApiActions';

// Components
import Search from 'components/General/Search/Search';
import Table from 'components/Table/Table';
import FiltersContainer from 'components/Filters/FiltersContainer';
import ListHeader from './ListHeader';

// Styles
import s from './List.module.scss';
import SegmentButtons from 'components/General/SegmentButtons/SegmentButtons';
import { useCounterparties } from 'hooks/useCounterarties';

const List = () => {
    const COUNTERPARTIES_SUB_TYPES = [
        { value: 'active', label: 'Активные', ref: useRef() },
        { value: 'stop', label: 'Стоп-лист', ref: useRef() },
    ];
    const dispatch = useDispatch();
    const containerRef = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('approved');
    const [counterpartiesType, setCounterpartiesType] = useState('active');

    const [anim, setAnim] = useState(true);

    const { sortBy, sortDir } = useSelector((state) => state.sort);
    const { allRows, fetchNextPage, hasNextPage, isLoading, isFetching } =
        useCounterparties({ activeTab, sortDir, sortBy, counterpartiesType });

    // const {
    //     data: approvedData,
    //     fetchNextPage: fetchNextPageApproved,
    //     hasNextPage: hasNextPageApproved,
    //     isLoading: isLoadingApproved,
    //     isFetching: isFetchingApproved,
    //     error: approvedDataError,
    // } = useGetCounterpartiesInfiniteQuery({
    //     sort: activeTab === 'approved' ? `${sortDir}${sortBy}` : '',
    //     'filter[verified_id]': 'approved',
    //     'filter[is_black]': activeTab === 'approved' ? counterpartiesType : '',
    // });

    // const {
    //     data: notApprovedData,
    //     fetchNextPage: fetchNextPageNotApproved,
    //     hasNextPage: hasNextPageNotApproved,
    //     isLoading: isLoadingNotApproved,
    //     isFetching: isFetchingNotApproved,
    //     error: notApprovedDataError,
    // } = useGetCounterpartiesInfiniteQuery({
    //     sort: activeTab === 'notApproved' ? `${sortDir}${sortBy}` : '',
    //     'filter[verified_id]': 'notApproved',
    //     'filter[is_black]':
    //         activeTab === 'notApproved' ? counterpartiesType : '',
    // });

    // const allRowsApproved =
    //     approvedData?.pages?.flatMap((page) => page.data) || [];
    // const totalCountApproved = approvedData?.pages?.[0]?.meta?.total;
    const totalCountApproved = approvedCounterparties.length;

    // const allRowsNotApproved =
    //     notApprovedData?.pages?.flatMap((page) => page.data) || [];
    // const totalCountNotApproved = notApprovedData?.pages?.[0]?.meta?.total;
    const totalCountNotApproved = notApprovedCounterparties.length;

    return (
        <div className={s.root} ref={containerRef}>
            <ListHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setAnim={setAnim}
                isLoading={isLoading}
                counters={{
                    approved: totalCountApproved,
                    notApproved: totalCountNotApproved,
                }}
            />
            <span
                key={activeTab}
                className={`${s.subtitle} ${activeTab === 'approved' ? s.fadeIn : s.fadeOut}`}
            >
                {activeTab === 'approved'
                    ? 'Проверены платформой'
                    : 'Реквизиты не найдены в базах и не могут быть проверены платформой '}
            </span>
            <div className={s.queryPanel}>
                <div className={s.searchPanel}>
                    <Search
                        searchValue={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder="Наименование, ИНН, ОГРН, телефон, e-mail, имя"
                        style={{ width: '500px' }}
                    />
                    <SegmentButtons
                        style={2}
                        value={counterpartiesType}
                        callback={(val) => setCounterpartiesType(val)}
                        controlRef={useRef()}
                        segments={COUNTERPARTIES_SUB_TYPES}
                    />
                </div>

                <FiltersContainer type={activeTab} isFetching={isFetching} />
            </div>

            <div className={s.container}>
                <InfiniteScroll
                    dataLength={allRows.length}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    scrollableTarget="scrollableDiv"
                    style={{
                        overflow: allRows.length === 0 ? 'hidden' : 'auto',
                    }}
                >
                    <Table
                        anim={anim}
                        type={activeTab}
                        list={
                            activeTab === 'approved'
                                ? approvedCounterparties
                                : notApprovedCounterparties
                        }
                        // isLoading={isLoading}
                        isLoading={isLoading}
                    />
                </InfiniteScroll>
            </div>
        </div>
        // <div className={s.root} ref={containerRef}>
        //     <ListHeader
        //         activeTab={activeTab}
        //         setActiveTab={setActiveTab}
        //         setAnim={setAnim}
        //         isLoading={isLoadingApproved || isLoadingNotApproved}
        //         counters={{
        //             approved: totalCountApproved,
        //             notApproved: totalCountNotApproved,
        //         }}
        //     />
        //     <span
        //         key={activeTab}
        //         className={`${s.subtitle} ${activeTab === 'approved' ? s.fadeIn : s.fadeOut}`}
        //     >
        //         {activeTab === 'approved'
        //             ? 'Проверены платформой'
        //             : 'Реквизиты не найдены в базах и не могут быть проверены платформой '}
        //     </span>
        //     <div className={s.queryPanel}>
        //         <div className={s.searchPanel}>
        //             <Search
        //                 searchValue={searchQuery}
        //                 setSearchQuery={setSearchQuery}
        //                 placeholder="Наименование, ИНН, ОГРН, телефон, e-mail, имя"
        //                 style={{ width: '500px' }}
        //             />
        //             <SegmentButtons
        //                 style={2}
        //                 value={counterpartiesType}
        //                 callback={(val) => setCounterpartiesType(val)}
        //                 controlRef={useRef()}
        //                 segments={COUNTERPARTIES_SUB_TYPES}
        //             />
        //         </div>

        //         <FiltersContainer
        //             type={activeTab}
        //             isFetching={
        //                 activeTab === 'approved'
        //                     ? isFetchingApproved
        //                     : isFetchingNotApproved
        //             }
        //         />
        //     </div>

        //     <div className={s.container}>
        //         <InfiniteScroll
        //             dataLength={
        //                 activeTab === 'approved'
        //                     ? allRowsApproved.length
        //                     : allRowsNotApproved.length
        //             }
        //             next={
        //                 activeTab === 'approved'
        //                     ? fetchNextPageApproved
        //                     : fetchNextPageNotApproved
        //             }
        //             hasMore={
        //                 activeTab === 'approved'
        //                     ? hasNextPageApproved
        //                     : hasNextPageNotApproved
        //             }
        //             scrollableTarget="scrollableDiv"
        //             style={{
        //                 overflow:
        //                     allRowsApproved.length === 0 ? 'hidden' : 'auto',
        //             }}
        //         >
        //             <Table
        //                 anim={anim}
        //                 type={activeTab}
        //                 // list={
        //                 //   activeTab === "approved" ? allRowsApproved : allRowsNotApproved
        //                 // }
        //                 list={
        //                     activeTab === 'approved'
        //                         ? approvedCounterparties
        //                         : notApprovedCounterparties
        //                 }
        //                 totalCount={
        //                     activeTab === 'approved'
        //                         ? totalCountApproved
        //                         : totalCountNotApproved
        //                 }
        //                 isLoading={
        //                     activeTab === 'approved'
        //                         ? isLoadingApproved
        //                         : isLoadingNotApproved
        //                 }
        //                 // error={
        //                 //   activeTab === "approved"
        //                 //     ? approvedDataError
        //                 //     : notApprovedDataError
        //                 // }
        //             />
        //         </InfiniteScroll>
        //     </div>
        // </div>
    );
};

export default List;
