const getCustomStyles = (hasError) => ({
  control: (base, state) => ({
    ...base,
    maxWidth: '100%',
    width: '100%',
    backgroundColor: '#fff',
    borderColor: hasError ? '#E10D0D' : state.isFocused ? '#002cfb' : '#e0e5f2',
    boxShadow: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    height: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      borderColor: hasError ? '#E10D0D' : '#002cfb',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    minHeight: '40px',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingRight: '32px',
  }),
  placeholder: (base) => ({
    ...base,
    display: 'none',
  }),

  singleValue: (base) => ({
    ...base,
    color: '#121922',
    fontSize: '14px',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    marginTop: '4px',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#F8FAFD' : '#fff',
    color: '#121922',
    padding: '10px 12px',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#e6f0ff',
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#002CFB',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
    transformOrigin: 'center',
    '&:hover': {
      color: '#002CFB',
    },
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),
});

export default getCustomStyles;
