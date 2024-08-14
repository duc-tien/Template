import style from "./Input.module.scss";
import classNames from "classnames/bind";
import { useRef, useEffect, useState } from "react";
import Monitor2 from "@src/pages/Monitor2";

const css = classNames.bind(style);

function Input({ width, height, func }) {
  const [value, setValue] = useState("abc");
  const inputRef = useRef();
  // console.log(inputRef.current);
  useEffect(() => {
    inputRef.current.style.width = width;
    inputRef.current.style.height = height;
  }, []);
  // console.log(value);
  return (
    <>
      <input
        onChange={(e) => func(e.target.value)}
        ref={inputRef}
        className={css("input")}
      />
    </>
  );
}

export default Input;
