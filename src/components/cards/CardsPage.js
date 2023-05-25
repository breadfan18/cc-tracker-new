import React, { useEffect } from "react";
import { connect } from "react-redux";

const CardsPage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <h1>Cards Page</h1>
    </>
  );
};

CardsPage.propTypes = {};

function mapStateToProps(state) {}

function mapDispatchToProps(dispatch) {}

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage);
