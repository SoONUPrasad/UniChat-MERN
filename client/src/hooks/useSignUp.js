import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import axios from "axios";


const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();

    const handleSignUp = async ({ name, email, password }) => {
        if (!name || !email || !password) {
            toast.error("all fields required");
            return;
        }
        setLoading(true);
        try {
            await axios.post("http://localhost:8000/api/signup", {
                name,
                email,
                password,
            })
            setLoading(false);
            setTimeout(() => {
                Navigate("/");
            }, 1000);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            console.log(error);
        }
    };
    return { handleSignUp, loading };
}

export default useSignUp;