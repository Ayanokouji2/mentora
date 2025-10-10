// src/hooks/auth.js
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../constants/config";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(`${serverUrl}/api/v1/auth/student/login`, { email, password });
      if(res.data.success){
        setData(res.data);
        console.log("from hook",res);
        setError(null);
      } // your API endpoint
      
    } catch (err) {
      setError( { message:err.response?.data?.message|| "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, data, error };
};
