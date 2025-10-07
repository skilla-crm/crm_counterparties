const row = {
  date: '',
  transactions: [{ id: 10, amount: 15000, type: 'outcome', goal: 'ПП72 Текст назначения платежа' }],
  purchases: [],
  list: [
    {
      upds: [],
      orders: [],
    },
    {
      upds: [],
      orders: [],
    },
    {
      upds: [],
      orders: [],
    },
  ],
};

const row2 = {
  upds: [{ amount: 1000, number: 999 }],
  orders: [{ date: '01.01.2022', amount: 1000 }],

  transactions: [
    {
      id: 10,
      amount: 15000,
      type: 'income',
      goal: 'ПП72 Текст назначения платежа',
    },
    {
      id: 11,
      amount: 5,
      type: 'income',
      goal: 'ПП72 Текст назначения платеа',
    },
    {
      id: 12,
      amount: 15000,
      type: 'income',
    },
    {
      id: 13,
      amount: 5000,
      type: 'outcome',
      goal: 'ПП72 Текст назначения платежа',
    },
  ],
  purchases: [
    { amount: 15000, number: 3999 },
    { amount: 15000, number: 3999 },
    { amount: 15000, number: 3999 },
  ],
};
const row3 = {
  upds: [],
  orders: [{ date: '01.01.2022', amount: 1000 }],

  transactions: [
    {
      id: 10,
      amount: 15000,
      type: 'income',
      goal: 'ПП72 Текст назначения платежа',
    },
    {
      id: 11,
      amount: 5,
      type: 'income',
      goal: 'ПП72 Текст назначения платеа',
    },
    {
      id: 12,
      amount: 15000,
      type: 'income',
    },
    {
      id: 13,
      amount: 5000,
      type: 'outcome',
      goal: 'ПП72 Текст назначения платежа',
    },
  ],
  purchases: [
    { amount: 15000, number: 3999 },
    { amount: 15000, number: 3999 },
    { amount: 15000, number: 3999 },
  ],
};

export const data = [
  {
    id: 1,
    date: '44.05.2025',
    transactions: [
      {
        id: 13,
        amount: 5000,
        type: 'outcome',
        goal: 'ПП72 Текст назначения платежа',
      },
    ],
    purchases: [
      { amount: 15000, number: 3999 },
      { amount: 15000, number: 3999 },
      { amount: 15000, number: 3999 },
    ],
    list: [
      {
        upds: [{ amount: 1000, number: 999, id: 1461955 }],
        orders: [{ date: '01.01.2022', amount: 1000, id: 3889554 }],
      },
    ],
  },
  {
    id: 2,
    date: '02.02.2022',
    transactions: [
      {
        id: 13,
        amount: 5000,
        type: 'income',
        goal: 'ПП72 Текст назначения платежа',
      },
    ],
    purchases: [
      { amount: 15000, number: 3999 },
      { amount: 15000, number: 3999 },
    ],
    list: [
      {
        upds: [
          { amount: 1000, number: 999, id: 1461973 },
          { amount: 1000, number: 995, id: 1461973 },
          { amount: 1000, number: 996, id: 1461973 },
        ],
        orders: [{ date: '01.01.2022', amount: 1000, id: 3889554 }],
      },
      {
        upds: [{ amount: 1000, number: 998 }],
        orders: [{ date: '01.01.2022', amount: 1000 }],
      },
    ],
  },
  {
    id: 3,
    date: '15.07.2022',
    transactions: [
      {
        id: 13,
        amount: 5000,
        type: 'outcome',
        goal: 'ПП72 Текст назначения платежа',
      },
    ],
    purchases: [
      { amount: 15000, number: 3999 },
      { amount: 15000, number: 3999 },
      { amount: 15000, number: 3999 },
    ],
    list: [
      {
        upds: [
          { amount: 1000, number: 9992, id: 1461973 },
          { amount: 1000, number: 9991, id: 1461955 },
        ],
        orders: [
          { date: '01.01.2022', amount: 1000, id: 3889554 },
          { date: '01.01.2022', amount: 1000, id: 3889554 },
          { date: '01.01.2022', amount: 1000, id: 3889554 },
          { date: '01.01.2022', amount: 1000, id: 3889554 },
          { date: '01.01.2022', amount: 1000, id: 3889554 },
          { date: '01.01.2022', amount: 1000, id: 3889554 },
        ],
        acts: [],
      },
      {
        upds: [{ amount: 1000, number: 999, id: 1461955 }],
        orders: [{ date: '01.01.2022', amount: 1000, id: 3889554 }],
      },
    ],
  },
  {
    id: 4,
    date: '08.09.2022',
    transactions: [
      {
        id: 13,
        amount: 5000,
        type: 'outcome',
        goal: 'ПП72 Текст назначения платежа',
      },
      {
        id: 13,
        amount: 200,
        type: 'income',
        goal: 'ПП72 Текст назначения платежа',
      },
    ],
    purchases: [
      { amount: 15000, number: 3999 },
      { amount: 15000, number: 3999 },
      { amount: 15000, number: 3999 },
    ],
    list: [
      {
        upds: [],
        orders: [{ date: '01.01.2022', amount: 1000, id: 3889554 }],
      },
    ],
  },
  {
    id: 5,
    date: '08.09.2027',
    transactions: [
      {
        id: 13,
        amount: 5000,
        type: 'outcome',
        goal: 'ПП72 Текст назначения платежа',
      },
      {
        id: 13,
        amount: 200,
        type: 'income',
        goal: 'ПП72 Текст назначения платежа',
      },
    ],
    purchases: [
      { amount: 15000, number: 3999 },
      { amount: 15000, number: 3999 },
      { amount: 15000, number: 3999 },
    ],
    list: [
      {
        upds: [{ amount: 1000, number: 999 }],
        orders: [],
      },
    ],
  },
  {
    id: 6,
    date: '08.09.2027',
    transactions: [
      {
        id: 13,
        amount: 5000,
        type: 'outcome',
        goal: 'ПП72 Текст назначения платежа',
      },
      {
        id: 13,
        amount: 200,
        type: 'income',
        goal: 'ПП72 Текст назнаПП72 Текст назначения платежаПП72 Текст назначения платежаПП72 Текст назначения платежаПП72 Текст назначения платежачения платежа',
      },
    ],
    purchases: [],
    list: [
      {
        upds: [],
        orders: [],
      },
    ],
  },
];
