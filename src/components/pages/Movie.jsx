import "./styles/Movie.scss";
import { useState, useEffect } from "react";
import Movie from "../../utils/http/movie";
import Loading from "../tools/Loading";
import MovieComponent from "../tools/Movie/MovieComponent";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Movie.loadAllMovieInfo().then((response) => {
      setMovies(response.data);
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="movie-container">
      <div className="movie-box">
        {movies.map((movie, idx) => {
          return <MovieComponent key={idx} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default MoviePage;
