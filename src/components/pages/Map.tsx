import { Map, MapMarker } from "react-kakao-maps-sdk";
import "../styles/Map.scss";

const BeautifulMap = () => {
  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
      </Map>
    </>
  );
};

export default BeautifulMap;
