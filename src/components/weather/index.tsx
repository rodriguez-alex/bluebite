import { useCallback, useEffect, useState } from "react";
import { Cloudy } from "./icons";
import { api } from "../../shared/api";

interface WeatherProps {
  lat?: string;
  lon?: string;
}

interface UpcommingWeatherData {
  day: string;
  condition: string;
  conditionName: string;
}

interface WeatherData {
  condition: string;
  conditionName: string;
  lat: string;
  location: string;
  lon: string;
  temperature: number | string;
  unit: string;
  upcomming: UpcommingWeatherData[];
}

const defaultWeather = {
  condition: "--",
  conditionName: "--",
  lat: "--",
  location: "--",
  lon: "--",
  temperature: "--",
  unit: "--",
  upcomming: [],
};

const Weather = ({ lat, lon }: WeatherProps) => {
  const [weather, setWeather] = useState<WeatherData>(defaultWeather);
  const getWeather = useCallback(() => {
    return api.get(`/integration/weather?lat=${lat}&lon=${lon}`).then((res) => {
      const { data: weather } = res.data;
      setWeather(weather);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  console.log("weather", weather);

  interface FutureWeatherProps {
    upcomingWeather: UpcommingWeatherData[];
  }

  const FutureWeather = ({ upcomingWeather }: FutureWeatherProps) => {
    return upcomingWeather.map((val, index) => {
      return (
        <>
          <Cloudy />
          <div>{val.day}</div>
        </>
      );
    });
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <div>
        <div>
          <Cloudy />
        </div>
        <div>
          <div>
            {weather.temperature} {weather.unit}
          </div>
          {weather.conditionName}
        </div>
      </div>

      <div className="upcoming-weather">
        <>{FutureWeather({ upcomingWeather: weather.upcomming })}</>
      </div>
    </div>
  );
};

export default Weather;
