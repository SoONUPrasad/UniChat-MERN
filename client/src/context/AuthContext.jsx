import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
    const Navigate = useNavigate();

    // const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') || null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/signup", {
                name: name,
                email: email,
                password: password,
            });
            toast.success("Account Created Successfully");
            setTimeout(() => {
                Navigate("/");
            }, 1000);
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8000/api/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );
            const refreshToken = res.data.tokens.refreshToken;
            // console.log(res.data);
            localStorage.setItem('token', refreshToken);
            toast.success("Account Logged In Successfully");
            setTimeout(() => {
                Navigate("/");
            }, 1000);
            setName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.log(error);
        }
    }

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

    return (
        <AuthContext.Provider value={{ name, userName, onlineUsers, email, password, setName, setUserName, setOnlineUsers, setEmail, setPassword, handleSignUp, handleSignIn, getData, getOnlineUsers }}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider;