import style from "./Status.module.scss";
import classNames from "classnames/bind";

const css = classNames.bind(style);

function Status({ color, status, name }) {
  return (
    <div className={css("status")}>
      {!!name && <span>{name}</span>}
      <div className={css("dimension", { [color]: status })}></div>
    </div>
  );
}

export default Status;
