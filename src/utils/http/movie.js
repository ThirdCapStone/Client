import axios from "axios";
const headers = {
  "Content-Type": "text/plain",
};

class Movie {
  static loadRankMoviesFromReservation = async () => {
    const URL = "/kobis/business/main/searchMainDailyBoxOffice.do";
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
}

export default Movie;
