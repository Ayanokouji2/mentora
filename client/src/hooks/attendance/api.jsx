import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../constants/config";
import { toast } from "sonner";

const useAttendanceSheet = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getAttendanceSheet = async (class_name, section, period, date) => {
    const toastId = toast.loading("Generating attendance..."); // loading toast
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        `${serverUrl}/api/v1/attendance/generate`,
        { class_name, section, period, date },
        { withCredentials: true }
      );

      if (res.data.success) {
        setData(res.data.data);
        setError(null);
        toast.success(res.data.message, { id: toastId }); // replace loading with success
        return res.data.data;
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message, { id: toastId }); // replace loading with error
      setError({ message });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getAttendanceSheet, loading, data, error };
};

export { useAttendanceSheet };
