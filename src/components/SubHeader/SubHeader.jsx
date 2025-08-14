import s from './SubHeader.module.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//icons
import { ReactComponent as IconHome } from '../../assets/icons/filters/iconHome.svg'
import { ReactComponent as IconWallet } from '../../assets/icons/filters/iconWallet.svg'
import { ReactComponent as IconStatistic } from '../../assets/icons/filters/iconStatistic.svg'
import { ReactComponent as IconCalendar } from '../../assets/icons/filters/iconCalendar.svg'
//components
import Search from '../Search/Search';
import Filter from '../Genegal/Filter/Filter';
import FilterDate from '../Genegal/FilterDate/FilterDate';
import FilterListCustomer from '../FilterListCustomer/FilterListCustomer';
//slice 
import { setSearchQuery } from '../../redux/filters/slice';


const SubHeader = ({ isFetching }) => {
    const { search, filterCompanys, filterCustomers, filterStatus } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    return (
        <div className={s.root}>
            <Search isFetching={isFetching} />
            <div className={s.filters}>
                {/*  <Filter title={'Получатель'} Icon={IconHome} type={'customer'} /> */}
                <Filter
                    title={'Заказчик'}
                    Icon={IconWallet}
                    type={'customer'}
                    items={filterCustomers}
                    Component={FilterListCustomer}
                    isFetching={isFetching}
                />
                {/*   <Filter title={'Статус'} Icon={IconStatistic} type={'customer'} /> */}
                <FilterDate
                    title={'Период'}
                    Icon={IconCalendar}
                    isFetching={isFetching}
                />
            </div>


        </div>
    )
};

export default SubHeader;