import { act, useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

//utils

import arrayToString from 'utils/arrayToString';

import { approvedCounterparties, notApprovedCounterparties } from 'mock/contr';

//redux
import { useGetCompaniesQuery } from '../../redux/services/filtersApiActions';
import { setPartnerships } from '../../redux/filters/companiesListSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useGetDebtsInfiniteQuery } from '../../redux/services/debtsApiActions';

// Components
import Search from 'components/General/Search/Search';
import Table from 'components/Table/Table';
import FiltersContainer from 'components/Filters/FiltersContainer';
import ListHeader from './ListHeader';

// Styles
import s from './List.module.scss';
import SegmentButtons from 'components/General/SegmentButtons/SegmentButtons';
import { set } from 'lodash';

const List = () => {
    const COUNTERPARTIES_TYPES = [
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

    const {
        data: approvedData,
        fetchNextPage: fetchNextPageApproved,
        hasNextPage: hasNextPageApproved,
        isLoading: isLoadingApproved,
        isFetching: isFetchingApproved,
        error: approvedDataError,
    } = useGetDebtsInfiniteQuery({
        sort: activeTab === 'approved' ? `${sortDir}${sortBy}` : '',
    });

    const {
        data: notApprovedData,
        fetchNextPage: fetchNextPageNotApproved,
        hasNextPage: hasNextPageNotApproved,
        isLoading: isLoadingNotApproved,
        isFetching: isFetchingNotApproved,
        error: notApprovedDataError,
    } = useGetDebtsInfiniteQuery({
        sort: activeTab === 'notApproved' ? `${sortDir}${sortBy}` : '',
    });

    const allRowsApproved =
        approvedData?.pages?.flatMap((page) => page.data) || [];
    // const totalCountApproved = approvedData?.pages?.[0]?.meta?.total;
    const totalCountApproved = approvedCounterparties.length;

    const allRowsNotApproved =
        notApprovedData?.pages?.flatMap((page) => page.data) || [];
    // const totalCountNotApproved = notApprovedData?.pages?.[0]?.meta?.total;
    const totalCountNotApproved = notApprovedCounterparties.length;

    return (
        <div className={s.root} ref={containerRef}>
            <ListHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setAnim={setAnim}
                isLoading={isLoadingApproved || isLoadingNotApproved}
                counters={{
                    approved: totalCountApproved,
                    notApproved: totalCountNotApproved,
                }}
            />

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
                        segments={COUNTERPARTIES_TYPES}
                    />
                </div>

                <FiltersContainer
                    type={activeTab}
                    isFetching={
                        activeTab === 'approved'
                            ? isFetchingApproved
                            : isFetchingNotApproved
                    }
                />
            </div>

            <div className={s.container}>
                <InfiniteScroll
                    dataLength={
                        activeTab === 'approved'
                            ? allRowsApproved.length
                            : allRowsNotApproved.length
                    }
                    next={
                        activeTab === 'approved'
                            ? fetchNextPageApproved
                            : fetchNextPageNotApproved
                    }
                    hasMore={
                        activeTab === 'approved'
                            ? hasNextPageApproved
                            : hasNextPageNotApproved
                    }
                    scrollableTarget="scrollableDiv"
                    style={{
                        overflow:
                            allRowsApproved.length === 0 ? 'hidden' : 'auto',
                    }}
                >
                    <Table
                        anim={anim}
                        type={activeTab}
                        // list={
                        //   activeTab === "approved" ? allRowsApproved : allRowsNotApproved
                        // }
                        list={
                            activeTab === 'approved'
                                ? approvedCounterparties
                                : notApprovedCounterparties
                        }
                        totalCount={
                            activeTab === 'approved'
                                ? totalCountApproved
                                : totalCountNotApproved
                        }
                        isLoading={
                            activeTab === 'approved'
                                ? isLoadingApproved
                                : isLoadingNotApproved
                        }
                        // error={
                        //   activeTab === "approved"
                        //     ? approvedDataError
                        //     : notApprovedDataError
                        // }
                    />
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default List;
