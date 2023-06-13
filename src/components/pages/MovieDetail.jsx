import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieCode } = useParams();
  return <h1>{movieCode}</h1>;
};

export default MovieDetail;
