import "./Loading.scss";

const MiniLoading = ({ typing }: { typing: boolean }) => {
  return <div className={`mini-loader ${typing ? "visible" : ""}`}></div>;
};

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="outer-loader"></div>
      <div className="inner-loader"></div>
    </div>
  );
};

export { MiniLoading };
