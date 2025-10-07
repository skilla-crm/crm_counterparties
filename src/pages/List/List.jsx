import s from "./List.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";

const List = () => {
  const [anim, setAnim] = useState(false);
 
  useEffect(() => {
    setTimeout(() => {
      setAnim(true);
    });
  }, []);



  return (
    <div className={classNames(s.root, anim && s.root_anim)}>
   
   {/*    <InfiniteScroll
        loader={false}
        scrollThreshold={0.3}
        dataLength={}
        next={}
        hasMore={true}
        scrollableTarget="scrollableDiv"
        style={{ overflow: "visible" }}
        endMessage={<p style={{ textAlign: "center" }}></p>}
      >
        <div className={s.container}>
          <Table  />
          <TableSceleton />
        </div>
      </InfiniteScroll> */}
    </div>
  );
};

export default List;
