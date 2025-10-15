import s from "./Detail.module.scss";
import classNames from "classnames";

import { useEffect, useState } from "react";

const Detail = () => {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnim(true);
      document.title = "";
    });
  }, []);

  return (
    <div className={classNames(s.root, anim && s.root_anim)}>Карточка</div>
  );
};

export default Detail;
