import { useState, useCallback } from "react";
import dayjs from "dayjs";
import { add } from "lodash";

export const useCounterpartyForm = () => {
  const [form, setForm] = useState({
    // Основная информация
    name: "",
    inn: "",
    kpp: "",
    ogrn: "",
    logo: null,
    site: "",
    // is_percent: "",

    // Адрес
    address: "",
    ur_address: "",

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

    contacts: {
      name: "",
      surname: "",
      position: "",
      phone: "",
      dob: "",
      e_mail: "",
    },

    //Дополнительный подписант (объект)
    signatory: {
      full_name: "",
      powers: "",
      doc_validity_period: "",
    },
  });
  const [errors, setErrors] = useState({});
  const setError = useCallback((key, value) => {
    setErrors((prev) => ({ ...prev, [key]: value }));
  }, []);
  const getErrors = useCallback(() => errors, [errors]);
  const hasErrors = useCallback(() => {
    return Object.values(errors).some((err) => err === false);
  }, [errors]);
  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setAdditionalSignatureField = useCallback((subKey, value) => {
    setForm((prev) => ({
      ...prev,
      signatory: {
        ...prev.signatory,
        [subKey]: value,
      },
    }));
  }, []);

  const setContactsField = useCallback((subKey, value) => {
    setForm((prev) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        [subKey]: value,
      },
    }));
  }, []);

  const getFormData = useCallback(
    (excludeKeys = []) => {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (excludeKeys.includes(key)) return;

        if (key === "logo") {
          if (value instanceof File) {
            fd.append("logo", value);
          } else if (typeof value === "string") {
            fd.append("logo", value);
          }
        } else if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            fd.append(`${key}[${subKey}]`, subValue ?? "");
          });
        } else {
          fd.append(key, value ?? "");
        }
      });

      return fd;
    },
    [form]
  );

  return {
    form,
    setField,
    setAdditionalSignatureField,
    setContactsField,
    getFormData,
    hasErrors,
    getErrors,
    setError,
  };
};
