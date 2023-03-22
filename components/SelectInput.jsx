import styles from "./SelectInput.module.css";

const fn = () => {};

export default function SelectInput({
  title,
  name,
  options = [],
  onChange = fn,
}) {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{title}</h5>
      <select name={name} onChange={onChange} className={styles.select}>
        {options.map(({ value, title }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
}
