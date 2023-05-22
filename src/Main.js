import "./Main.scss";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Home from "./components/pages/Home";
import BeautifulMap from "./components/pages/Map";
import AppBar from "./components/tools/AppBar";
import Book from "./components/pages/Book";

const Main = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const [isToSignup, setIsToSignup] = useState(false);
  const [isToLogin, setIsToLogin] = useState(false);
  const [isToHome, setIsToHome] = useState(false);
  const [homeToLogin, setHomeToLogin] = useState(false);

  return (
    <div className="main-container" data-theme="dark">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            Component={() =>
              isSignup ? (
                <Signup
                  isMount={isToLogin}
                  setIsSignup={setIsSignup}
                  setIsMount={setIsToSignup}
                />
              ) : (
                <Login
                  isSignupMount={isToSignup}
                  isHomeMount={isToHome}
                  isLoginMount={homeToLogin}
                  setIsSignup={setIsSignup}
                  setIsHomeMount={setIsToHome}
                  setIsSignupMount={setIsToLogin}
                  setIsLogined={setIsLogined}
                  setIsLoginMount={setHomeToLogin}
                />
              )
            }
          />
          <Route
            path="/home"
            Component={() => (
              <>
                <AppBar />
                <Home
                  isHomeMount={isToHome}
                  isLoginMount={homeToLogin}
                  isLogined={isLogined}
                  setIsHomeMount={setIsToHome}
                  setIsLogined={setIsLogined}
                  setIsLoginMount={setHomeToLogin}
                />
              </>
            )}
          />
          <Route
            path="/maps"
            Component={() => (
              <>
                <AppBar />
                <BeautifulMap />
              </>
            )}
          />
          <Route path="/book" Component={() => <Book />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
