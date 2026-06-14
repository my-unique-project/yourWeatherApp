import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import location from './location_icon.png';
import windas from './wind_icon.png'

function MyMain() {
  const [temperature, setTemp] = useState(null);
  const [wind, setWind] = useState(null);
  const [name, setName] = useState(null);
  const [locationDeny, setDeny] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      function fetchLocation(data) {
        let liveLatitude = data.coords.latitude;
        let liveLongitude = data.coords.longitude;

        let myap = `https://api.openweathermap.org/data/2.5/weather?lat=${liveLatitude}&lon=${liveLongitude}&appid=e405b5324908da8d44e445b9c12b6bbb&units=metric`;

        async function liveData() {
          try {
            let get_data = await fetch(myap);
            let converted_json = await get_data.json();
            setTemp(Math.round(converted_json.main.temp));
            setName(converted_json.name);
            setWind(`${Math.round(converted_json.wind.speed)} kmph`);
            setLoading(false);
            console.log(converted_json);
          } catch (err) {
            setApiError("Failed to fetch data")
            setLoading(false);
          }

        }
        liveData();

      }
      function fetchError() {
        setDeny("Trun On Location Service")
        console.log("Failed");
      }
      navigator.geolocation.getCurrentPosition(fetchLocation, fetchError);
      return () => {
      }
    }, []
  )

  return (
    <>
      {locationDeny ? (
        <div id="main">
          <p style={{ color: "red", fontSize: "2rem" }}>{locationDeny}</p>
        </div>
      ) : (
        <>
          {apiError ? (
            <h1 style={{ color: "red", textAlign: "center", marginTop: "50vh" }}>{apiError}</h1>
          ) : (
            <div id="main">
              <div id="data">
                <div id="position_for_location">

                  {loading ? (<span style={{ display: "none" }}><img src={location} alt="location" /></span>) : (<span><img src={location} alt="location" /></span>)}
                  <span id="city">{name}</span>
                </div>

                {loading ? (<h1 id="temp" style={{ display: "none" }}>{temperature}°</h1>) : (<h1 id="temp">{temperature}°</h1>)}

                <div id="position_for_wind">
                  {loading ? (<span style={{ display: "none" }}><img src={windas} id="wind_icon" alt="wind" /></span>) : (<span><img src={windas} id="wind_icon" alt="wind" /></span>)}

                  <span><p id="wind"> {wind}</p></span>
                  {loading ? (<p style={{ fontSize: "2rem" }}>Fetching Weather Data...</p>) : (<p style={{ display: "none" }}>Loading...</p>)}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default MyMain;