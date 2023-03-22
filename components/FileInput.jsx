import { useState } from "react";
import styles from "./FileInput.module.css";

const fn = () => {};

export default function FileInput({
  title,
  name,
  accept = ".jpg, .png, .jpeg",
  onChange = fn,
}) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0].name);

    onChange({ target: { name, value: e.target.files[0] } });
  };

  return (
    <div className={styles.container}>
      {file || title}
      <label className={styles.title}>
        {file ? "Change" : "Select File"}
        <input
          name={name}
          accept={accept}
          onChange={handleChange}
          className={styles.input}
          type="file"
        />
      </label>
    </div>
  );
}
