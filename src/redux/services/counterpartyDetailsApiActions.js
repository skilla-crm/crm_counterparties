import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import DeleteCounterpaty from 'components/ModalManager/modals/DeleteCounterparty/DeleteCounterparty';

const token = document
    .getElementById('root_counterparties')
    ?.getAttribute('token');
const COUNTERPARTIES_URL = '/counterparties';

export const counterpartyDetailsApiActions = createApi({
    reducerPath: 'counerpartyDetailsApiActions',
    tagTypes: ['counterparty'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers) => {
            if (token) headers.set('Authorization', token);

            return headers;
        },
    }),
    endpoints: (build) => ({
        //ДЕТАЛКА КОНТРАГЕНТА
        getCounterpartyInfo: build.query({
            query: ({ counterpartyId }) => ({
                url: `${COUNTERPARTIES_URL}/${counterpartyId}/details`,
                method: 'GET',
            }),
            transformResponse: (response) => response.data,
            providesTags: ['counterparty'],
        }),

        //УДАЛЕНИЕ КОНТРАГЕНТА
        checkDeleteCounterparty: build.query({
            query: ({ companyId }) => ({
                url: `${COUNTERPARTIES_URL}/${companyId}/check_delete`,
                method: 'GET',
            }),
        }),

        deleteCounterpaty: build.mutation({
            query: ({ companyId }) => ({
                url: `${COUNTERPARTIES_URL}/${companyId}/delete`,
                method: 'DELETE',
            }),
        }),
        hideCounterparty: build.mutation({
            query: ({ companyId }) => ({
                url: `${COUNTERPARTIES_URL}/${companyId}/hidden`,
                method: 'PATCH',
            }),
        }),

        //ЗАГРУЗКА ЛОГОТИПА
        uploadLogo: build.mutation({
            query: ({ companyId, data }) => ({
                url: `${COUNTERPARTIES_URL}/${companyId}/logo`,
                method: 'POST',
                body: data,
            }),
        }),

        //ВКЛАДКА GENERAL
        sentReport: build.mutation({
            query: ({ companyId, data }) => ({
                url: `${COUNTERPARTIES_URL}/${companyId}/remark`,
                method: 'POST',
                body: data,
            }),
        }),

        switchCounterpartyStopList: build.mutation({
            query: (companyId) => ({
                url: `/companies/${companyId}/stop_list/change`,
                method: 'PATCH',
            }),
            providesTags: ['counterparty'],
        }),
        switchCounterpartyHidden: build.mutation({
            query: (companyId) => ({
                url: `/companies/${companyId}/activity/change`,
                method: 'PATCH',
            }),
            providesTags: ['counterparty'],
        }),
        switchCounterpartyStatistic: build.mutation({
            query: (companyId) => ({
                url: `/companies/${companyId}/statistic_exclusion`,
                method: 'PATCH',
            }),
            providesTags: ['counterparty'],
        }),

        //ВКЛАДКА РЕКВИЗИТЫ
        getCounterparyRequisites: build.query({
            query: (id) => ({
                url: `${COUNTERPARTIES_URL}/${id}/requisites`,
                method: 'GET',
            }),
            transformResponse: (response) => response.data,
        }),
        updateCounterpartyRequisites: build.mutation({
            query: ({ id, data }) => ({
                url: `${COUNTERPARTIES_URL}/${id}/update`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['counterparty'],
        }),

        //ВКЛАДКА КОНТАКТЫ
        switchContactStatus: build.mutation({
            query: ({ companyId, contactId }) => ({
                url: `/companies/${companyId}/contacts/${contactId}/change-active`,
                method: 'PATCH',
            }),
        }),
        createContact: build.mutation({
            query: ({ companyId, data }) => ({
                url: `/companies/${companyId}/contacts/create`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['counterparty'],
        }),
        updateContact: build.mutation({
            query: ({ companyId, contactId, data }) => ({
                url: `/companies/${companyId}/contacts/${contactId}/update`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['counterparty'],
        }),
        deleteContact: build.mutation({
            query: ({ companyId, contactId }) => ({
                url: `/companies/${companyId}/contacts/${contactId}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['counterparty'],
        }),

        //ВКЛАДКА БАНКОВСКИЕ СЧЕТА
        switchBankAccountStatus: build.mutation({
            query: ({ accountId }) => ({
                url: `/companies/accounts/${accountId}/change_default`,
                method: 'PATCH',
            }),
            invalidatesTags: ['counterparty'],
        }),
        createBankAccount: build.mutation({
            query: ({ data }) => ({
                url: `/companies/accounts/create`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['counterparty'],
        }),
        updateBankAccount: build.mutation({
            query: ({ accountId, data }) => ({
                url: `/companies/accounts/${accountId}/update`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['counterparty'],
        }),
        deleteBankAccount: build.mutation({
            query: ({ accountId }) => ({
                url: `/companies/accounts/${accountId}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['counterparty'],
        }),

        //ВКЛАДКА ОБЪЕКТЫ
        createObject: build.mutation({
            query: ({ companyId, data }) => ({
                url: `/companies/${companyId}/create_enterprise`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['counterparty'],
        }),
        updateObject: build.mutation({
            query: ({ companyId, objectId, data }) => ({
                url: `/companies/${companyId}/enterprises/${objectId}/update`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['counterparty'],
        }),

        //ВКЛАДКА ДРУГОЕ
        updateOther: build.mutation({
            query: ({ companyId, data }) => ({
                url: `${COUNTERPARTIES_URL}/${companyId}/others`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['counterparty'],
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

    // ВКЛАДКА РЕКВИЗИТЫ
    useGetCounterparyRequisitesQuery,
    useUpdateCounterpartyRequisitesMutation,

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

    // ВКЛАДКА ДРУГОЕ
    useUpdateOtherMutation,
} = counterpartyDetailsApiActions;
