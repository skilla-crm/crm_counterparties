// External
import { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';

// Redux
import { useGetCompanyInfoMutation } from '../../../../../../redux/services/dadataApiActions';

// Hooks
import useDebounce from 'hooks/useSimpleDebounce';

// Components
import CompanyListInn from './CompanyList/CompanyListInn';

// Styles
import s from './InputCounterparty.module.scss';

const InputCounterparty = ({
    value,
    setValue,
    setField,
    disabled,
    checker,
    setCheckResult,
    withInn,
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [openList, setOpenList] = useState(false);
    const [fieldFocus, setFieldFocus] = useState(false);
    const [noFind, setNoFind] = useState(false);
    const [error, setError] = useState('');

    const [inputValue, setInputValue] = useState(value);
    const [displayAsName, setDisplayAsName] = useState(false);

    const inputRef = useRef();
    const debouncedValue = useDebounce(value, 500);

    const [getCompanyInfo] = useGetCompanyInfoMutation();

    useEffect(() => {
        if (withInn) {
            setValue('');
            setDisplayAsName(false);
            setInputValue('');
            setSuggestions([]);
            setCheckResult(null);
            setOpenList(false);
            setNoFind(false);
            setError('');
            setFieldFocus(false);
        }
    }, [withInn]);

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
            if (error) return;
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
                ur_address: company?.address?.unrestricted_value,
                address: company?.address?.value,
                signature: company?.management?.name || '',
                signature_position: company?.management?.post || '',
            });

            setInputValue(company?.name?.short_with_opf || company.inn);
            setDisplayAsName(true);
            //   setOpenList(false);

            checker(company.inn, company.kpp);
        },
        [setField, checker]
    );

    const handleBlur = () => {
        setFieldFocus(false);
        setOpenList(false);
        const found = suggestions.find((s) => s.inn === value);
        if (!found && value && !error) {
            handleCheck(value);
        }
    };

    const handleFocus = () => {
        setFieldFocus(true);

        if (displayAsName) {
            setInputValue(value);
            setDisplayAsName(false);
        }
        if (suggestions.length > 0) setOpenList(true);
    };
    const handleCheck = async (inn) => {
        if (!inn || error) return;
        try {
            const res = await checker({ inn, kpp: null }).unwrap();
            if (res.success) {
                setCheckResult(res);
                setError(res.message);
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
                value={inputValue}
                onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '');
                    setValue(digits);
                    setInputValue(digits);
                    setNoFind(false);
                    if (digits.length !== value.length) {
                        setCheckResult(null);
                    }
                }}
                onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        if (value) {
                            await handleCheck(value);
                            setOpenList(false);
                            setFieldFocus(false);
                            inputRef.current?.blur();
                        }
                    }
                }}
                onFocus={handleFocus}
                onBlur={() => {
                    setTimeout(async () => {
                        handleBlur();
                    }, 150);
                }}
                disabled={disabled}
            />

            <div
                className={classNames(
                    s.warningText,
                    error === 'Не найден в реестре' && s.warningText_active
                )}
            >
                <p>{error}</p>
            </div>
            <div
                className={classNames(
                    s.errorText,
                    error !== 'Не найден в реестре' &&
                        error &&
                        s.errorText_active
                )}
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
