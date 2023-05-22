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

  static getTheaterList = async () => {
    const URL =
      "/kobis/business/mast/thea/findBasareaCdList.do?CSRFToken=HgMAHNIl1l4gllyVmp7LOG6bExrD_B6SlsXo17bfqSQ";

    const response = await axios
      .post(URL, { headers: headers })
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
