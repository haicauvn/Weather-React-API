import React, { useState } from 'react';
import WeatherCurrent from './Components/WeatherCurrent';
import WeatherHourly from './Components/WeatherHourly';
import WeatherFiveDay from './Components/WeatherThreeDay';
import './App.css'; 
import backgroundImage from '/src/assets/background.jpg';
const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [view, setView] = useState('current');
  const [error, setError] = useState('');

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setError(''); // Clear any previous errors when city changes
  };

  const validateCity = () => {
    if (!city) {
      setError('Please enter a city name.');
      return false;
    }
    return true;
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="header"><b> Sannie 💚</b></div>
      <header>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button 
          onClick={() => validateCity() && setView('current')} 
          className={view === 'current' ? 'active' : ''}
        >
          Current
        </button>
        <button 
          onClick={() => validateCity() && setView('hourly')} 
          className={view === 'hourly' ? 'active' : ''}
        >
          Hourly
        </button>
        <button 
          onClick={() => validateCity() && setView('3-day')} 
          className={view === '3-day' ? 'active' : ''}
        >
          3-Day
        </button>
      </header>

      {error && <p className="error-message">{error}</p>}

      <div className="weather-info">
        {view === 'current' && city && (
          <div style={{ marginBottom: '5px' }}>
            <WeatherCurrent city={city} />
          </div>
        )}
        {view === 'hourly' && city && (
          <div style={{ marginBottom: '5px' }}>
            <WeatherHourly city={city} />
          </div>
        )}
        {view === '3-day' && city && (
          <div style={{ marginBottom: '5px' }}>
            <WeatherFiveDay city={city} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
