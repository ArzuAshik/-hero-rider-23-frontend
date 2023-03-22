import { useState } from "react";
import styles from "./Input.module.css";

const fn = () => {};
export default function Input({
  title = "Input",
  type = "text",
  name,
  placeholder = "",
  value = "",
  onChange,
  onBlur = fn,
}) {
  const [stateValue, setStateValue] = useState(value);

  if (!onChange) onChange = (e) => setStateValue(e.target.value);

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{title}</h5>
      <input
        className={styles.input}
        type={type}
        value={stateValue}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
