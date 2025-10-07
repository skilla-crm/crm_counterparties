const renderOgrn = (data) => {
  if (!data?.ogrn) return null;
  if (data?.inn?.length === 10) return `ОГРН ${data.ogrn}`;
  if (data?.inn?.length === 12) return `ОГРНИП ${data.ogrn}`;
  return null;
};

export default renderOgrn;
