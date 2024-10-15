import React, { useEffect, useState } from 'react';
import { fetchHourlyWeather } from '../API';

interface Hour {
  time: string;
  temp_c: number;
  condition: { text: string; icon: string };
}
const WeatherHourly: React.FC<{ city: string }> = ({ city }) => {
  const [hours, setHours] = useState<Hour[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHourlyWeather = async () => {
      try {
        const data = await fetchHourlyWeather(city);
        if (!data) {
          setError("Could not fetch hourly weather for the city.");
        } else {
          setHours(data);
          setError(null); 
        }
      } catch {
        setError("Error fetching weather data.");
      }
    };
    getHourlyWeather();
  }, [city]);

  return (
    <div className="weather-hourly">
      <h2>Thời Tiết Hôm Nay</h2>
      <h3>Thành phố: {city}</h3> 
      {error ? (
        <p className="error-message">{error}</p>
      ) : hours ? (
        <div className="hourly-list">
          {hours.map((hour, index) => (
            <div key={index} className="hour">
              <p>{hour.time}</p>
              <img src={hour.condition.icon} alt={hour.condition.text} />
              <p>{hour.temp_c}°C</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};


export default WeatherHourly;
