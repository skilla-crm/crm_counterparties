// External
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

// Redux API
import { useGetCounterpartyInfoQuery } from "../../redux/services/counterpartyDetailsApiActions";
import {
  resetActiveTab,
  setActiveTab,
} from "../../redux/slices/detailTabSlice";
import { useSelector, useDispatch } from "react-redux";

//hooks
import { useModal } from "hooks/useModal";

// Components
import Header from "./components/Header/Header";
import ContentHeader from "./components/ContentHeader/ContentHeader";
import RightPanelBlock from "./components/RightPanelBlock/RightPanelBlock";
import HistoryBlock from "./components/HistoryBlock/HistoryBlock";
import TabsButtons from "./ui/TabsButtons/TabsButtons";
import DetailLoader from "./ui/DetailLoader/DetailLoader";

// Tabs
import General from "./TABS/General/General";
import Requisites from "./TABS/Requisites/Requisites";
import Contacts from "./TABS/Contacts/Contacts";
import PriceList from "./TABS/PriceList/Pricelist";
import BankAccounts from "./TABS/BankAccounts/BankAccounts";
import Other from "./TABS/Other/Other";
import Objects from "./TABS/Objects/Objects";

// Styles
import s from "./Detail.module.scss";
import Contracts from "./TABS/Contracts/Contracts";

const TABS = [
  { value: "general", label: "Общее" },
  { value: "details", label: "Реквизиты" },
  { value: "contracts", label: "Договоры" },
  { value: "price", label: "Прайс-лист" },
  { value: "contacts", label: "Представители" },
  { value: "bank", label: "Банковские счета" },
  { value: "objects", label: "Объекты" },
  { value: "other", label: "Другое" },
];

const Detail = () => {
  const { id } = useParams();
  const [anim, setAnim] = useState(false);
  const dispatch = useDispatch();
  const { showModal } = useModal();

  const activeTab = useSelector((state) => state.detailTab.activeTab);
  const hasUnsavedChanges = useSelector(
    (state) => state.detailChanges.hasUnsavedChanges
  );

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
    contracts,
    contacts,
    price_list,
    bank_accounts,
    others,
  } = counterparty || {};

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
    return () => {
      dispatch(resetActiveTab());
    };
  }, [dispatch]);

  const handleTabChange = (val) => {
    if (hasUnsavedChanges) {
      showModal("UNSAVED_CHANGES", {
        nextTab: val,
        currentTab: TABS.find((tab) => tab.value === activeTab).label,
        companyId: id,
      });
    } else {
      performTabChange(val);
    }
  };

  const performTabChange = (val) => {
    setAnim(false);
    setTimeout(() => {
      dispatch(setActiveTab(val));
    }, 100);
    setTimeout(() => {
      setAnim(true);
    }, 150);
  };

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
          counterpartyId={id}
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
              {activeTab === "general" && (
                <div className={s.tabPanel}>
                  <General data={general} />
                </div>
              )}

              {activeTab === "details" && (
                <div className={s.tabPanel}>
                  <Requisites general={general} requisites={requisites} />
                </div>
              )}
              {activeTab === "contracts" && (
                <div className={s.tabPanel}>
                  <Contracts data={contracts} counterparty={counterparty} />
                </div>
              )}
              {activeTab === "contacts" && (
                <div className={s.tabPanel}>
                  <Contacts data={contacts} counterpartyId={id} />
                </div>
              )}
              {activeTab === "price" && (
                <div className={s.tabPanel}>
                  <PriceList data={price_list} />
                </div>
              )}

              {activeTab === "bank" && (
                <div className={s.tabPanel}>
                  <BankAccounts data={bank_accounts} counterpartyId={id} />
                </div>
              )}

              {activeTab === "objects" && (
                <div className={s.tabPanel}>
                  <Objects data={bank_accounts} />
                </div>
              )}
              {activeTab === "other" && (
                <div className={s.tabPanel}>
                  <Other data={others} />
                </div>
              )}
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
            {/* <HistoryBlock /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
