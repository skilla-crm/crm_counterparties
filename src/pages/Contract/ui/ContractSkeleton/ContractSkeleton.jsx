import classNames from "classnames";
import Loader from "../../../Detail/ui/DetailLoader/Loader/Loader";
import s from "./ContractSkeleton.module.scss";

const ContractSkeleton = ({ isLoading }) => {
  return (
    <div
      className={classNames(s.root, {
        [s.root_visible]: isLoading,
      })}
    >
      <div className={s.header}>
        <Loader height={28} width={320} />
        <div className={s.headerButtons}>
          <Loader height={40} width={140} />
          <Loader height={40} width={180} />
        </div>
      </div>

      <div className={s.content}>
        <div className={s.leftCol}>
          <div className={s.card}>
            <div className={s.sectionTitle}>
              <Loader height={18} width={140} />
              <Loader height={18} width={90} />
            </div>
            <div className={s.column}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={s.row}>
                  <Loader height={18} width={160} />
                  <Loader height={18} width={220} />
                </div>
              ))}
            </div>
          </div>

          <div className={s.card}>
            <div className={s.sectionTitle}>
              <Loader height={18} width={180} />
            </div>
            <div className={s.docsGrid}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={s.docRow}>
                  <Loader height={18} width={260} />
                  <Loader height={18} width={120} />
                </div>
              ))}
              <Loader height={42} width={180} />
            </div>
          </div>
        </div>

        <div className={s.rightCol}>
          <div className={s.sideCard}>
            <Loader height={18} width={130} />
            <div className={s.column}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={s.row}>
                  <Loader height={16} width={150} />
                  <Loader height={16} width={90} />
                </div>
              ))}
            </div>
          </div>

          <div className={s.sideCard}>
            <Loader height={18} width={110} />
            <div className={s.historyList}>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={s.column}>
                  <Loader height={14} width={200} />
                  <Loader height={14} width={150} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSkeleton;

