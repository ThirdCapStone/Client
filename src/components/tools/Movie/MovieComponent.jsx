import { Link } from "react-router-dom";
import "./styles/MovieComponent.scss";

const MovieComponent = ({ movie }) => {
  return (
    <Link className="movie" to={`/movie/${movie.movie_code}`}>
      <img
        src={movie.main_poster}
        className="movie-img"
        alt={movie.korean_title_name}
      />
      <div className="title">{movie.korean_movie_name}</div>
      <div className="sub-title">{movie.english_movie_name}</div>
      <div className="sort">{movie.movie_sort}</div>
      <div className="genres">장르: {movie.genres.join(", ")}</div>
      <div className="required-age">{movie.required_age}</div>
      <div className="release-date">개봉일: {movie.release_date}</div>
      <span style={{ marginLeft: "1vh" }}>평점: </span>
      <span className="rating-rate">{movie.rating}</span>
      <span>예매율: </span>
      <span className="reservation-rate">{movie.reservation_rate}</span>
    </Link>
  );
};

export default MovieComponent;
