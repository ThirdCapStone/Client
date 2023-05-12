import "./Main.scss";

import { useState } from "react";
import Login from "./pages/account/Login";
import Signup from "./pages/account/Signup";

const Main = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isToSignup, setIsToSignup] = useState(false);
  const [isToLogin, setIsToLogin] = useState(false);

  return (
    <div className="main-container" data-theme="dark">
      {isSignup ? (
        <Signup
          isMount={isToLogin}
          setIsSignup={setIsSignup}
          setIsMount={setIsToSignup}
        />
      ) : (
        <Login
          isMount={isToSignup}
          setIsSignup={setIsSignup}
          setIsMount={setIsToLogin}
        />
      )}
    </div>
  );
};

export default Main;
