import s from "./Switch.module.scss";
import classNames from "classnames";

const Switch = ({ text, switchState, setSwitchState, disabled }) => {

  const handleSwitch = () => {
    setSwitchState(!switchState)
  }
  return ( 
    <div
      onClick={handleSwitch}
      className={classNames(s.container, disabled && s.container_disabled)}
    >
      <div
        className={classNames(
          s.switch,
          disabled && s.switch_disabled,
          switchState && s.switch_on,
        )}
      >
        <div className={classNames(s.inner, switchState && s.inner_on)}>
        </div>
      </div>
      {text.length > 0 && <p>{text}</p>}
    </div>
  );
};

export default Switch;
