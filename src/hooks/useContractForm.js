import { useState, useCallback } from 'react';
import dayjs from 'dayjs';

export const useContractForm = () => {
    const [form, setForm] = useState({
        // Основная информация
        id: '', // id договора
        company_id: '', // id заказчика
        company_details_id: '', // банковские реквизиты заказчика
        partnership_id: '', // id поствщика
        partnership_details_id: '', // банковские реквизиты поставщика,
        contract_template: '', //  id шаблона (из параметров)
        without_template: 0, //типовой или нет
        number: '', // номер договора
        prefix: '', // префикс договора
        date: '', // дата договора
        expired_date: '', // дата окончания договора
        company_signature_id: '', // подписант заказчика
        partnership_signature_id: null, //
        label: '', // ярлык
    });
    // const [errors, setErrors] = useState({});
    // const setError = useCallback((key, value) => {
    //     setErrors((prev) => ({ ...prev, [key]: value }));
    // }, []);
    // const getErrors = useCallback(() => errors, [errors]);
    // const hasErrors = useCallback(() => {
    //     return Object.values(errors).some((err) => err === false);
    // }, [errors]);
    const setField = useCallback((key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    }, []);

    const getFormData = useCallback(() => {
        const cleaned = Object.entries(form).reduce((acc, [key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {});

        if (cleaned.date) {
            cleaned.date = dayjs(cleaned.date).format('YYYY-MM-DD');
        }
        if (cleaned.expired_date) {
            cleaned.expired_date = dayjs(cleaned.expired_date).format(
                'YYYY-MM-DD'
            );
        }

        return cleaned;
    }, [form]);

    return {
        form,
        setField,
        getFormData,
        // hasErrors,
        // getErrors,
        // setError,
    };
};
