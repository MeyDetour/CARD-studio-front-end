import { useState, useEffect, useCallback } from "react";
import { apiClient } from "../api/api";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { useNotificationContext } from "../context/NotificationContext";

export const useApi = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { deleteToken } = useUserContext();
  const { displayError } = useNotificationContext();
 
  function resetError() {
    setError(null);
  }

  const fetchData = useCallback(
    async (path, body = null, params = {},formData=null) => {
      setLoading(true);
      try {
        const response = await apiClient(`${path}`, body, params,formData);
        setResult(response);
        return response;
      } catch (err) {
        if (err.message === "UNAUTHORIZED") {
          deleteToken();
          navigate("/login");
        }
        setError(err.message);
        displayError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  return { result, loading, error, fetchData, resetError };
};
