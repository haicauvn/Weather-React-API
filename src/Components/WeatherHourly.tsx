import React, { useEffect, useState } from 'react';
import { fetchHourlyWeather } from '../API';

interface Condition {
  text: string;
  icon: string;
}

interface HourlyForecastItem {
  time_epoch: number;
  temp_c: number;
  condition: Condition;
}

const WeatherHourly: React.FC<{ city: string }> = ({ city }) => {
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>([]);

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      const data = await fetchHourlyWeather(city);
      setHourlyForecast(data);
    };
    fetchHourlyForecast();
  }, [city]);

  return (
    <div className="hourly-forecast">
      <h2>Dự Báo Theo Giờ</h2>
      <h3>Thành phố: {city}</h3> 
      {hourlyForecast.length > 0 ? (
        hourlyForecast.map((item: HourlyForecastItem, index: number) => (
          <div key={index} className="hour">
            <span>{new Date(item.time_epoch * 1000).toLocaleTimeString()}</span>
            <span>{item.temp_c}°</span>
            <img src={item.condition.icon} alt={item.condition.text} />
          </div>
        ))
      ) : (
        <p>No hourly data available.</p>
      )}
    </div>
  );
};

export default WeatherHourly;
