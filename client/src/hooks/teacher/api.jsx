
const useTecaherList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    const getTeacherList = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.post(
          `${serverUrl}/api/v1/auth/teacher/`,
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
  
    return { getTeacherList, loading, data, error };
  };
  
  export { useTecaherList };