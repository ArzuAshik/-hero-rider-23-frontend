import { useState } from "react";
import styles from "./ProfilePic.module.css";

const fn = () => {};

export default function ProfilePic({ onChange = fn }) {
  const [input, setInput] = useState(null);

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setInput(reader.result?.toString() || "");
    });
    reader.readAsDataURL(e.target.files[0]);
    onChange({ target: { name: "profilePic", value: e.target.files[0] } });
  };

  return (
    <div className={styles.container}>
      <label className={styles["image-container"]}>
        {input && <img className={styles.img} src={input} />}
        <input
          onChange={handleChange}
          className={styles.input}
          type="file"
          name="profilePic"
          accept=".jpg, .png, .jpeg"
        />
      </label>
      <h4>{!input ? "Select a Profile Picture" : "Profile Picture"}</h4>
    </div>
  );
}
