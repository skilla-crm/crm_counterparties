import { createSlice } from '@reduxjs/toolkit';

const empityPriceRate = {
    id: null,
    name: '',
    unit: 'Ед',
    min_time: 1,
    client_bit: '',
    worker_bit: '',
};

const initialState = {
    allDataRate: {},
    rateChanged: false,
    priceRates: [],
};

export const ratesContractSlice = createSlice({
    name: 'ratesContract',
    initialState,
    reducers: {
        setAllDataRate: (state, actions) => {
            state.allDataRate = actions.payload;
            state.rateChanged = false;
        },

        setPriceRates: (state, actions) => {
            state.priceRates = actions.payload;
        },

        addEmpityPriceRate: (state) => {
            const max =
                state.priceRates.length > 0
                    ? state.priceRates?.reduce((acc, curr) =>
                          acc.id > curr.id ? acc : curr
                      )
                    : false;
            const id = max ? `new${max.id + 1}` : `new1`;
            state.priceRates = [
                ...state.priceRates,
                { ...empityPriceRate, id },
            ];

            if (
                JSON.stringify(state.allDataRate.individual_pricelist) !==
                JSON.stringify(state.priceRates)
            ) {
                state.rateChanged = true;
            } else {
                state.rateChanged = false;
            }
        },

        editPriceRates: (state, actions) => {
            const { id, key, value } = actions.payload;

            state.priceRates = state.priceRates.map((item) =>
                item.id == id
                    ? {
                          ...item,
                          [`${key}`]: value,
                      }
                    : item
            );

            if (
                JSON.stringify(state.allDataRate.individual_pricelist) !==
                JSON.stringify(state.priceRates)
            ) {
                state.rateChanged = true;
            } else {
                state.rateChanged = false;
            }
        },

        deletePriceRate: (state, actions) => {
            state.priceRates = [...state.priceRates].filter(
                (el) => el.id != actions.payload
            );

            if (
                JSON.stringify(state.allDataRate.individual_pricelist) !==
                JSON.stringify(state.priceRates)
            ) {
                state.rateChanged = true;
            } else {
                state.rateChanged = false;
            }
        },

        resetRateChanged: (state) => {
            state.rateChanged = false;
        },

        resetRates: (state) => {
            state.priceRates = state.allDataRate.individual_pricelist;
        },
    },
});

export const {
    setAllDataRate,
    setPriceRates,
    addEmpityPriceRate,
    editPriceRates,
    deletePriceRate,
    resetRateChanged,
    resetRates,
} = ratesContractSlice.actions;
export default ratesContractSlice.reducer;
