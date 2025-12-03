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
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (build) => ({
    //ДЕТАЛКА КОНТРАГЕНТА
    getCounterpartyInfo: build.query({
      query: ({ counterpartyId }) => ({
        url: `${COUNTERPARTIES_URL}/${counterpartyId}/details`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["counterparty"],
    }),

    //УДАЛЕНИЕ КОНТРАГЕНТА
    checkDeleteCounterparty: build.query({
      query: ({ companyId }) => ({
        url: `${COUNTERPARTIES_URL}/${companyId}/check_delete`,
        method: "GET",
      }),
    }),

    deleteCounterpaty: build.mutation({
      query: ({ companyId }) => ({
        url: `${COUNTERPARTIES_URL}/${companyId}/delete`,
        method: "DELETE",
      }),
    }),
    hideCounterparty: build.mutation({
      query: ({ companyId }) => ({
        url: `${COUNTERPARTIES_URL}/${companyId}/hidden`,
        method: "PATCH",
      }),
      invalidatesTags: ['counterparty']
    }),

    //ЗАГРУЗКА ЛОГОТИПА
    uploadLogo: build.mutation({
      query: ({ companyId, data }) => ({
        url: `${COUNTERPARTIES_URL}/${companyId}/logo`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['counterparty']
    }),

    //ВКЛАДКА GENERAL
    sentReport: build.mutation({
      query: ({ companyId, data }) => ({
        url: `${COUNTERPARTIES_URL}/${companyId}/remark`,
        method: "POST",
        body: data,
      }),
    }),

    switchCounterpartyStopList: build.mutation({
      query: (companyId) => ({
        url: `/companies/${companyId}/stop_list/change`,
        method: "PATCH",
      }),
      invalidatesTags: ["counterparty"],
    }),
    switchCounterpartyHidden: build.mutation({
      query: (companyId) => ({
        url: `/companies/${companyId}/activity/change`,
        method: "PATCH",
      }),
      invalidatesTags: ["counterparty"],
    }),
    switchCounterpartyStatistic: build.mutation({
      query: (companyId) => ({
        url: `/companies/${companyId}/statistic_exclusion`,
        method: "PATCH",
      }),
      invalidatesTags: ["counterparty"],
    }),

    updateNote: build.mutation({
      query: ({ companyId, data }) => ({
        url: `${COUNTERPARTIES_URL}/${companyId}/change_notes`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),

    //ВКЛАДКА РЕКВИЗИТЫ
    getCounterparyRequisites: build.query({
      query: (id) => ({
        url: `${COUNTERPARTIES_URL}/${id}/requisites`,
        method: "GET",
      }),
      providesTags: ['requisites'],
      transformResponse: (response) => response.data,
    }),
    updateCounterpartyRequisites: build.mutation({
      query: ({ id, data }) => ({
        url: `${COUNTERPARTIES_URL}/${id}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["requisites"],
    }),

    //ВКЛАДКА ПРАЙСЛИСТ
    updatePriceList: build.mutation({
      query: ({ companyId, data }) => ({
        url: `companies/${companyId}/price_list/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),

    //ВКЛАДКА КОНТАКТЫ
    switchContactStatus: build.mutation({
      query: ({ companyId, contactId }) => ({
        url: `/companies/${companyId}/contacts/${contactId}/change-active`,
        method: "PATCH",
      }),
      invalidatesTags: ['counterparty']
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
      query: ({ accountId }) => ({
        url: `/companies/accounts/${accountId}/change_default`,
        method: "PATCH",
      }),
      invalidatesTags: ["counterparty"],
    }),
    createBankAccount: build.mutation({
      query: ({ data }) => ({
        url: `/companies/accounts/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),
    updateBankAccount: build.mutation({
      query: ({ accountId, data }) => ({
        url: `/companies/accounts/${accountId}/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),
    deleteBankAccount: build.mutation({
      query: ({ accountId }) => ({
        url: `/companies/accounts/${accountId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["counterparty"],
    }),

    //ВКЛАДКА ОБЪЕКТЫ
    createObject: build.mutation({
      query: ({ companyId, data }) => ({
        url: `counterparties/${companyId}/create_enterprise`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),
    updateObject: build.mutation({
      query: ({ objectId, data }) => ({
        url: `counterparties/update_enterprise/${objectId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),
    deleteObject: build.mutation({
      query: ({ objectId }) => ({
        url: `counterparties/delete_enterprise/${objectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["counterparty"],
    }),

    //ВКЛАДКА ДРУГОЕ
    updateOther: build.mutation({
      query: ({ companyId, data }) => ({
        url: `${COUNTERPARTIES_URL}/${companyId}/others`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["counterparty"],
    }),
  }),
});

export const {
  // ДЕТАЛКА КОНТРАГЕНТА
  useGetCounterpartyInfoQuery,
  useSentReportMutation,
  useUploadLogoMutation,

  //УДАЛЕНИЕ КОНТРАГЕНТА
  useDeleteCounterpatyMutation,
  useCheckDeleteCounterpartyQuery,
  useHideCounterpartyMutation,

  // ВКЛАДКА GENERAL
  useSwitchCounterpartyStopListMutation,
  useSwitchCounterpartyHiddenMutation,
  useSwitchCounterpartyStatisticMutation,
  useUpdateNoteMutation,

  // ВКЛАДКА РЕКВИЗИТЫ
  useGetCounterparyRequisitesQuery,
  useUpdateCounterpartyRequisitesMutation,

  //ПРАЙСЛИСТ
  useUpdatePriceListMutation,

  // ВКЛАДКА КОНТАКТЫ
  useSwitchContactStatusMutation,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,

  // ВКЛАДКА БАНКОВСКИЕ СЧЕТА
  useSwitchBankAccountStatusMutation,
  useCreateBankAccountMutation,
  useUpdateBankAccountMutation,
  useDeleteBankAccountMutation,

  // ВКЛАДКА ОБЪЕКТЫ
  useCreateObjectMutation,
  useUpdateObjectMutation,
  useDeleteObjectMutation,

  // ВКЛАДКА ДРУГОЕ
  useUpdateOtherMutation,
} = counterpartyDetailsApiActions;
