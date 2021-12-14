import React from "react";
import "./App.css";

import SearchBar from "./components/search-bar";
import CurrentWeather from "./components/current-weather";
import Forecast from "./components/forecast";

import { getWeatherBasedOnLocation } from "./api/weatherAPI";

import * as Api from "./api/weatherAPI";

const FARENHEIT = "farehnheit";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Jaipur",
      metric: FARENHEIT,
      hourlyForecast: [],
      current: "",
      dailyForecast:[],
      
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.updateTemperature = this.updateTemperature.bind(this);

    this.updateTemperature();
  }

  handleLocationChange(location) {
    this.setState({ location });
  }

  async updateTemperature() {
    const weatherRes = await Api.getWeatherBasedOnLocation(this.state.location);
    const forecastRes = await Api.getForecast(
      weatherRes.coord.lat,
      weatherRes.coord.lon
    );

    this.setState({
      current: forecastRes.current,
      metric: FARENHEIT,
      hourlyForecast: forecastRes.hourly,
      dailyForecast:forecastRes.daily,
    });
  }

  render() {
    const location = this.state.location;
    const hourlyForecast = this.state.hourlyForecast;
    const dailyForecast = this.state.dailyForecast;
    const current = this.state.current;

    return (
      <div className="App">
        <header className="App-header">
          <SearchBar
            searchValue={location}
            onSearchChange={this.handleLocationChange}
            onFormSubmit={this.updateTemperature}
          />

          {current && <CurrentWeather current={current} /> }
          {hourlyForecast.length > 0 && <Forecast searchValue={location} day={dailyForecast} forecast={hourlyForecast} />}
        </header>
      </div>
    );
  }
}

export default App;
