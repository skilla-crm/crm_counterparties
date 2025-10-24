// External
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

// Redux API
import { useGetCounterpartyInfoQuery } from '../../redux/services/counterpartyDetailsApiActions';

// Components
import Header from './components/Header/Header';
import ContentHeader from './components/ContentHeader/ContentHeader';
import RightPanelBlock from './components/RightPanelBlock/RightPanelBlock';
import HistoryBlock from './components/HistoryBlock/HistoryBlock';
import TabsButtons from './ui/TabsButtons/TabsButtons';

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

const TABS = [
    { value: 'general', label: 'Общее' },
    { value: 'details', label: 'Реквизиты' },
    // { value: 'contracts', label: 'Договоры' },
    { value: 'price', label: 'Прайс-лист' },
    { value: 'contacts', label: 'Представители' },
    { value: 'bank', label: 'Банковские счета' },
    { value: 'objects', label: 'Объекты' },
    { value: 'other', label: 'Другое' },
];

const Detail = () => {
    const { id } = useParams();
    const [anim, setAnim] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const controlRef = useRef(null);
    const segmentRefs = useRef(TABS.map(() => React.createRef()));

    const segmentsWithRef = TABS.map((tab, i) => ({
        ...tab,
        ref: segmentRefs.current[i],
    }));

    const { data: counterparty, isLoading } = useGetCounterpartyInfoQuery(id);

    const {
        last_documents,
        last_orders,
        last_transactions,
        general,
        requisites,
        contacts,
        price_list,
        bank_accounts,
        others,
    } = counterparty || {};

    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
            document.title = '';
        });
    }, []);

    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <Header
                tab={activeTab}
                isChecked={counterparty?.general?.verified_id}
                counterpartyId={id}
            />
            <div className={classNames(s.contentWrapper)}>
                <div className={classNames(s.mainContent)}>
                    <ContentHeader data={general} />
                    <TabsButtons
                        segments={segmentsWithRef}
                        value={activeTab}
                        callback={(val) => {
                            setAnim(false);
                            setTimeout(() => {
                                setActiveTab(val);
                            }, 100);

                            setTimeout(() => {
                                setAnim(true);
                            }, 150);
                        }}
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
                        {activeTab === 'contacts' && (
                            <div className={s.tabPanel}>
                                <Contacts data={contacts} counterpartyId={id} />
                            </div>
                        )}
                        {activeTab === 'price' && (
                            <div className={s.tabPanel}>
                                <PriceList data={price_list} />
                            </div>
                        )}

                        {activeTab === 'bank' && (
                            <div className={s.tabPanel}>
                                <BankAccounts data={bank_accounts} />
                            </div>
                        )}

                        {activeTab === 'objects' && (
                            <div className={s.tabPanel}>
                                <Objects data={bank_accounts} />
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
                        activeTab === 'general' && s.rightPannel_vis
                    )}
                >
                    <RightPanelBlock title="Заказы" list={last_orders} />
                    <RightPanelBlock
                        title="Транзакции"
                        list={last_transactions}
                    />
                    <RightPanelBlock title="Документы" list={last_documents} />
                    <HistoryBlock />
                </div>
            </div>
        </div>
    );
};

export default Detail;
