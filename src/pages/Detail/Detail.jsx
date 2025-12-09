// External
import React, { act, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

// Redux API
import { useGetCounterpartyInfoQuery } from '../../redux/services/counterpartyDetailsApiActions';
import {
    resetActiveTab,
    setActiveTab,
} from '../../redux/slices/detailTabSlice';
import { setPriceRates, setAllDataRate } from '../../redux/rates/slice';
import { useGetSettingsQuery } from '../../redux/services/contractApiActions';
import { useSelector, useDispatch } from 'react-redux';

//hooks
import { useModal } from 'hooks/useModal';

// Components
import Header from './components/Header/Header';
import ContentHeader from './components/ContentHeader/ContentHeader';
import RightPanelBlock from './components/RightPanelBlock/RightPanelBlock';
import HistoryBlock from './components/HistoryBlock/HistoryBlock';
import TabsButtons from './ui/TabsButtons/TabsButtons';
import DetailLoader from './ui/DetailLoader/DetailLoader';

// Tabs
import General from './TABS/General/General';
import Requisites from './TABS/Requisites/Requisites';
import Contacts from './TABS/Contacts/Contacts';
import PriceList from './TABS/PriceList/Pricelist';
import BankAccounts from './TABS/BankAccounts/BankAccounts';
import Other from './TABS/Other/Other';
import Objects from './TABS/Objects/Objects';

// Styles
import s from './Detail.module.scss';
import Contracts from './TABS/Contracts/Contracts';

const TABS = [
    { value: 'general', label: 'Общее' },
    { value: 'details', label: 'Реквизиты' },
    { value: 'contracts', label: 'Договоры' },
    { value: 'price', label: 'Прайс-лист' },
    { value: 'contacts', label: 'Представители' },
    { value: 'bank', label: 'Банковские счета' },
   /*  { value: 'objects', label: 'Объекты' }, */
    { value: 'other', label: 'Другое' },
];

const Detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const block = searchParams.get('block');
    const [anim, setAnim] = useState(false);
    const dispatch = useDispatch();
    const { showModal } = useModal();
    const activeTab = useSelector((state) => state.detailTab.activeTab);
    const hasUnsavedChanges = useSelector((state) => state.detailChanges.hasUnsavedChanges);
    const { rateChanged } = useSelector((state) => state.rates);


    const controlRef = useRef(null);
    const segmentRefs = useRef(TABS.map(() => React.createRef()));

    const segmentsWithRef = TABS.map((tab, i) => ({
        ...tab,
        ref: segmentRefs.current[i],
    }));

    const { data: settings } = useGetSettingsQuery({
        companyId: id,
    });
    const { data: counterparty, isLoading, isFetching } = useGetCounterpartyInfoQuery({
        counterpartyId: id,
    });

    const {
        last_documents,
        last_orders,
        last_transactions,
        general,
        requisites,
        contracts,
        contacts,
        price_list,
        bank_accounts,
        others,
        enterprises
    } = counterparty || {};

    const isVisibleRightPanel =
        !!(
            last_documents?.length ||
            last_orders?.length ||
            last_transactions?.length
        ) && activeTab === 'general';

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                setAnim(true);
            }, 10);
        } else {
            setAnim(false);
        }
    }, [isLoading]);


    useEffect(() => {
        block && performTabChange(block)
    }, [block])

    useEffect(() => {
        if (price_list) {
            dispatch(setAllDataRate({ price_list }))
            dispatch(setPriceRates(price_list))
        }
    }, [price_list])

    const handleTabChange = (val) => {
        if (hasUnsavedChanges) {
            showModal('UNSAVED_CHANGES', {
                nextTab: val,
                currentTab: activeTab,
                currentTabText: TABS.find((tab) => tab.value === activeTab).label,
                companyId: id,
            });
            return
        }

        if (rateChanged) {
            showModal('UNSAVED_CHANGES', {
                nextTab: val,
                currentTab: activeTab,
                currentTabText: TABS.find((tab) => tab.value === activeTab).label,
                companyId: id,
            });
            return
        }
        dispatch(setActiveTab(val));

    };

    const performTabChange = (val) => {
        dispatch(setActiveTab(val));

    };

    console.log(activeTab)

    return (
        <div className={s.overlay}>
            <DetailLoader isLoading={isLoading} />
            <div
                className={classNames(
                    s.root,
                    anim && s.root_anim,
                    isLoading && s.root_fetch
                )}
            >
                <Header
                    tab={activeTab}
                    isChecked={counterparty?.general?.verified_id}
                    counterparty={counterparty}
                    counterpartyId={id}
                    settings={settings}
                />
                <div className={classNames(s.contentWrapper)}>
                    <div className={classNames(s.mainContent)}>
                        <ContentHeader data={general} companyId={id} />
                        <TabsButtons
                            segments={segmentsWithRef}
                            value={activeTab}
                            callback={handleTabChange}
                            controlRef={controlRef}
                        />
                        <div
                            className={classNames(s.tabContent, {
                                [s.animate]: anim,
                            })}
                        >
                            {activeTab === 'general' && (
                                <div className={s.tabPanel}>
                                    <General data={general} />
                                </div>
                            )}

                            {activeTab === 'details' && (
                                <div className={s.tabPanel}>
                                    <Requisites
                                        general={general}
                                        requisites={requisites}
                                    />
                                </div>
                            )}
                            {activeTab === 'contracts' && (
                                <div className={s.tabPanel}>
                                    <Contracts
                                        data={contracts}
                                        counterparty={counterparty}
                                        settings={settings}
                                    />
                                </div>
                            )}
                            {activeTab === 'contacts' && (
                                <div className={s.tabPanel}>
                                    <Contacts
                                        data={contacts}
                                        counterpartyId={id}
                                    />
                                </div>
                            )}
                            {activeTab === 'price' && (
                                <div className={s.tabPanel}>
                                    <PriceList />
                                </div>
                            )}

                            {activeTab === 'bank' && (
                                <div className={s.tabPanel}>
                                    <BankAccounts
                                        data={bank_accounts}
                                        counterpartyId={id}
                                    />
                                </div>
                            )}

                            {activeTab === 'objects' && (
                                <div className={s.tabPanel}>
                                    <Objects data={enterprises} />
                                </div>
                            )}
                            {activeTab === 'other' && (
                                <div className={s.tabPanel}>
                                    <Other data={others} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className={classNames(
                            s.rightPannel,

                            isVisibleRightPanel && s.rightPannel_vis
                        )}
                    >
                        <RightPanelBlock
                            title="Заказы"
                            list={last_orders}
                            counterpartyId={id}
                        />
                        <RightPanelBlock
                            title="Транзакции"
                            list={last_transactions}
                            counterpartyId={id}
                        />
                        <RightPanelBlock
                            title="Документы"
                            list={last_documents}
                            counterpartyId={id}
                        />
                        {/* <HistoryBlock /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
