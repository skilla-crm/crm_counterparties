import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = document
  .getElementById("root_counterparties")
  ?.getAttribute("token");
const COUNTERPARTIES_URL = "/counterparties";

export const counterpartiesApiActions = createApi({
  reducerPath: "counerpartiesApiActions",
  tagTypes: ["counterparties, counterparty"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      if (token) headers.set("Authorization", token);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getCounterparties: build.infiniteQuery({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          const next = lastPage.links?.next;
          if (!next) return undefined;
          const nextPage = new URL(next, "http://dummy").searchParams.get(
            "page"
          );
          return Number(nextPage);
        },
      },
      query: ({ queryArg, pageParam }) => ({
        url: `${COUNTERPARTIES_URL}/companies?page=${pageParam}`,
        method: "GET",
        params: queryArg,
      }),
      transformResponse: (response) => {
        return response;
      },
      providesTags: ["counterparties"],
      keepUnusedDataFor: 300,
    }),
    removeRiskBadge: build.mutation({
      query: (id) => ({
        url: `${COUNTERPARTIES_URL}/${id}`,
        method: "POST",
      }),
    }),
    checkCounterparty: build.mutation({
      query: ({ inn, kpp }) => ({
        url: `/counterparties/check_company?inn=${inn}${kpp ? `&kpp=${kpp}` : ""}`,
        method: "GET",
      }),
    }),
    addСounterpartyById: build.mutation({
      query: (data) => ({
        url: `${COUNTERPARTIES_URL}/create_by_id`,
        method: "POST",
        body: data,
      }),
    }),
    createCounterparty: build.mutation({
      query: (data) => ({
        url: `${COUNTERPARTIES_URL}/create`,
        method: "POST",
        body: Object.fromEntries(data.entries()),
      }),
    }),
    getCounterpartyInfo: build.query({
      query: (id) => ({
        url: `${COUNTERPARTIES_URL}/${id}/details`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["counterparty"],
    }),

    switchCounterpartyStopList: build.mutation({
      query: (companyId) => ({
        url: `/companies/${companyId}/stop_list/change`,
        method: "PATCH",
      }),
      providesTags: ["counterparty"],
    }),
    switchCounterpartyHidden: build.mutation({
      query: (companyId) => ({
        url: `/companies/${companyId}/activity/change`,
        method: "PATCH",
      }),
      providesTags: ["counterparty"],
    }),
    switchCounterpartyStatistic: build.mutation({
      query: (companyId) => ({
        url: `/companies/${companyId}/statistic_exclusion`,
        method: "PATCH",
      }),
      providesTags: ["counterparty"],
    }),
  }),
});
export const {
  useCheckCounterpartyMutation,
  useGetCounterpartiesInfiniteQuery,
  useRemoveRiskBadgeMutation,
  useAddСounterpartyByIdMutation,
  useCreateCounterpartyMutation,
  useGetCounterpartyInfoQuery,
  useSwitchCounterpartyStopListMutation,
  useSwitchCounterpartyHiddenMutation,
  useSwitchCounterpartyStatisticMutation,
} = counterpartiesApiActions;
