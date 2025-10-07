// Redux
import { useDispatch } from "react-redux";
import { setSelectedStatus } from "../../redux/filters/filtersSlice";

//Components
import UniButton from "components/General/UniButton/UniButton";
import Information from "components/Information/Information";
import SectionButtons from "components/SectionButtons/SectionButtons";

// Icons
import { ReactComponent as IconPlus } from "assets/icons/iconPlus.svg";
import { ReactComponent as IconUploadWhite } from "assets/icons/iconUploadWhite.svg";

// Styles
import s from "./List.module.scss";
import SegmentButtons from "components/General/SegmentButtons/SegmentButtons";
import React, { useRef } from "react";

const TABS = [
  { value: "approved", label: "Контрагенты" },
  { value: "notApproved", label: "Непроверенные контрагенты" },
];

const ListHeader = ({
  activeTab,
  setActiveTab,
  setAnim,
  isLoading,
  counters = {},
}) => {
  const controlRef = useRef(null);
  const dispatch = useDispatch();
  const segmentRefs = useRef(TABS.map(() => React.createRef()));

  const segmentsWithRef = TABS.map((tab, i) => ({
    ...tab,
    ref: segmentRefs.current[i],
  }));

  const getCountForTab = (id) => {
    if (id === "approved") {
      return counters?.approved ?? null;
    }
    if (id === "notApproved") {
      return counters?.notApproved ?? null;
    }
    return 0;
  };

  return (
    <header className={s.header}>
      <div className={s.block}>
        <SegmentButtons
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
          counters={counters}
          load={isLoading}
        />

        <div className={s.buttons}>
          <UniButton icon={IconPlus} text="Добавить контрагента" />
        </div>
      </div>
    </header>
  );
};

export default ListHeader;
