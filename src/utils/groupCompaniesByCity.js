// utils/groupCompanies.js
export const groupCompaniesByCity = (companiesList) => {
  return companiesList.reduce((acc, company) => {
    const city = company.city || 'Без города';
    if (!acc[city]) acc[city] = [];
    acc[city].push({
      id: company.id,
      name: company.name,
      inn: company.inn,
      kpp: company.kpp,
      bank: company.bank,
      rs: company.rs,
      ogrn: company?.ogrn,
      label: company?.label,
    });
    return acc;
  }, {});
};

export default groupCompaniesByCity;
