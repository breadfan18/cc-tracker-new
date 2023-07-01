import React from "react";
import PropTypes from "prop-types";

function LoyaltyCardText({ account, dataType }) {
  const setLoyaltyAccountType = (account, dataType) => {
    switch (dataType) {
      case "memberId":
        return {
          fieldName: "Member ID",
          value: account.memberId,
        };
      case "loginId":
        return {
          fieldName: "User Name",
          value: account.loginId,
        };
      case "password":
        return {
          fieldName: "Password",
          value: account.password,
        };
      default:
        break;
    }
  };

  const loyaltyAccountType = setLoyaltyAccountType(account, dataType);
  return (
    <p className="mb-0 text-muted">
      <small>
        <b style={{ color: "black" }}>{loyaltyAccountType.fieldName}</b>
        {": "}
        {loyaltyAccountType.value}
      </small>
    </p>
  );
}

LoyaltyCardText.propTypes = {
  account: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default LoyaltyCardText;
