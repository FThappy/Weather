import hot from './assets/hot.jpg'
import cold from "./assets/cold.jpg";
import Description from "./components/Description"
import {useEffect, useState} from 'react';
import { getFormattedWeatherData } from './weatherService';

function App() {

  
  const [weather,setWeather] = useState(null);
  const [state,setState] = useState("paris")
  const [units,setUnits] = useState("metric")
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(state,units);
      setWeather(data);
    };
    fetchWeatherData();
  }, [units,state]);
  const handleClick = (e) =>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isC = currentUnit === "C";
    button.innerText = isC ? "°F" : "°C";
    setUnits(isC ? 'metric' : 'imperial')

  }
  const enterKeyPressd = (e) =>{
    if(e.keyCode === 13)
    {
      setState(e.currentTarget.value)
    }
  }
  return (
    <div className="app" style={{ backgroundImage: `url(${hot})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section_inputs">
              <input
                type="text"
                name="city"
                onKeyDown={enterKeyPressd}
                placeholder="Enter City......."
              />
              <button
                onClick={(e)=> handleClick(e)
                }
              >
                °F
              </button>
            </div>

            <div className="section section_temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}${
                  units === "metric" ? "°C" : "°F"
                }`}</h1>
              </div>
            </div>
            {/* bottom */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
