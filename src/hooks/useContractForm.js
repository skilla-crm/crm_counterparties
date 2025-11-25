import { useState, useCallback } from "react";
import dayjs from "dayjs";
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (err) => reject(err);
  });
export const useContractForm = () => {
  const [form, setForm] = useState({
    // Основная информация

    company_id: "", // id заказчика
    company_details_id: null, // банковские реквизиты заказчика
    partnership_id: "", // id поствщика
    partnership_details_id: null, // банковские реквизиты поставщика,
    contract_template_id: null, //  id шаблона (из параметров)
    without_template: 0, //типовой или нет
    number: "", // номер договора
    date: "", // дата договора
    expired_date: null, // дата окончания договора
    company_signature_id: null, // подписант заказчика
    partnership_signature_id: null, // подписант поставщика
    docs: [], //документы в режиме создания
  });

  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const getFormData = useCallback(() => {
    const cleaned = { ...form };

    // Если без шаблона — шаблон = null
    if (cleaned.without_template) {
      cleaned.contract_template_id = null;
    }

    // Форматирование даты
    if (cleaned.date && dayjs(cleaned.date).isValid()) {
      cleaned.date = dayjs(cleaned.date).format("YYYY-MM-DD");
    }

    if (cleaned.expired_date && dayjs(cleaned.expired_date).isValid()) {
      cleaned.expired_date = dayjs(cleaned.expired_date).format("YYYY-MM-DD");
    }

    const formData = new FormData();

    // Обычные поля
    Object.entries(cleaned).forEach(([key, value]) => {
      if (key === "docs") return;

      const isSignature =
        key === "company_signature_id" ||
        key === "partnership_signature_id" ||
        key === "contract_template_id";

      // Все null заменяем на пустую строку
      if (value === null) {
        value = "";
      }

      formData.append(key, value);
    });

    // Файлы
    if (Array.isArray(cleaned.docs)) {
      cleaned.docs.forEach((doc, index) => {
        if (!doc?.file) return;

        formData.append(`docs[${index}][name]`, doc.name ?? "");
        formData.append(`docs[${index}][type_id]`, doc.type_id ?? "");
        formData.append(`docs[${index}][file]`, doc.file);
      });
    }

    return formData;
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
