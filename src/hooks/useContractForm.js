import { useState, useCallback } from "react";
import dayjs from "dayjs";

export const useContractForm = () => {
  const [form, setForm] = useState({
    // Основная информация

    company_id: "", // id заказчика
    company_details_id: "", // банковские реквизиты заказчика
    partnership_id: "", // id поствщика
    partnership_details_id: "", // банковские реквизиты поставщика,
    contract_template_id: "", //  id шаблона (из параметров)
    without_template: 0, //типовой или нет
    number: "", // номер договора

    date: "", // дата договора
    expired_date: "", // дата окончания договора
    company_signature_id: "", // подписант заказчика
    partnership_signature_id: "", //
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

  const getFormData = useCallback(
    (excludeKeys = []) => {
      const cleaned = { ...form };

      // Если выбран "без шаблона" — очищаем id шаблона
      if (form.without_template) {
        cleaned.contract_template_id = "";
      }

      // Форматируем даты, если заданы
      if (cleaned.date && dayjs(cleaned.date).isValid()) {
        cleaned.date = dayjs(cleaned.date).format("YYYY-MM-DD");
      }
      if (cleaned.expired_date && dayjs(cleaned.expired_date).isValid()) {
        cleaned.expired_date = dayjs(cleaned.expired_date).format("YYYY-MM-DD");
      }

      // Гарантируем, что пустые поля станут ""
      Object.keys(cleaned).forEach((key) => {
        if (
          cleaned[key] === null ||
          cleaned[key] === undefined ||
          cleaned[key] === false
        ) {
          cleaned[key] = "";
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
