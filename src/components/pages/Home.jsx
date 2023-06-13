import "./styles/Home.scss";
import Movie from "../../utils/http/movie";
import Loading from "../tools/Loading";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Mousewheel, Keyboard } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { MSCButton } from "../tools/Button";

const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Movie.loadAllMovieInfo().then((response) => {
      response.data.slice(0, 10).forEach((movie) => {
        console.log(movie.movie_code);
        Movie.loadMovieDetailInfo(movie.movie_code).then((resp) => {
          setMovies((prev) => [...prev, resp.data]);
        });
      });

      setIsLoading(false);
    });
  }, []);

  return !isLoading ? (
    <div className="home-container">
      <div className={`home-box ${props.isHomeMount ? `home-box-login` : ``}`}>
        <Swiper
          loop={true}
          loopedSlides={0}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          mousewheel={true}
          keyboard={true}
          pagination={true}
          modules={[EffectFade, Autoplay, Pagination, Mousewheel, Keyboard]}
          effect={"fade"}
          direction="horizontal"
          className="home-poster-container"
        >
          {movies.map((movie, index) => {
            const directors = movie.staff
              .filter((person) => {
                return person.roleNm == "감독";
              })
              .map((person) => {
                return person.peopleNm;
              });

            const actors =
              movie.casts.length > 0
                ? movie.casts.map((person) => {
                    return `${person.peopleNm}(${person.repRoleNm})`;
                  })
                : ["정보 없음"];

            return (
              <SwiperSlide key={index}>
                {movie.steel_cuts !== null ? (
                  <img src={movie.steel_cuts[0]} className="home-poster" />
                ) : (
                  <div className="home-poster"></div>
                )}
                <div className="title">{movie.korean_movie_name}</div>
                <div className="sub-title">{movie.english_movie_name}</div>
                <div className="summary">
                  {movie.summary.length > 200
                    ? movie.summary.slice(0, 200) + "..."
                    : movie.summary}
                </div>
                <div className="age">{movie.required_age}</div>
                <div className="running-time">
                  상영 시간: {movie.running_time}
                </div>
                <div className="release-date">개봉일: {movie.release_date}</div>
                <div className="genres">장르: {movie.genres.join(", ")}</div>
                <div className="staff-container">
                  <div className="director">
                    감독:
                    {directors.length == 0 ? "정보 없음" : directors.join(", ")}
                  </div>
                  <div className="actors">
                    배우:
                    {actors.join(", ").length > 30
                      ? actors.join(", ").slice(0, 30) + "..."
                      : actors.join(", ")}
                  </div>
                </div>

                <MSCButton
                  type="button"
                  text="영화 상세정보"
                  className="home-container-button"
                  onClick={() => {
                    navigate(`/movie/${movie.movie_code}`);
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
