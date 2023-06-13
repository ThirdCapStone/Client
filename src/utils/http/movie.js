import axios from "axios";
const headers = {
  "Content-Type": "text/plain",
};

class Movie {
  static loadRankMoviesFromReservation = async () => {
    const URL = "http://localhost:8000/movie";
    const response = await axios
      .post(URL, {
        headers: headers,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.respose;
      });

    return response;
  };

  static loadAllMovieInfo = async () => {
    const URL = `http://localhost:8000/movie/`;
    const response = await axios
      .get(URL, {
        headers: headers,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    return response;
  };

  static loadMovieDetailInfo = async (movieCode) => {
    const URL = `http://localhost:8000/movie/${movieCode}`;
    const response = await axios
      .get(URL, {
        headers: headers,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    return response;
  };
}

export default Movie;
