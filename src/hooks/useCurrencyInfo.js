import { useEffect, useState } from 'react';

const useCurrencyInfo = (baseCurrency) => {
  const [currencyInfo, setCurrencyInfo] = useState({});  // Holds currency data
  const [loading, setLoading] = useState(true);          // Holds loading state

  useEffect(() => {
    const fetchCurrencyInfo = async () => {
      try {
        setLoading(true);  // Set loading to true when data fetch starts
        const response = await fetch(
          `http://data.fixer.io/api/latest?access_key=YOUR_API_KEY&base=${baseCurrency}`
        );
        const data = await response.json();
        setCurrencyInfo(data.rates); // Assuming the API returns rates in 'data.rates'
      } catch (error) {
        console.error('Error fetching currency info:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or error occurs
      }
    };

    fetchCurrencyInfo();
  }, [baseCurrency]);

  return { currencyInfo, loading };  // Return both currency data and loading state
};

export default useCurrencyInfo;
