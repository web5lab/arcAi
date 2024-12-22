import { useState, useEffect } from 'react';




export function useLiveChartData(initialData) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastPoint = data[data.length - 1];
      const basePrice = lastPoint.value;
      const volatility = basePrice * 0.001; // 0.1% volatility
      const newPrice = basePrice + (Math.random() - 0.5) * volatility;
      
      const newPoint = {
        time: (Date.now() / 1000) ,
        value: newPrice
      };

      setData(prevData => [...prevData.slice(-365), newPoint]);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [data]);

  return data;
}