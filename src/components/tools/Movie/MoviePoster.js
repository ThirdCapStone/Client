import "./styles/MoviePoster.scss";
import Movie from "../../../utils/http/movie";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import SwiperCore, { Navigation, Mousewheel, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieComponent from "./MovieComponent";

SwiperCore.use([Navigation, Mousewheel, EffectCoverflow]);

const MoviePoster = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    Movie.loadRankMoviesFromReservation().then((response) => {
      setMovieList(response.data);
    });
  }, []);

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={50}
      centeredSlides={true}
      navigation={{ clickable: true }}
      mousewheel={true}
      scrollbar={true}
      effect="coverflow"
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 50,
        modifier: 1,
        slideShadows: false,
      }}
      direction="horizontal"
      className="movie-poster"
    >
      {movieList.map((data, index) => {
        return (
          <SwiperSlide key={index}>
            <MovieComponent
              idx={data["rownum"]}
              title={data["movieNm"]}
              imgUrl={
                "https://www.kobis.or.kr" +
                data["thumbUrl"].replace("/thumb", "/thumb_x289")
              }
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MoviePoster;
