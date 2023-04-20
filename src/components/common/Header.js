import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { HeaderSpinner, Spinner } from "./Spinner";
import PropTypes from "prop-types";

const Header = ({ authors, courses, loading }) => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses {loading ? <HeaderSpinner /> : courses.length}
      </NavLink>
      {" | "}
      <NavLink to="/authors" activeStyle={activeStyle}>
        Authors {loading ? <HeaderSpinner /> : authors.length}
      </NavLink>
    </nav>
  );
};

Header.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authors: state.authors,
  courses: state.courses,
  loading: state.apiCallsInProgress > 0,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
