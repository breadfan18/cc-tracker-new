import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loadloyaltyData,
  saveLoyaltyData,
} from "../../redux/actions/loyaltyActions";
import { Spinner } from "../common/Spinner";
import LoyaltyForm from "./LoyaltyForm";
import { toast } from "react-toastify";

const newLoyaltyAcc = {
  id: null,
  loyaltyType: "",
  company: "",
  memberId: "",
  loginId: "",
  password: "",
  userId: null,
};

const ManageLoyaltyPage = ({
  loyaltyData,
  loading,
  loadloyaltyData,
  saveLoyaltyData,
  history,
  ...props
}) => {
  const [loyaltyAcc, setLoyaltyAcc] = useState(newLoyaltyAcc);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loyaltyData.length === 0) {
      loadloyaltyData().catch((error) =>
        alert("Loading loyalty data failed" + error)
      );
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoyaltyAcc((prevValue) => ({
      ...prevValue,
      [name]: name === "id" || name === "userId" ? parseInt(value, 10) : value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaving(true);
    saveLoyaltyData(loyaltyAcc)
      .then(() => {
        toast.success(
          loyaltyAcc.id === null
            ? "Loyalty Account Created"
            : "Loyalty Account Updated"
        );
        history.push("/loyalty-accounts");
      })
      .catch((error) => {
        setSaving(false);
        throw "Error saving account." + error;
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <LoyaltyForm
      loyaltyAcc={loyaltyAcc}
      // errors={errors}
      saving={saving}
      onSave={handleSave}
      onChange={handleChange}
    />
  );
};

ManageLoyaltyPage.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
  loadloyaltyData: PropTypes.func.isRequired,
  saveLoyaltyData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
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
