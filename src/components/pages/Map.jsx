import "./styles/Map.scss";
import { useEffect } from "react";
import Theater from "../../utils/http/theater";

const { kakao } = window;

const MCMap = () => {
  let theaters = [];
  useEffect(() => {
    Theater.loadTheaterList().then((response) => {
      response.data.forEach((city) => {
        city["gus"].forEach((gu) => {
          theaters = theaters.concat(gu["theaters"]);
        });
      });
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(
              location.coords.latitude,
              location.coords.longitude
            ),
            level: 5,
          };
          const kakaoMap = new kakao.maps.Map(container, options);
          let personMarkerImage = new kakao.maps.MarkerImage(
            "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
            new kakao.maps.Size(42, 42)
          );
          let personMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              location.coords.latitude,
              location.coords.longitude
            ),
            image: personMarkerImage,
          });
          personMarker.setMap(kakaoMap);
          const cluster = new kakao.maps.MarkerClusterer({
            map: kakaoMap,
            averageCenter: true,
            minLevel: 8,
          });
          let markers = [];
          theaters.forEach((theater) => {
            markers.push(
              new kakao.maps.Marker({
                position: new kakao.maps.LatLng(theater.lat, theater.long),
              })
            );
          });
          cluster.addMarkers(markers);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }, []);

  return <div id="map" style={{ width: "100vw", height: "100%" }}></div>;
};

export default MCMap;
