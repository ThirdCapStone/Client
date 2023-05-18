import "./styles/MovieComponent.scss";

interface MovieProps {
  idx: number;
  title: string;
  imgUrl: string;
}

const MovieComponent = (props: MovieProps) => {
  return (
    <div className={`movie movie-${props.idx}`}>
      <div>{props.title}</div>
      <img src={props.imgUrl} />
    </div>
  );
};

export default MovieComponent;
