import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  return useContext(UserContext);
};

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/verify", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setUserName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const getOnlineUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/onlineUsers", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = res.data;
      // console.log(data);
      setOnlineUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getOnlineUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        onlineUsers,
        setOnlineUsers,
        getData,
        getOnlineUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
