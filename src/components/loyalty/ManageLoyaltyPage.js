import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loadloyaltyData,
  saveLoyaltyData,
} from "../../redux/actions/loyaltyActions";
import { Spinner } from "../common/Spinner";
import LoyaltyForm from "./LoyaltyForm";
import { USERS } from "../../constants";

const ManageLoyaltyPage = ({
  loyaltyData,
  loading,
  loadloyaltyData,
  saveLoyaltyData,
}) => {
  return loading ? (
    <Spinner />
  ) : (
    <LoyaltyForm
      card={loyaltyData}
      users={USERS}
      // errors={errors}
      // saving={saving}
      // onSave={handleSave}
      // onChange={handleChange}
    />
  );
};

ManageLoyaltyPage.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
  loadloyaltyData: PropTypes.func.isRequired,
  saveLoyaltyData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loyaltyData: state.loyaltyData,
  loading: state.apiCallsInProgress > 0,
});

const mapDispatchToProps = {
  loadloyaltyData,
  saveLoyaltyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLoyaltyPage);
