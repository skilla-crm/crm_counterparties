import s from "./Create.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
//components
import Upd from "../../components/Act/Act";

const Create = () => {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    document.title = `Создать акт сверки`;
    setTimeout(() => {
      setAnim(true);
    });
  }, []);

  return (
    <div className={classNames(s.root, anim && s.root_anim)}>
      <Upd type={"create"} />
    </div>
  );
};

export default Create;
