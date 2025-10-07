import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = document
  .getElementById("root_counterparties")
  ?.getAttribute("token");
const baseURL = process.env.REACT_APP_BASE_URL;

export const counterpartiesApiActions = createApi({
  reducerPath: "counterpartiesApiActions",
  tagTypes: ["List", "Detail"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
      Accept: "application/json",
    },
  }),
  endpoints: (build) => ({
    
  }),
});

export const {

} = counterpartiesApiActions;
