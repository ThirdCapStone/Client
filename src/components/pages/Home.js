import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Movie from "../../utils/http/movie";
import "./styles/Home.scss";
import MovieComponent from "../tools/Movie/MovieComponent";

const Home = (props) => {
  const [movieList, setMovieList] = useState([]);
  const toLogin = () => {
    props.setIsLoginMount(true);
    setTimeout(() => {
      props.setIsLoginMount(false);
    }, 800);
  };

  useEffect(() => {
    const setValue = async () => {
      const response = await Movie.loadRankMoviesFromReservation();
      setMovieList(response.data);
    };

    setValue();
  }, []);

  return (
    <div className={`home-box ${props.isHomeMount ? `home-box-login` : ``}`}>
      {props.isLoginMount ? <Navigate to="/login" replace /> : ""}
      <div onClick={() => toLogin()}>
        {props.isLogined ? "hello" : "please login"}
      </div>
      <div className="movie-poster">
        {movieList.map((value) => {
          console.log(value["thumbUrl"]);
          console.log(
            `data: https://www.kobis.or.kr/common/mast/movie/2023/05/thumb_x289/thn_5dee449d0802434f83394e1779a3ca0f.jpg`
          );
          return (
            <MovieComponent
              key={value["rownum"]}
              title={value["movieNm"]}
              imgUrl={
                "https://www.kobis.or.kr" +
                value["thumbUrl"].replace("/thumb", "/thumb_x289")
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
