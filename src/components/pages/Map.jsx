import "./styles/Map.scss";
import { useEffect } from "react";
import Theater from "../../utils/http/theater";
import { showTheaterAlert } from "../../utils/alert";

const { kakao } = window;

const MCMap = () => {
  let theaters = [];
  useEffect(() => {
    Theater.loadTheaterList().then((response) => {
      theaters = response.data;
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const container = document.querySelector("div.kakao-map");
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
          theaters.forEach((theater, idx) => {
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(theater.lat, theater.long),
            });
            const overlay = new kakao.maps.CustomOverlay({
              position: new kakao.maps.LatLng(
                theater.lat + 0.002,
                theater.long
              ),
              content: `<div class="overlay-container overlay-container-${idx}" style="opacity: 0"><div class="overlay">${theater.place_name}</div></div>`,
            });
            overlay.setMap(kakaoMap);
            kakao.maps.event.addListener(marker, "mouseover", () => {
              document.querySelector(
                `div.overlay-container-${idx}`
              ).style.opacity = 1;
            });
            kakao.maps.event.addListener(marker, "mouseout", () => {
              document.querySelector(
                `div.overlay-container-${idx}`
              ).style.opacity = 0;
            });
            kakao.maps.event.addListener(marker, "click", (e) => {
              console.log(e);
              showTheaterAlert(theater);
            });
            markers.push(marker);
          });
          cluster.addMarkers(markers);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }, []);

  return <div className="kakao-map"></div>;
};

export default MCMap;
