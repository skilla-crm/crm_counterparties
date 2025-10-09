import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';

import s from './ResetFiltersBtn.module.scss';

import { resetSort } from '../../../../redux/sorting/sortSlice';

const ClearFiltersBtn = ({ text = 'Сбросить всё', animation = false }) => {
    const dispatch = useDispatch();

    const handleClearAll = useCallback(() => {
        dispatch(resetSort());
    }, [dispatch]);

    return (
        <button
            className={classNames(s.root, animation && s.root_vis)}
            onClick={handleClearAll}
            type="button"
        >
            <span>{text}</span>
            <IconCloseBlue className={s.icon} />
        </button>
    );
};
export default ClearFiltersBtn;
