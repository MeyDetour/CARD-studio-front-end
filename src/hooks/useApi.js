
import { useState, useEffect } from 'react';


export const useApi = (fetchFunction) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchFunction();
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fetchFunction]);

    return { data, loading, error };
};

async function fetchData  (path)  {
    try {
        const response = await fetch(`${API_URL}${path}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("success")
        if (!response.ok) {
            const errorData = await response.json(); // Lire le contenu JSON
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {

        console.log("Erreur fetchData :", error.message);
        throw error;
    }
};
