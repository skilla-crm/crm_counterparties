import React from 'react';
// Components

import TableHeader from './TableHeader';
import TableRow from './TableRow';

// Styles
import s from './Table.module.scss';
import classNames from 'classnames';
import TableSceleton from './TableSceleton/TableSceleton';

const Table = ({ type, anim, isLoading, isFetching, list = [], error }) => {
    console.log(isLoading);
    if (error)
        return (
            <div className={s.error}>
                <div className={s.error}>
                    {error?.data?.message ||
                        error?.error ||
                        'Произошла ошибка...'}
                </div>
            </div>
        );
    if (list.length === 0 && !isLoading) {
        return (
            <div className={s.noData}>
                {' '}
                По вашему запросу ничего не найдено ...
            </div>
        );
    }

    return (
        <>
            <div className={classNames(s.overlay)}>
                <TableSceleton
                    isLoading={isLoading || isFetching}
                    type={type}
                />
                <div
                    className={classNames(
                        s.root,
                        anim && s.root_anim,
                        isLoading && s.root_fetch
                    )}
                >
                    <TableHeader type={type} />
                    <div className={s.line}></div>

                    <div className={s.scrollBody} id="scrollableDiv">
                        {list.map((row, i) => {
                            return (
                                <React.Fragment key={row.id}>
                                    <TableRow row={row} type={type} />
                                    <div className={s.line}></div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Table;
