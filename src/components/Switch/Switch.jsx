import style from "./Switch.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const css = classNames.bind(style);

function Switch({ status, name }) {
  const [active, setActive] = useState(status);

  const back = css("back", { activeColor: status || active });
  const circle = css("toggle", { active: status || active });

  return (
    <div className={css("switch")}>
      <span>{name}</span>
      <div className={back}>
        <div className={circle}></div>
      </div>
    </div>
  );
}

export default Switch;
