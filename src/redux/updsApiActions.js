import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = document
  .getElementById("root_reconciliation")
  ?.getAttribute("token");
const baseURL = process.env.REACT_APP_BASE_URL;

export const updsApiActions = createApi({
  reducerPath: "updsApiActions",
  tagTypes: ["Upd", "Upds"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
      Accept: "application/json",
    },
  }),
  endpoints: (build) => ({
    getUpds: build.query({
      query: (params) => ({
        url: `act-reconciliation`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["Upds"],
    }),

    getUpd: build.query({
      query: (id) => ({
        url: `act-reconciliation/detail/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["Upd"],
    }),

    getParameters: build.query({
      query: () => ({
        url: `parameters`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
    }),

    createUpd: build.mutation({
      query: (body) => ({
        url: `act-reconciliation/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Upds", "Upd"],
    }),

    updateUpd: build.mutation({
      query: ({ body, id }) => ({
        url: `act-reconciliation/update/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Upds"],
    }),

    deleteUpd: build.mutation({
      query: (id) => ({
        url: `act-reconciliation/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Upds"],
    }),

    sendUpd: build.mutation({
      query: ({ body, id }) => ({
        url: `act-reconciliation/send/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Upds"],
    }),

    getUpdDownload: build.mutation({
      query: ({ id, params }) => ({
        url: `act-reconciliation/download/${id}`,
        method: "GET",
        params,
        responseHandler: (response) => {
          return response.blob();
        },
      }),
    }),

    getUpdDownloadMass: build.mutation({
      query: ({ params }) => ({
        url: `act-reconciliation/download`,
        method: "GET",
        params,
        responseHandler: (response) => {
          return response.blob();
        },
      }),
    }),

    sendOriginalUpd: build.mutation({
      query: ({ body, id }) => ({
        url: `act-reconciliation/send_original/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Upd"],
    }),

    signOriginalUpd: build.mutation({
      query: ({ body, id }) => ({
        url: `act-reconciliation/sign_original/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Upd"],
    }),

    unmarkUpd: build.mutation({
      query: ({ body, id }) => ({
        url: `act-reconciliation/unmark/${id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Upd"],
    }),
  }),
});

export const {
  useGetUpdsQuery,
  useGetUpdQuery,
  useGetParametersQuery,
  useCreateUpdMutation,
  useUpdateUpdMutation,
  useDeleteUpdMutation,
  useSendUpdMutation,
  useGetUpdDownloadMutation,
  useGetUpdDownloadMassMutation,
  useSendOriginalUpdMutation,
  useSignOriginalUpdMutation,
  useUnmarkUpdMutation,
} = updsApiActions;
