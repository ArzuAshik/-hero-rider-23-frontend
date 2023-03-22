import Button from "@/components/Button";
import FileInput from "@/components/FileInput";
import Input from "@/components/Input";
import ProfilePic from "@/components/ProfilePic";
import SelectInput from "@/components/SelectInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Form.module.css";

export default function RegisterF() {
  const router = useRouter();
  const [initial, setInitial] = useState(true);
  const [inputs, setInputs] = useState({ vehicleType: "car", type: "learner" });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setInputs((currentState) => {
      return { ...currentState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 1; i <= 8; i++) {
      const puts = { ...inputs };
      const id = `fake-${puts.vehicleType}-${puts.type}-${i}`;
      puts.name = id;
      puts.email = `${id}@mail.com`;
      puts.age = Math.round(Math.random() * 100);
      const formData = new FormData();
      for (const key in puts) {
        formData.append(key, puts[key]);
      }
      try {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseURL}/registration`, {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
      } catch (err) {
        toast.error("Something is Wrong!");
      }
    }
  };

  useEffect(
    () => {
      const user = localStorage.getItem("user");
      if (user) router.push("/");
      else setInitial(false);
    },
    //eslint-disable-next-line
    []
  );

  if (initial) return "";

  return (
    <main>
      <div className={styles["form-container"]}>
        <h2 className={styles["title"]}>Register for a New Account</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <ProfilePic onChange={handleBlur} />
          <Input title="Full Name" onBlur={handleBlur} name="name" />
          <Input title="Email" onBlur={handleBlur} type="email" name="email" />
          <Input title="Age" type="number" onBlur={handleBlur} name="age" />
          <Input title="Address" onBlur={handleBlur} name="address" />
          <Input title="Area" onBlur={handleBlur} name="area" />
          <Input title="Phone Number" onBlur={handleBlur} name="phone" />

          <div className={styles["section"]}>
            <SelectInput
              title="Select Your Account Type"
              onChange={handleBlur}
              name="type"
              options={[
                { value: "learner", title: "Learner" },
                { value: "rider", title: "Rider" },
              ]}
            />
          </div>
          <div className={styles["section"]}>
            <h4 className={styles["section-title"]}>Vehicle Information</h4>
            <SelectInput
              title="Select Your Vehicle Type"
              onChange={handleBlur}
              name="vehicleType"
              options={[
                { value: "car", title: "Car" },
                { value: "bike", title: "Bike" },
              ]}
            />
            {inputs.type === "rider" && (
              <>
                <Input title="Vehicle Brand" onBlur={handleBlur} name="brand" />
                <Input title="Vehicle Model" onBlur={handleBlur} name="model" />
                <Input
                  title="Vehicle Registration Number"
                  onBlur={handleBlur}
                  name="vlnumber"
                />
              </>
            )}
          </div>

          <div className={styles["section"]}>
            <h4 className={styles["section-title"]}>Documents</h4>
            <FileInput onChange={handleBlur} title="NID" name="nid" />
            {inputs.type === "rider" && (
              <FileInput
                onChange={handleBlur}
                title="Driving Licence"
                name="drivingLicence"
              />
            )}
          </div>
          <Input
            onBlur={handleBlur}
            title="Password"
            type="password"
            name="password"
          />
          <Input
            onBlur={handleBlur}
            title="Confirm Password"
            type="password"
            name="confirmPassword"
          />
          <Button type="submit">Register</Button>
        </form>
        <p>
          Already have an Account? <Link href="login">Login</Link>
        </p>
      </div>
    </main>
  );
}
