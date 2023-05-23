import "./styles/Map.scss";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import Loading from "../tools/MovieLoading";

const BeautifulMap = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    },
    (error) => {
      console.log(error);
    }
  );

  if (location.lat !== 0 && location.long !== 0) {
    return (
      <>
        <Map
          center={{ lat: location.lat, lng: location.long }}
          className="map-container"
        >
          <MapMarker
            className="myPos"
            position={{ lat: location.lat, lng: location.long }}
          />
        </Map>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default BeautifulMap;
