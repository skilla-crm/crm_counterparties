import { useGetCounterpartiesInfiniteQuery } from '../redux/services/counterpartiesListApiActions';
import { useMemo } from 'react';
export const useCounterparties = ({
    activeTab,
    sortDir,
    sortBy,
    counterpartiesType,
    searchQuery,
}) => {
    const isApproved = activeTab === 'approved';
    const isNotApproved = activeTab === 'notApproved';

    const approved = useGetCounterpartiesInfiniteQuery(
        {
            'sort[type]': sortBy,
            'sort[dir]': sortDir,
            'filter[verified_id]': 0,
            // 'filter[is_black]': counterpartiesType,
            // 'filter[search]': searchQuery,
        },
        { skip: !isApproved, refetchOnMountOrArgChange: false }
    );

    const notApproved = useGetCounterpartiesInfiniteQuery(
        {
            'sort[type]': sortBy,
            'sort[dir]': sortDir,
            'filter[verified_id]': 1,
            // 'filter[is_black]': counterpartiesType,
            // 'filter[search]': searchQuery,
        },
        { skip: !isNotApproved, refetchOnMountOrArgChange: false }
    );

    const result = useMemo(() => {
        return isApproved ? approved : notApproved;
    }, [isApproved, approved, notApproved]);

    const allRows = result.data?.pages?.flatMap((page) => page.data) || [];

    const totalCount =
        result.data?.pages?.[0]?.meta?.total || allRows.length || 0;

    return {
        totalCount,
        ...result,
        allRows,
        totalCount,
        error: result.error,
    };
};
