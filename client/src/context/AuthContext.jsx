import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  // const Navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("auth-user")) ||
      localStorage.getItem("token") ||
      null
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/signup", {
        name: name,
        email: email,
        password: password,
      });
      const result = res.data;
      // console.log(result);
      localStorage.setItem("auth-user", JSON.stringify(result));
      setIsAuthenticated(result);
      toast.success("Account Created Successfully");
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
      localStorage.setItem("token", refreshToken);
      setIsAuthenticated(refreshToken);
      toast.success("Account Logged In Successfully");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        email,
        password,
        isAuthenticated,
        setIsAuthenticated,
        setName,
        setEmail,
        setPassword,
        handleSignUp,
        handleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContextProvider;
