import "./styles/Map.scss";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import Theater from "../../utils/http/theater";
import Loading from "../tools/Loading";

const MCMap = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [theaters, setTheaters] = useState([]);
  const [theaterLoading, setTheaterLoading] = useState(true);
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
  useEffect(() => {
    let theater = [];
    Theater.loadTheaterList().then((response) => {
      response.data.forEach((city) => {
        city["gus"].forEach((gu) => {
          theater.push(...gu["theaters"]);
        });
      });
    });
    setTheaters(theater);
    setTheaterLoading(false);
  }, []);
  console.log(location);

  if (location.lat !== 0 && location.long !== 0 && !theaterLoading) {
    return (
      <>
        <Map
          center={{ lat: location.lat, lng: location.long }}
          className="map-container"
        >
          <MarkerClusterer averageCenter={true} minLevel={8}>
            {theaters.map((theater, idx) => {
              if (idx == theaters.length - 1) {
                setTheaterLoading(false);
              }
              return (
                <MapMarker
                  key={theater.theater_seq}
                  position={{ lat: theater.lat, lng: theater.long }}
                >
                  {theater.place_name}
                </MapMarker>
              );
            })}
          </MarkerClusterer>
        </Map>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default MCMap;
