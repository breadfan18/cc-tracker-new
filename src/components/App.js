import React from "react";
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

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/cards" component={CardsPage} />
        <Route path="/card/:id" component={ManageCardPage} />
        <Route path="/card" component={ManageCardPage} />
        <Route path="/524" component={FiveTwentyFourPage} />
        <Route path="/loyalty-accounts" component={LoyaltyPage} />
        <Route path="/loyalty/:id" component={ManageLoyaltyPage} />
        <Route path="/loyalty" component={ManageLoyaltyPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
