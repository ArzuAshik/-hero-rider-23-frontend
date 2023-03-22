import Button from "@/components/Button";
import Row from "@/components/Row";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Admin() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [data, setData] = useState(false);
  const [load, setLoad] = useState(true);
  const [select, setSelect] = useState([]);
  const [query, setQuery] = useState({
    search: "",
    minAge: 1,
    maxAge: 100,
    page: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery((currentState) => {
      return { ...currentState, page: 1 };
    });
    setLoad(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((currentState) => {
      return { ...currentState, [name]: value };
    });
  };

  const pagination = () => {
    const arr = new Array(data.totalPage);
    arr.fill(1);
    return arr.map((v, i) => {
      return (
        <Button
          active={i + 1 === query.page}
          key={i + 1}
          onClick={() => {
            setQuery((currentState) => {
              return { ...currentState, page: i + 1 };
            });
            setLoad(true);
          }}
        >
          {i + 1}
        </Button>
      );
    });
  };

  const handleCheck = (e, email) => {
    if (e.target.checked) {
      setSelect([...select, email]);
    } else {
      setSelect((currentState) => {
        return currentState.filter((item) => item !== email);
      });
    }
  };

  const handleUpdate = async (status) => {
    setData(false);
    const token = localStorage.getItem("token");
    const req = select.map((email) => {
      return fetch(`${baseURL}/list`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, status }),
      });
    });
    const results = await Promise.all(req);
    toast.success("Update Successful.");
    setLoad(true);
    setSelect([]);
  };

  const handleSelectAll = () => {
    setSelect(data.data.map(({ email }) => email));
  };

  const loadData = async () => {
    setLoad(false);
    const token = localStorage.getItem("token");
    try {
      const { search, minAge, maxAge, page } = query;
      const res = await fetch(
        `${baseURL}/list?search=${search}&minAge=${minAge}&maxAge=${maxAge}&page=${page}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      setData(result);
    } catch (error) {
      toast.error("Something is Wrong!");
    }
  };

  useEffect(() => {
    if (!load) return;
    loadData();
  }, [load]);

  if (!data) return "loading";
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <input
            name="search"
            value={query.search}
            onChange={handleChange}
            style={{ minWidth: 250, padding: 4 }}
            type="text"
            placeholder="Search by name, email or phone"
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <label>
              Age From:
              <input
                name="minAge"
                value={query.minAge}
                onChange={handleChange}
                style={{ maxWidth: 100, padding: 4 }}
                type="number"
              />
            </label>
            <label>
              Age To:
              <input
                name="maxAge"
                value={query.maxAge}
                onChange={handleChange}
                style={{ maxWidth: 100, padding: 4 }}
                type="number"
              />
            </label>
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>
      {select.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 8,
          }}
        >
          <h4>Total {select.length} Users Selected</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <Button onClick={() => handleUpdate("active")}>Active</Button>{" "}
            <Button onClick={() => handleUpdate("block")} variant="danger">
              Block
            </Button>
          </div>
        </div>
      )}
      <table border={1}>
        <thead>
          <tr>
            <th>
              <span onClick={handleSelectAll} style={{ cursor: "pointer" }}>
                Select All
              </span>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Account Type</th>
            <th>Vehicle Type</th>
            <th>Account Status</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map(({ _id, ...user }) => (
            <Row key={_id} {...user} onCheck={handleCheck} select={select} />
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", margin: 8 }}>
        {pagination()}
      </div>
    </div>
  );
}
