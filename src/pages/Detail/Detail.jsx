import React from "react";
import s from "./Detail.module.scss";
import classNames from "classnames";
// Redux API
import { useGetCounterpartyInfoQuery } from "../../../src/redux/services/counterpartiesApiActions";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header/Header";

import RightPanelBlock from "./components/RightPanelBlock/RightPanelBlock";
import TabsButtons from "./ui/TabsButtons/TabsButtons";
import HistoryBlock from "./components/HistoryBlock/HistoryBlock";
import ContentHeader from "./components/ContentHeader/ContentHeader";
import General from "./TABS/General/General";
import Details from "./TABS/Details/Details";

const TABS = [
  { value: "general", label: "Общее" },
  { value: "details", label: "Реквизиты" },
  { value: "contracts", label: "Договоры" },
  { value: "price", label: "Прайс-лист" },
  { value: "contacts", label: "Представители" },
  { value: "bank", label: "Банковские счета" },
];

const Detail = () => {
  const { id } = useParams();
  const [anim, setAnim] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const controlRef = useRef(null);
  const segmentRefs = useRef(TABS.map(() => React.createRef()));

  const segmentsWithRef = TABS.map((tab, i) => ({
    ...tab,
    ref: segmentRefs.current[i],
  }));

  const { data: counterparty, isLoading } = useGetCounterpartyInfoQuery(id);
  console.log(counterparty);
  const {
    last_documents,
    last_orders,
    last_transactions,
    general,
    requisites,
  } = counterparty || {};

  useEffect(() => {
    setTimeout(() => {
      setAnim(true);
      document.title = "";
    });
  }, []);

  return (
    <div className={classNames(s.root, anim && s.root_anim)}>
      <Header tab={activeTab} isChecked={counterparty?.general?.verified_id} />
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
          <div className={classNames(s.tabContent, { [s.animate]: anim })}>
            <div className={classNames(s.tabContent, { [s.animate]: anim })}>
              {activeTab === "general" && (
                <div className={s.tabPane}>
                  <General data={general} />
                </div>
              )}

              {activeTab === "details" && (
                <div className={s.tabPane}>
                  <Details general={general} requisites={requisites} />
                </div>
              )}
              {/*
              {activeTab === "contracts" && (
                <div className={s.tabPane}>
                  <Contracts />
                </div>
              )}

              {activeTab === "price" && (
                <div className={s.tabPane}>
                  <PriceList />
                </div>
              )}

              {activeTab === "contacts" && (
                <div className={s.tabPane}>
                  <Contacts />
                </div>
              )}

              {activeTab === "bank" && (
                <div className={s.tabPane}>
                  <BankAccounts />
                </div>
              )} */}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            s.rightPannel,
            activeTab === "general" && s.rightPannel_vis
          )}
        >
          <RightPanelBlock title="Заказы" list={last_orders} />
          <RightPanelBlock title="Транзакции" list={last_transactions} />
          <RightPanelBlock title="Документы" list={last_documents} />
          <HistoryBlock />
        </div>
      </div>
    </div>
  );
};

export default Detail;
