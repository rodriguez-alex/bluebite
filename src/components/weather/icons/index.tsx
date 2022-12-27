import Cloudy from "./cloudy";
import ClearDay from "./clearDay";
import Rain from "./rain";

const WEATHER_ICONS_MAP: { [key: string]: React.ElementType } = {
  "clear-day": ClearDay,
  rain: Rain,
  cloudy: Cloudy,
};

export { WEATHER_ICONS_MAP };
