import "./Main.scss";
import "react-toastify/dist/ReactToastify.css";

import { useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import CSSTransition from "react-transition-group/CSSTransition";
import Login from "./pages/account/Login";
import Signup from "./pages/account/Signup";
import { ToggleLoginButton } from "./pages/ui/tools//Button";

const Main = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const nodeRef = useRef(null);

  return (
    <div className="main-container">
      <ToggleLoginButton
        isSignup={isSignup}
        setIsSignup={setIsSignup}
        setIsMount={setIsMount}
      />
      <CSSTransition
        nodeRef={nodeRef}
        in={isMount}
        timeout={400}
        classNames="box"
        onEntered={() => {
          setIsMount(false);
        }}
      >
        {isSignup ? <Signup ref={nodeRef} /> : <Login ref={nodeRef} />}
      </CSSTransition>
      <ToastContainer theme="dark" limit={1} />
    </div>
  );
};

export default Main;
