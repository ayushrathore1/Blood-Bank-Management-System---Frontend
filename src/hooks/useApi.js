import { useState, useEffect } from "react";

export const useApi = (apiFunc, params = null, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = params ? await apiFunc(params) : await apiFunc();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const refetch = async () => {
    try {
      setLoading(true);
      const response = params ? await apiFunc(params) : await apiFunc();
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, setData, refetch };
};
