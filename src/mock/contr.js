export const approvedCounterparties = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    inn: `77012${(34567 + i).toString().padStart(5, '0')}`,
    kpp: `77010${(100 + i).toString().padStart(3, '0')}`,
    name: `ООО "Рога и Копытаwwwwwwwwwwwwwwwwww №${i + 1}"`,
    label: `Ярлык контрагента №${i + 1}`,
    okved: `78.${(30 + (i % 10)).toString().padStart(2, '0')}.00`,
    share_of_partnership_revenue: +(Math.random() * 20).toFixed(1),
    revenue: 500000 + i * 10000,
    notes: `Примечание для компании №${i + 1}. Длинный текст с описанием, который может быть обрезанДлинный текст с описанием, который может быть обрезанДлинный текст с описанием, который может быть обрезан`,
    status: i % 3 === 0 ? 'ACTIVE' : i % 3 === 1 ? 'REORGANIZING' : 'BANKRUPT',
    employee_count: 30 + (i % 15) * 5,
    is_hidden: i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 0,
    filling: i % 3 === 0 ? 50 : i % 3 === 1 ? 100 : 61,
}));
export const notApprovedCounterparties = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `ООО "Рога и Копыта №${i + 1}"`,
    label: `Ярлык контрагента №${i + 1}`,
    notes: `Примечание для компании №${i + 1}. Длинный текст с описанием, который может быть обрезан...`,
    inn: i % 4 === 0 ? null : `77012${(34567 + i).toString().padStart(5, '0')}`,
    kpp: i % 4 === 0 ? null : `77010${(100 + i).toString().padStart(3, '0')}`,
}));
