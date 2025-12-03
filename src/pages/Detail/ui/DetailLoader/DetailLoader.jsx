import classNames from "classnames";
import s from "./DetailLoader.module.scss";
import Loader from "./Loader/Loader";

const DetailLoader = ({ isLoading }) => {
  return (
    <div className={classNames(s.root, isLoading && s.root_vis)}>
      <div className={classNames(s.header)}>
        <Loader height={30} width={480} />
        <div className={s.btns}>
          <Loader height={42} width={120} />
          <Loader height={42} width={195} />
        </div>
      </div>
      <div className={classNames(s.contentWrapper)}>
        <div className={classNames(s.mainContent)}>
          <div className={s.contentHeader}>
            {/* <Loader height={168} width={200} /> */}
            <div className={s.headerRight}></div>
          </div>
          <div className={classNames(s.tabsWrapper)}>
            <Loader height={22} width={56} />
            <Loader height={22} width={84} />
            <Loader height={22} width={79} />
            <Loader height={22} width={93} />
            <Loader height={22} width={121} />
            <Loader height={22} width={100} />
          </div>
          <div>
            <div className={s.tab}>
              <div className={s.gridContainer}>
                <div className={s.rowTab}>
                  <Loader height={22} width={30} />
                  <Loader height={22} width={150} />
                </div>
                <div className={s.rowTab}>
                  <Loader height={22} width={50} />
                  <Loader height={22} width={250} />
                </div>
                <div className={s.rowTab}>
                  <Loader height={22} width={150} />
                  <Loader height={22} width={100} />
                </div>
                <div className={s.rowTab}>
                  <Loader height={22} width={250} />
                  <Loader height={22} width={80} />
                </div>
                <div className={s.rowTab}>
                  <Loader height={22} width={60} />
                  <Loader height={22} width={150} />
                </div>
                <div className={s.rowTab}>
                  <Loader height={22} width={100} />
                  <Loader height={80} width={600} />
                </div>
                <div className={s.rowTab}>
                  <Loader height={22} width={150} />
                  <Loader height={22} width={150} />
                </div>
                <div className={s.rowTab}>
                  <Loader height={22} width={150} />
                  <Loader height={22} width={150} />
                </div>
                <div className={s.rowTab}>
                  <Loader height={22} width={150} />
                  <Loader height={22} width={280} />
                </div>
                <div className={s.rowTab}>
                  <Loader height={22} width={150} />
                  <Loader height={22} width={180} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(s.rightPanel)}>
          <RightBlock />
          <RightBlock />
          <RightBlock />
        </div>
      </div>
    </div>
  );
};
export default DetailLoader;

const RightBlock = () => {
  return (
    <div className={s.rightBlock}>
      <Loader height={22} width={150} />
      <div className={s.rowWrapper}>
        {" "}
        <div className={s.row}>
          <Loader height={14} width={150} />
          <Loader height={14} width={80} />
        </div>
        <div className={s.row}>
          <Loader height={14} width={160} />
          <Loader height={14} width={150} />
        </div>
        <div className={s.row}>
          <Loader height={14} width={170} />
          <Loader height={14} width={130} />
        </div>
        <div className={s.links}>
          <Loader height={22} width={100} />
          <Loader height={22} width={130} />
          <Loader height={22} width={100} />
        </div>
      </div>
    </div>
  );
};
