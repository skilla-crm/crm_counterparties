import { useState, useRef, useEffect } from 'react';
import s from './Address.module.scss';

import {
    useGetAddressSuggestQuery,
    useGetAddressExactQuery,
} from '../../../redux/services/yandexApi';
import { addressUtility } from 'utils/AdressUtility';

const Address = ({ defaultCordinate, address, setAddress }) => {
    const [query, setQuery] = useState('');
    const [openList, setOpenList] = useState(false);

    const listRef = useRef();

    const { data: suggestData, isFetching: isSuggestLoading } =
        useGetAddressSuggestQuery(
            { query, defaultCordinate },
            { skip: query.trim().length === 0 }
        );

    const [getExactAddress] = useGetAddressExactQuery();

    const suggestions = suggestData?.results || [];

    const handleAddress = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim()) {
            setOpenList(false);
            return;
        }

        setOpenList(true);
    };

    const handleSelectAddress = async (item) => {
        const data = item.address;

        const { city, street, house, apartment } = addressUtility(
            data.component
        );

        const geocodeString = `${city} ${street} ${house}`;

        const res = await getExactAddress(geocodeString);

        const point =
            res.data?.response?.GeoObjectCollection?.featureMember?.[0]
                ?.GeoObject?.Point;

        const coords = point ? point.pos.split(' ') : null;

        setAddress({
            city,
            street,
            house,
            apartment,
            lat: coords?.[1],
            lng: coords?.[0],
        });

        setQuery(data.formatted_address);
        setOpenList(false);
    };

    const closeList = (e) => {
        if (listRef.current && !listRef.current.contains(e.target)) {
            setOpenList(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeList);
        return () => document.removeEventListener('mousedown', closeList);
    }, []);

    return (
        <div className={s.container}>
            <div ref={listRef} className={s.field}>
                <input
                    value={query}
                    onChange={handleAddress}
                    onFocus={() => suggestions.length > 0 && setOpenList(true)}
                    placeholder="Введите адрес"
                />

                {openList && suggestions.length > 0 && (
                    <ul className={`${s.list} ${s.list_open}`}>
                        {suggestions.map((el) => (
                            <li
                                key={el.uri}
                                onClick={() => handleSelectAddress(el)}
                            >
                                {el.address.formatted_address}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Address;
