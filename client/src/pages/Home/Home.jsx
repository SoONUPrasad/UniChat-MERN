import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const Navigate = useNavigate();

  const getUserData = async () => {
    try {
      const authUser = localStorage.getItem("token");
      console.log(authUser);
      if (!authUser) {
        Navigate("/signin");
      }
      const response = await axios.get("http://localhost:8000/api/verify", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setName(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/signin");
  };

  return (
    <>
      <div className="flex justify-center items-center gap-3 h-1/2 w-96">
        <div>Home {name}</div>
        <button
          className="px-6 py-2 bg-black text-white font-bold rounded-lg my-10"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default Home;
