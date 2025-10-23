import { createSlice } from '@reduxjs/toolkit';

const empityBaseRate = {
    id: null,
    name: '',
    label: '',
    unit: 'Ед',
    okei: '',
    client_bit: '',
    worker_bit: '',
};
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
    rateChanged: [],
    baseRates: [],
    priceRates: [],
};

export const ratesSlice = createSlice({
    name: 'rates',
    initialState,
    reducers: {
        setAllDataRate: (state, actions) => {
            state.allDataRate = actions.payload;
            state.rateChanged = [];
        },

        setBaseRates: (state, actions) => {
            state.baseRates = actions.payload;
        },
        setPriceRates: (state, actions) => {
            state.priceRates = actions.payload;
        },

        addEmpityBaseRate: (state) => {
            const max =
                state.baseRates.length > 0
                    ? state.baseRates?.reduce((acc, curr) =>
                          acc.id > curr.id ? acc : curr
                      )
                    : false;
            const id = max ? max.id + 1 : 1;
            state.baseRates = [...state.baseRates, { ...empityBaseRate, id }];
        },

        addEmpityPriceRate: (state) => {
            const max =
                state.priceRates.length > 0
                    ? state.priceRates?.reduce((acc, curr) =>
                          acc.id > curr.id ? acc : curr
                      )
                    : false;
            const id = max ? max.id + 1 : 1;
            state.priceRates = [
                ...state.priceRates,
                { ...empityPriceRate, id },
            ];
        },

        editBaseRate: (state, actions) => {
            const { id, key, value } = actions.payload;

            state.baseRates = state.baseRates.map((item) =>
                item.id == id
                    ? {
                          ...item,
                          [`${key}`]: value,
                      }
                    : item
            );

            if (
                JSON.stringify(state.allDataRate.basic_rates) !==
                JSON.stringify(state.baseRates)
            ) {
                state.rateChanged = state.rateChanged.includes('baseRates')
                    ? [...state.rateChanged]
                    : [...state.rateChanged, 'baseRates'];
            } else {
                state.rateChanged = state.rateChanged.filter(
                    (el) => el !== 'baseRates'
                );
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
                JSON.stringify(state.allDataRate.price_list) !==
                JSON.stringify(state.priceRates)
            ) {
                state.rateChanged = state.rateChanged.includes('priceRates')
                    ? [...state.rateChanged]
                    : [...state.rateChanged, 'priceRates'];
            } else {
                state.rateChanged = state.rateChanged.filter(
                    (el) => el !== 'priceRates'
                );
            }
        },

        deleteBaseRate: (state, actions) => {
            state.baseRates = [...state.baseRates].filter(
                (el) => el.id !== actions.payload
            );
        },

        deletePriceRate: (state, actions) => {
            state.priceRates = [...state.priceRates].filter(
                (el) => el.id !== actions.payload
            );
        },
    },
});

export const {
    setAllDataRate,
    setBaseRates,
    setPriceRates,
    addEmpityBaseRate,
    addEmpityPriceRate,
    editBaseRate,
    editPriceRates,
    deleteBaseRate,
    deletePriceRate,
} = ratesSlice.actions;
export default ratesSlice.reducer;
