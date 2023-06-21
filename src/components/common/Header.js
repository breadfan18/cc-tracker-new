import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { backgroundColor: "white", color: "#0080FF" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      <NavLink to="/cards" activeStyle={activeStyle}>
        Cards
      </NavLink>
      <NavLink to="/524" activeStyle={activeStyle}>
        5/24
      </NavLink>
      <NavLink to="/loyalty-accounts" activeStyle={activeStyle}>
        Loyalty
      </NavLink>
    </nav>
  );
};

export default Header;
