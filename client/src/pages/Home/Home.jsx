import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
    const [name, setName] = useState("");
  const getUserData = async () => {
    const response = await axios.get("http://localhost:8000/api/verify", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setName(response.data.name);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return <div>Home {name}</div>;
}

export default Home;
