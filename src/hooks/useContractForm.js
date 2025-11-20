import { useState, useCallback } from 'react';
import dayjs from 'dayjs';

export const useContractForm = () => {
    const [form, setForm] = useState({
        // Основная информация

        company_id: '', // id заказчика
        company_details_id: null, // банковские реквизиты заказчика
        partnership_id: '', // id поствщика
        partnership_details_id: null, // банковские реквизиты поставщика,
        contract_template_id: '', //  id шаблона (из параметров)
        without_template: 0, //типовой или нет
        number: '', // номер договора
        date: '', // дата договора
        expired_date: null, // дата окончания договора
        company_signature_id: null, // подписант заказчика
        partnership_signature_id: null, // подписант поставщика
        docs: [], //документы в режиме создания
    });

    const setField = useCallback((key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    }, []);

    const getFormData = useCallback(
        (excludeKeys = []) => {
            const cleaned = { ...form };

            // Если выставлен "без шаблона" — обнуляем id шаблона
            if (form.without_template) {
                cleaned.contract_template_id = null;
            }

            // Форматирование дат
            if (cleaned.date && dayjs(cleaned.date).isValid()) {
                cleaned.date = dayjs(cleaned.date).format('YYYY-MM-DD');
            }
            if (cleaned.expired_date && dayjs(cleaned.expired_date).isValid()) {
                cleaned.expired_date = dayjs(cleaned.expired_date).format(
                    'YYYY-MM-DD'
                );
            }

            // Приведение id к числам и очистка пустых
            const idKeys = [
                'company_id',
                'company_details_id',
                'partnership_id',
                'partnership_details_id',
                'company_signature_id',
                'partnership_signature_id',
                'contract_template_id',
            ];

            Object.keys(cleaned).forEach((key) => {
                const isSignature =
                    key === 'company_signature_id' ||
                    key === 'partnership_signature_id';

                if (
                    !isSignature &&
                    (cleaned[key] === null ||
                        cleaned[key] === undefined ||
                        cleaned[key] === false)
                ) {
                    cleaned[key] = '';
                }
            });

            excludeKeys.forEach((key) => delete cleaned[key]);
            return cleaned;
        },
        [form]
    );

    return {
        form,
        setField,
        getFormData,
        // hasErrors,
        // getErrors,
        // setError,
    };
};
