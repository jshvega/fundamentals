// Types
import type { CurrentWeatherProps } from "../components/CurrentWeather";
import type { WeatherResponse } from "../schemas/weatherSchema";
import type { DailyWeatherProps } from "../components/DailyForecast";
import type { DailyResponse } from "../schemas/dailySchema";
import type { HourlyWeatherProps } from "../components/HourlyForecast";
import type { HourlyResponse } from "../schemas/hourlySchema";
import type { AddlProps } from "../components/Addl";
import type { AddlResponse } from "../schemas/addlSchema";
import type { AirPollutionProps } from "../components/Aqi";
import type { AirPollutionResponse } from "../schemas/airpollutionSchema";
import type { Units } from "../types";

// Components
import WeatherIcon from "../components/WeatherIcon";

// Utils
import {
  formatWind,
  formatVisibility,
  formatDegs,
  formatTemp, 
  formatTempBare, 
  formatTime12h,
  formatHour12h,
  formatTime24h,
  formatWeekday
} from './utils'

export function mapCurrentWeather(weatherData:WeatherResponse, units:Units):CurrentWeatherProps{
    return {
        condition: weatherData.weather[0].description,
        conditionIcon: <WeatherIcon iconCode={weatherData.weather[0].icon}/>,
        temp: formatTempBare(weatherData.main.temp, units),
        time: formatTime12h(weatherData.dt, weatherData.timezone),
        wind: formatWind(weatherData.wind.speed, units),
        humidity: weatherData.main.humidity,
        visibility: formatVisibility(weatherData.visibility, units)
    }
}

export function mapDailyWeather(dailyData:DailyResponse, units:Units):DailyWeatherProps{
    return {
        day: formatWeekday(dailyData.data[0].dt, dailyData?.timezone_offset),
        temp: formatTemp(dailyData.data[0].temp.day, units),
        max: formatTemp(dailyData.data[0].temp.max, units),
        min: formatTemp(dailyData.data[0].temp.min, units),

        strips: dailyData.data.slice(1, 6).map(day=>({
        day: formatWeekday(day.dt, dailyData?.timezone_offset),
        temp: formatTemp(day.temp.day, units),
        max: formatTemp(day.temp.max, units),
        min: formatTemp(day.temp.min, units),
        }))
    }
}

export function mapHourlyWeather(hourlyData:HourlyResponse, units:Units):HourlyWeatherProps{
    return {
        items: hourlyData.data.slice(0, 12).map(item=>({
            time: formatHour12h(item.dt, hourlyData?.timezone_offset),
            icon: <WeatherIcon iconCode={item.weather[0].icon}/>,
            temp: formatTemp(item.temp, units),
        }))
    }
}

export function mapAddl(addlData:AddlResponse):AddlProps{
    return {
        preassure: addlData.data[0].pressure,
        cloudiness: addlData.data[0].clouds,
        uv: addlData.data[0].uvi,
        winddeg: formatDegs(addlData.data[0].wind_deg),
        sunset: formatTime24h(addlData.data[0].sunset, addlData.timezone_offset),
        sunrise: formatTime24h(addlData.data[0].sunrise, addlData.timezone_offset)
    }
}

export function mapAqi(airData:AirPollutionResponse):AirPollutionProps{
    return {
        aqi: airData.list[0].main.aqi,
        pmtwo: Math.round(airData.list[0].components.pm2_5),
        pmten: Math.round(airData.list[0].components.pm10),
        othree: Math.round(airData.list[0].components.o3),
        notwo: Math.round(airData.list[0].components.no2),
        co: Math.round(airData.list[0].components.co)
    }
}