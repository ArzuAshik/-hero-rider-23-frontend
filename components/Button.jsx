import styles from "./Button.module.css";

const fn = () => {};

export default function Button({
  children,
  onClick = fn,
  type = "button",
  variant = "primary",
  disabled = false,
  active,
}) {
  return (
    <button
      style={active ? { outline: "2px solid red" } : {}}
      disabled={disabled}
      className={`${styles[variant]} ${styles.btn}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
