import { useGetCounterpartiesInfiniteQuery } from '../redux/services/counterpartiesApiActions';
import { useMemo } from 'react';

export const useCounterparties = ({
    activeTab,
    sortDir,
    sortBy,
    counterpartiesType,
}) => {
    const isApproved = activeTab === 'approved';
    const isNotApproved = activeTab === 'notApproved';

    const approvedQuery = useGetCounterpartiesInfiniteQuery(
        {
            'sort[type]': sortBy,
            'sort[dir]': sortDir,
            'filter[verified_id]': 'approved',
            'filter[is_black]': counterpartiesType,
        },
        { skip: !isApproved, refetchOnMountOrArgChange: false }
    );

    const notApprovedQuery = useGetCounterpartiesInfiniteQuery(
        {
            'sort[type]': sortBy,
            'sort[dir]': sortDir,
            'filter[verified_id]': 'notApproved',
            'filter[is_black]': counterpartiesType,
        },
        { skip: !isNotApproved, refetchOnMountOrArgChange: false }
    );

    const result = useMemo(() => {
        return isApproved ? approvedQuery : notApprovedQuery;
    }, [isApproved, approvedQuery, notApprovedQuery]);

    const allRows = result.data?.pages?.flatMap((page) => page.data) || [];
    const totalCount =
        result.data?.pages?.[0]?.meta?.total || allRows.length || 0;

    return {
        ...result,
        allRows,
        totalCount,
    };
};
