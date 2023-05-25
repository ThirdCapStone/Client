import "./styles/Loading.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
