import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { HeaderSpinner } from "./Spinner";
import PropTypes from "prop-types";

const Header = ({ cards, loading }) => {
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
        Courses {loading ? <HeaderSpinner /> : cards.length}
      </NavLink>
    </nav>
  );
};

Header.propTypes = {
  cards: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cards: state.cards,
  loading: state.apiCallsInProgress > 0,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
