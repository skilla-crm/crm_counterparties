import s from "./Create.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";

const Create = () => {
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    document.title = `Создать`;
    setTimeout(() => {
      setAnim(true);
    });
  }, []);

  return (
    <div className={classNames(s.root, anim && s.root_anim)}>

    </div>
  );
};

export default Create;
