import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = document.getElementById('root_debts')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;

export const closingDocsApiActions = createApi({
  reducerPath: 'closingDocsApiActions',
  tagTypes: ['closingDocs'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
      Accept: 'application/json',
    },
  }),
  endpoints: (build) => ({
    getClosingDocs: build.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          const next = lastPage.links?.next;
          if (!next) return undefined;

          const nextPage = new URL(next, 'http://dummy').searchParams.get('page');
          return Number(nextPage);
        },
      },
      query: ({ queryArg, pageParam }) => {
        const { docType, ...rest } = queryArg;
        return {
          url: `/documents/${docType}/for_sync_by_company?page=${pageParam}`,
          method: 'GET',
          params: rest,
        };
      },
      transformResponse: (response) => response?.data ?? [],
      providesTags: ['closingDocs'],
    }),
    attachUpdToOrders: build.mutation({
      query: ({ doc_id, order_ids, type }) => ({
        url: `/documents/${type}/attach_orders/${doc_id}`,
        method: 'POST',
        body: { order_ids },
      }),
      invalidatesTags: ['closingDocs'],
    }),

    detachUpdFromOrders: build.mutation({
      query: ({ doc_id, order_ids, type }) => ({
        url: `/documents/${type}/detach_order/${doc_id}`,
        method: 'POST',
        body: { order_ids },
      }),
      invalidatesTags: ['closingDocs'],
    }),

    createDoc: build.mutation({
      query: ({ order_ids, type }) => ({
        url: `/documents/${type === 'upd' ? 'upd' : 'acts'}/create_by_orders`,
        method: 'POST',
        body: { order_ids },
      }),
      invalidatesTags: () => ['closingDocs'],
    }),
  }),
});

export const {
  useGetClosingDocsInfiniteQuery,
  useAttachUpdToOrdersMutation,
  useDetachUpdFromOrdersMutation,
  useCreateDocMutation,
} = closingDocsApiActions;
