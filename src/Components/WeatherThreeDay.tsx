import React, { useEffect, useState } from 'react';
import { fetchThreeDayWeather } from '../API';

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: { text: string; icon: string };
  };
}

const WeatherThreeDay: React.FC<{ city: string }> = ({ city }) => {
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const getThreeDayWeather = async () => {
      setLoading(true); 
      try {
        const data = await fetchThreeDayWeather(city);
        setForecast(data.slice(0, 3)); 
        setError(null); 
      } catch  {
        setError('Failed to fetch weather data. Please try again.');
      } finally {
        setLoading(false); 
      }
    };
    getThreeDayWeather();
  }, [city]);

  return (
    <div className="weather-three-day">
      <h2>Dự Báo 3 Ngày</h2>
      <h3>Thành phố: {city}</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : forecast ? (
        <div className="three-day-list">
          {forecast.map((day, index) => (
            <div key={index} className="day">
              <p>{day.date}</p>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <p>{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</p>
              <p>{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No forecast data available.</p>
      )}
    </div>
  );
};

export default WeatherThreeDay;
