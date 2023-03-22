import { useState } from "react";
import { toast } from "react-toastify";

const styles = {
  center: { textAlign: "center" },
  uppercase: { textTransform: "uppercase" },
  centerUpper: { textAlign: "center", textTransform: "uppercase" },
};
export default function Row(props) {
  const {
    name,
    email,
    age,
    type,
    vehicleType,
    status,
    phone,
    payment = "",
    onCheck,
    select,
  } = props;
  const [userStatus, setUserStatus] = useState(status);

  const handleChange = async (e) => {
    setUserStatus(e.target.value);
    const token = localStorage.getItem("token");

    try {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseURL}/list`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, status: e.target.value }),
      });
      const result = await res.json();
    } catch (err) {
      toast.error("Something is Wrong!");
    }
  };

  return (
    <tr>
      <td style={styles.center}>
        <input
          checked={select.includes(email)}
          onChange={(e) => onCheck(e, email)}
          style={{ cursor: "pointer" }}
          type="checkbox"
        />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td style={styles.centerUpper}>{phone}</td>
      <td style={styles.centerUpper}>{age}</td>
      <td style={styles.centerUpper}>{type}</td>
      <td style={styles.centerUpper}>{vehicleType}</td>
      <td style={styles.center}>
        <select name="status" value={userStatus} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="block">Block</option>
        </select>
      </td>
      <td style={styles.center}>
        {type === "learner" ? (
          payment ? (
            `$${payment}`
          ) : (
            <span style={{ color: "red" }}>Unpaid</span>
          )
        ) : (
          "N/A"
        )}
      </td>
    </tr>
  );
}
