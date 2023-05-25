import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <div className="jumbotron">
      <h1>Credit Cards Administration</h1>
      <p>Application to track credit card applications and rewards</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
};

HomePage.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
