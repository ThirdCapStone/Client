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
}

export default Theater;
