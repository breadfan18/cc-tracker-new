import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadloyaltyData } from "../../redux/actions/loyaltyActions";
import { Spinner } from "../common/Spinner";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import LoyaltyTabs from "./LoyaltyTabs";
import { addUserNameToCard } from "../../helpers";

const LoyaltyPage = ({ loyaltyData, loadloyaltyData, loading }) => {
  const [redirectToAddLoyaltyPage, setRedirect] = useState(false);

  useEffect(() => {
    if (loyaltyData.length === 0) {
      loadloyaltyData();
    }
  }, []);
  return (
    <>
      {redirectToAddLoyaltyPage && <Redirect to="/loyalty" />}
      <h2>Loyalty Information</h2>
      {loading ? (
        <Spinner />
      ) : (
        <LoyaltyTabs loyaltyData={loyaltyData} showEditDelete={true} />
      )}
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-course"
        onClick={() => setRedirect(true)}
      >
        Add Loyalty
      </button>
    </>
  );
};

LoyaltyPage.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
  loadloyaltyData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loyaltyData: state.loyaltyData.map((l) => addUserNameToCard(l)),
  loading: state.apiCallsInProgress > 0,
});

const mapDispatchToProps = {
  loadloyaltyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyPage);
