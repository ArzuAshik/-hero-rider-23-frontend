import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Form.module.css";

export default function login() {
  const router = useRouter();
  const [initial, setInitial] = useState(true);
  const [inputs, setInputs] = useState({});

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setInputs((currentState) => {
      return { ...currentState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in inputs) {
      formData.append(key, inputs[key]);
    }

    try {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const result = await res.json();
      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.data));
        router.push("/");
      }
    } catch (err) {
      toast.error("Something is Wrong!");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) router.push("/");
    else setInitial(false);
  }, []);

  if (initial) return "";

  return (
    <main>
      <div className={styles["form-container"]}>
        <h2 className={styles["title"]}>Login to Your Account</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input title="Email" onBlur={handleBlur} type="email" name="email" />
          <Input
            title="Password"
            onBlur={handleBlur}
            type="password"
            name="password"
          />
          <Button type="submit">Login</Button>
        </form>
        <p>
          Don't have an Account?{" "}
          <Link href="register">Create a new Account</Link>
        </p>
      </div>
    </main>
  );
}
