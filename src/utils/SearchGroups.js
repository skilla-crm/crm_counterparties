export const handleSearchGroup = (query, list) => {
  const result = list?.filter((el) => el.name?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);

  if (result?.length >= 1) {
    return result;
  } else {
    return [];
  }
};
