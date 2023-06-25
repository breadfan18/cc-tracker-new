import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CardsPage from "./cards/CardsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageCardPage from "./cards/ManageCardPage";
import FiveTwentyFourPage from "./524/FiveTwentyFourPage";
import LoyaltyPage from "./loyalty/LoyaltyPage";
import ManageLoyaltyPage from "./loyalty/ManageLoyaltyPage";
import Test from "./testing/UseEffectTest";
import Checkbox from "./testing/Checkbox";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  return (
    <>
      <div className="navContainer">
        <Header windowWidth={windowWidth} />
      </div>
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route
            path="/cards"
            render={() => <CardsPage windowWidth={windowWidth} />}
          />
          <Route path="/card/:id" component={ManageCardPage} />
          <Route path="/card" component={ManageCardPage} />
          <Route
            path="/524"
            render={() => <FiveTwentyFourPage windowWidth={windowWidth} />}
          />
          <Route
            path="/loyalty-accounts"
            render={() => <LoyaltyPage windowWidth={windowWidth} />}
          />
          <Route path="/loyalty/:id" component={ManageLoyaltyPage} />
          <Route path="/loyalty" component={ManageLoyaltyPage} />
          <Route path="/use-effect" component={Test} />
          <Route path="/test" component={Checkbox} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    </>
  );
}

export default App;
