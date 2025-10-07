import React, { useEffect, useRef, useState } from "react";
// Components

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Accordion from "./Accordion/Accordion";
import BottomInfo from "components/General/BottomInfo/BottomInfo";

// Styles
import s from "./Table.module.scss";
import classNames from "classnames";
import TableSceleton from "./TableSceleton/TableSceleton";

const Table = ({ type, anim, isLoading, list = [], error, totalSum }) => {
  // if (error)
  //   return (
  //     <div className={s.error}>
  //       <div className={s.error}>
  //         {error?.data?.message || error?.error || "Произошла ошибка..."}
  //       </div>
  //     </div>
  //   );
  if (list.length === 0 && !isLoading) {
    return (
      <div className={s.noData}> По вашему запросу ничего не найдено ...</div>
    );
  }

  return (
    <>
      <div className={classNames(s.overlay, anim && s.overlay_anim)}>
        <TableSceleton isLoading={isLoading} type={type} />
        <div className={classNames(s.root, isLoading && s.root_fetch)}>
          <TableHeader type={type} />
          <div className={s.line}></div>

          <div className={s.scrollBody} id="scrollableDiv">
            {list.map((row, i) => {
              return (
                <React.Fragment key={row.id}>
                  <TableRow row={row} type={type} />
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
