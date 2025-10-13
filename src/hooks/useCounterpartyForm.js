import { useState, useCallback } from "react";
import dayjs from "dayjs";

export const useCounterpartyForm = () => {
  const [form, setForm] = useState({
    // Основная информация
    name: "",
    inn: "",
    kpp: "",
    ogrn: "",
    logo: null,
    site: "",
    is_percent: "",

    // Адрес
    address: "",
    ur_adress: "",

    //Электронный документооборот
    edo_id: "",
    edo_region: "",
    edo_index: "",
    edo_city: "",
    edo_street: "",
    edo_home: "",
    edo_k: "",
    edo_a: "",

    //Лицо, имеющее право действовать без доверенности
    director: "",
    director_position: "",
    director_rod: "",

    // Дополнительный подписант (объект)
    additional_signature: {
      full_name: "",
      powers: "",
      doc_validity_period: "",
      doc: "",
      sign: "",
    },
  });

  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setAdditionalSignatureField = useCallback((subKey, value) => {
    setForm((prev) => ({
      ...prev,
      additional_signature: {
        ...prev.additional_signature,
        [subKey]: value,
      },
    }));
  }, []);

  const appendField = (fd, key, value) => {
    // if (value === null || value === "") return;

    if (dayjs.isDayjs(value)) {
      fd.append(key, value.format("YYYY-MM-DD"));
    } else if (value instanceof File) {
      fd.append(key, value);
    } else {
      fd.append(key, String(value));
    }
  };

  const getFormData = useCallback(() => {
    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "additional_signature" && typeof value === "object") {
        const hasNonEmptyField = Object.entries(value).some(
          ([subKey, subValue]) => {
            return subValue !== "" && subValue !== null;
          }
        );

        if (hasNonEmptyField) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            appendField(fd, `additional_signature[${subKey}]`, subValue);
          });
        }

        return;
      }

      if (key === "legal_form_id" || key === "tax_form_id" || key === "nds") {
        let num = Number(value);
        fd.append(key, num === 0 ? "" : !isNaN(num) ? num : "");
      } else {
        appendField(fd, key, value);
      }
    });

    return fd;
  }, [form]);

  return { form, setField, setAdditionalSignatureField, getFormData };
};
