import { createSlice } from '@reduxjs/toolkit';
const positionSample = { rate: {}, count: 1, units: 'Ед', code: '642', price: '', total: '' }

const initialState = {
  positions: [{ id: 1, rate: {}, count: 1, units: 'Ед', code: '642', price: '', total: '' }],
  total: 0
};

export const positionsSlice = createSlice({
  name: 'positionsSlice',
  initialState,
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload;
    },

    setAddPosition: (state) => {
      const max = state.positions.reduce((acc, curr) => acc.id > curr.id ? acc : curr)
      const id = max.id + 1;
      state.positions = [...state.positions, { id, ...positionSample }];
    },

    setDeletePosition: (state, action) => {
      state.positions = state.positions.filter(el => el.id !== action.payload)
    },

    setPositionValues: (state, action) => {
      const data = { ...action.payload }
      const key = data.key;
      const item = state.positions.find(el => el.id === data.id)
      let modifyItem = { ...item }

      if (key === 'rate' && data.rate.okei) {
        modifyItem = { ...item, [key]: data[key], units: data.rate.unit, code: data.rate.okei}
      } else if (key === 'rate' && !data.rate.okei) {
        modifyItem = { ...item, [key]: data[key], units: 'Ед', code: '642'}
      } else if (key === 'count' && item.price !== '') {
        modifyItem = { ...item, [key]: data[key], total: item.price * data[key] !== 0 ? item.price * data[key] : 0 }
      } else if (key === 'price') {
        modifyItem = { ...item, [key]: data[key], total: item.count * data[key] !== 0 ? item.count * data[key] : 0 }
      } else if (key === 'total') {
        modifyItem = { ...item, [key]: data[key], price: data[key] / item.count !== 0 ? data[key] / item.count : 0 }
      } else {
        modifyItem = { ...item, [key]: data[key] }
      }


      state.positions = [...state.positions.map(el => {
        if (el.id === data.id) {
          return modifyItem
        } else {
          return el
        }
      })]
    },

    setTotal: (state, action) => {
      state.total = action.payload
    }
  }
});

export const {
  setPositions,
  setAddPosition,
  setDeletePosition,
  setPositionValues,
  setTotal
} = positionsSlice.actions;
export default positionsSlice.reducer;
