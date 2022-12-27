import { useCallback, useEffect, useState } from "react";
import { WEATHER_ICONS_MAP } from "./icons";
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

  interface FutureWeatherProps {
    upcomingWeather: UpcommingWeatherData[];
  }

  // NOTE: a function that can be extracted out of this component and exported
  // if other new or old weather components want to use these set of SVG icons
  const getWeatherIcon = (condition: string): any => {
    if (condition && condition !== "--") {
      const Icon = WEATHER_ICONS_MAP[condition];
      return <Icon />;
    }
    return null;
  };

  const FutureWeather = ({ upcomingWeather }: FutureWeatherProps) => {
    return upcomingWeather.map((val, index) => {
      return (
        <div key={index}>
          {getWeatherIcon(val.condition)}
          <div>{val.day}</div>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        border: "1px solid black",
        background: "#fff",
        maxWidth: "330px",
        borderRadius: 10,
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
      }}
    >
      <div style={{ display: "flex", width: "50%" }}>
        <div style={{ maxWidth: "40%" }}>
          {getWeatherIcon(weather.condition)}
        </div>
        <div>
          <div style={{ fontSize: "24px" }}>
            {weather.temperature}
            {"°"} {weather.unit.toUpperCase()}
          </div>
          {weather.conditionName}
        </div>
      </div>

      <div className="upcoming-weather" style={{ width: "50%" }}>
        <span style={{ display: "block", textAlign: "right" }}>
          {weather.location}
        </span>
        <div style={{ display: "flex" }}>
          {FutureWeather({ upcomingWeather: weather.upcomming })}
        </div>
      </div>
    </div>
  );
};

export default Weather;
