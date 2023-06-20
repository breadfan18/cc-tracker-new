import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Credit Cards Administration</h1>
      <p>Application to track credit card applications and rewards</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
}
