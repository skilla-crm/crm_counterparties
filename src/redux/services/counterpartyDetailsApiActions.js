import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = document
  .getElementById("root_counterparties")
  ?.getAttribute("token");
const COUNTERPARTIES_URL = "/counterparties";

export const counterpartyDetailsApiActions = createApi({
  reducerPath: "counerpartyDetailsApiActions",
  tagTypes: ["counterparty"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      if (token) headers.set("Authorization", token);

      return headers;
    },
  }),
  endpoints: (build) => ({
    //ДЕТАЛКА КОНТРАГЕНТА
    getCounterpartyInfo: build.query({
      query: (id) => ({
        url: `${COUNTERPARTIES_URL}/${id}/details`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["counterparty"],
    }),
    getCounterparyRequisites: build.query({
      query: (id) => ({
        url: `${COUNTERPARTIES_URL}/${id}/requisites`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    updateCounterpartyRequisites: build.mutation({
      query: ({ id, data }) => ({
        url: `${COUNTERPARTIES_URL}/${id}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),

    //ВКЛАДКА GENERAL

    sentReport: build.mutation({
      query: ({ companyId, data }) => ({
        url: `${COUNTERPARTIES_URL}/${companyId}/remark`,
        method: "POST",
        body: data,
      }),
    }),
    upploadLogo: build.mutation({
      query: ({ companyId, data }) => ({
        url: `${COUNTERPARTIES_URL}/${companyId}/logo`,
        method: "POST",
        body: data,
      }),
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

    //ВКЛАДКА КОНТАКТЫ
    switchContactStatus: build.mutation({
      query: ({ companyId, contactId }) => ({
        url: `/companies/${companyId}/contacts/${contactId}/change-active`,
        method: "PATCH",
      }),
    }),
    createContact: build.mutation({
      query: ({ companyId, data }) => ({
        url: `/companies/${companyId}/contacts/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),
    updateContact: build.mutation({
      query: ({ companyId, contactId, data }) => ({
        url: `/companies/${companyId}/contacts/${contactId}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),
    deleteContact: build.mutation({
      query: ({ companyId, contactId }) => ({
        url: `/companies/${companyId}/contacts/${contactId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["counterparty"],
    }),

    //ВКЛАДКА БАНКОВСКИЕ СЧЕТА
    switchBankAccountStatus: build.mutation({
      query: ({ companyId, accountId }) => ({
        url: `/companies/${companyId}/bank-accounts/${accountId}/change-active`,
        method: "PATCH",
      }),
    }),

    //ВКЛАДКА ОБЪЕКТЫ
    switchObjectStatus: build.mutation({
      query: ({ companyId, objectId }) => ({
        url: `/companies/${companyId}/objects/${objectId}/change-active`,
        method: "PATCH",
      }),
    }),
    createObject: build.mutation({
      query: ({ companyId, data }) => ({
        url: `/companies/${companyId}/objects/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),
  }),
});
export const {
  useGetCounterpartyInfoQuery,
  useSwitchCounterpartyStopListMutation,
  useSwitchCounterpartyHiddenMutation,
  useSwitchCounterpartyStatisticMutation,
  useGetCounterparyRequisitesQuery,
  useUpdateCounterpartyRequisitesMutation,
  useSwitchContactStatusMutation,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useSwitchBankAccountStatusMutation,
  useSwitchObjectStatusMutation,
  useCreateObjectMutation,
  useSentReportMutation,
  useUpploadLogoMutation,
} = counterpartyDetailsApiActions;
