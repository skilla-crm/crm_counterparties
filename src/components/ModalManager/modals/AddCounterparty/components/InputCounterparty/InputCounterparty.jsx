import { useState, useEffect, useRef, useCallback } from 'react';
import { useGetCompanyInfoMutation } from '../../../../../../redux/services/dadataApiActions';
import CompanyListInn from './CompanyList/CompanyListInn';

import {
    useAddСounterpartyByIdMutation,
    useCheckCounterpartyMutation,
} from '../../../../../../redux/services/counterpartiesApiActions';

import useDebounce from 'hooks/useSimpleDebounce';

import classNames from 'classnames';

import s from './InputCounterparty.module.scss';

const InputCounterparty = ({ value, setValue, setField, disabled, form }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [openList, setOpenList] = useState(false);
    const [fieldFocus, setFieldFocus] = useState(false);
    const [noFind, setNoFind] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef();

    const debouncedValue = useDebounce(value, 500);

    const [getCompanyInfo] = useGetCompanyInfoMutation();

    const [checkCounterparty] = useCheckCounterpartyMutation();
    useEffect(() => {
        if (!debouncedValue) {
            setError('');
            return;
        }

        if (debouncedValue.length !== 10 && debouncedValue.length !== 12) {
            setError('ИНН должен содержать 10 или 12 цифр');
            setSuggestions([]);
            setNoFind(false);
            setOpenList(false);
            return;
        }

        setError('');

        const fetchData = async () => {
            try {
                const res = await getCompanyInfo({
                    query: debouncedValue,
                }).unwrap();

                setSuggestions(res.suggestions);
                setNoFind(res.suggestions.length === 0 && fieldFocus);
                setOpenList(res.suggestions.length > 0 && fieldFocus);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [debouncedValue, getCompanyInfo, fieldFocus]);

    const handleChoose = useCallback(
        (company) => {
            setField({
                inn: company.inn,
                kpp: company.kpp,
                ogrn: company.ogrn,
                name: company?.name?.short_with_opf,
                ur_adress: company?.address?.unrestricted_value,
                adress: company?.address?.value,
                signature: company?.management?.name || '',
                signature_position: company?.management?.post || '',
            });

            // setOpenList(false);

            handleCheck(company.inn);
        },
        [setField, checkCounterparty]
    );

    const handleBlur = () => {
        setFieldFocus(false);
        setOpenList(false);

        const found = suggestions.find((s) => s.inn === value);
        if (!found && value) {
            checkCounterparty({ inn: value, kpp: null })
                .unwrap()
                .catch((err) =>
                    console.error('Ошибка проверки контрагента', err)
                );
        }
    };
    const handleCheck = async (inn) => {
        if (!inn || error) return;
        try {
            const res = await checkCounterparty({ inn, kpp: null }).unwrap();

            if (res.success) {
                setError(res.message);
                console.log(res.message);
            }
        } catch (err) {
            console.error('Ошибка проверки контрагента', err);
        }
    };

    return (
        <div className={s.container}>
            <input
                className={`${s.input} ${error ? s.error : ''}`}
                ref={inputRef}
                value={value}
                onChange={(e) => {
                    !disabled && setValue(e.target.value.replace(/\D/g, ''));
                    setNoFind(false);
                }}
                onFocus={() => {
                    setFieldFocus(true);
                    if (suggestions.length > 0) setOpenList(true);
                }}
                onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        if (value) {
                            await handleCheck(value);
                            setOpenList(false);
                            setFieldFocus(false);
                        }
                    }
                }}
                onBlur={() => {
                    setTimeout(async () => {
                        handleBlur();
                    }, 150);
                }}
                disabled={disabled}
            />

            <div
                className={classNames(s.errorText, error && s.errorText_active)}
            >
                <p>{error}</p>
            </div>

            {openList && (
                <CompanyListInn
                    list={suggestions}
                    openList={openList}
                    listScroll={suggestions.length > 5}
                    noFind={noFind}
                    handleChose={handleChoose}
                    selectedInn={value}
                />
            )}
        </div>
    );
};

export default InputCounterparty;
