import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import "./styles/Map.scss";

const BeautifulMap = () => {
  const [location, setLocation] = useState({});
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    },
    (error) => console.log(error)
  );
  return (
    <>
      <Map
        center={{ lat: location.lat, lng: location.long }}
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker
          className="myPos"
          position={{ lat: location.lat, lng: location.long }}
        />
      </Map>
    </>
  );
};

export default BeautifulMap;
