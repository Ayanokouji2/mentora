// src/hooks/auth.js
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../constants/config";
import { toast } from "sonner";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const login = async (reg_no, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/student/login`,
        { reg_no, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        setData(res.data.data);
        setError(null);
        toast.success(res.data.message);
        return res.data.data;
      } // your API endpoint
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setError({ message: err?.response?.data?.message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, data, error };
};



const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const signup = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/student/signup`,
        { email, password, section, class_name, gender, dob },
        { withCredentials: true }
      );
      if (res.data.success) {
        setData(res.data.data);
        setError(null);
        toast.success(res.data.message);
        return res.data.data;
      } // your API endpoint
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setError({ message: err?.response?.data?.message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, data, error };
};



const useTeacherLogin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const login = async (teacher_id, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/teacher/login`,
        { teacherId:teacher_id, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        setData(res.data.data);
        setError(null);
        toast.success(res.data.message);
        return res.data.data;
      } // your API endpoint
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setError({ message: err?.response?.data?.message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, data, error };
};

export { useLogin, useSignup,useTeacherLogin };
