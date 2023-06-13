import axios from "axios";

class Theater {
  static loadTheaterList = async () => {
    const response = await axios
      .get("http://localhost:8000/theater")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    return response;
  };

  static loadCityList = async () => {
    const response = await axios
      .get("http://localhost:8000/cities")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    return response;
  };

  static loadGuList = async () => {
    const response = await axios
      .get("http://localhost:8000/gus")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    return response;
  };

  static loadGuListWithCitySeq = async (city_seq) => {
    const response = await axios
      .get(`http://localhost:8000/cities/${city_seq}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    return response;
  };

  static loadTheaterListWithGuSeq = async (gu_seq) => {
    const response = await axios
      .get(`http://localhost:8000/gus/${gu_seq}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    return response;
  };
}

export default Theater;
