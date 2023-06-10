import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import LoyaltyList from "./LoyaltyList";
import { connect } from "react-redux";
import { USERS } from "../../constants";
import { titleCase } from "../../helpers";
import CustomAccordion from "../common/CustomAccordion";
import { Card } from "react-bootstrap";

function LoyaltyTabs({ loyaltyData }) {
  const loyaltyByType = loyaltyData.reduce((obj, l) => {
    obj[l.loyaltyType]
      ? obj[l.loyaltyType].push(l)
      : (obj[l.loyaltyType] = [l]);
    return obj;
  }, {});

  const loyaltyTabs = Object.keys(loyaltyByType).map((loyaltyType) => {
    const loyaltyTypeData = loyaltyByType[loyaltyType];
    const loyaltyTypePerUser = loyaltyTypeData.reduce((obj, loyalty) => {
      obj[loyalty.userId]
        ? obj[loyalty.userId].push(loyalty)
        : (obj[loyalty.userId] = [loyalty]);
      return obj;
    }, {});

    const userAccordions = Object.keys(loyaltyTypePerUser).map((user) => {
      const loyaltyAccsForThisUser = loyaltyTypePerUser[user];
      const loyaltyList = (
        <LoyaltyList
          loyaltyData={loyaltyAccsForThisUser}
          // onDeleteClick={handleDeleteCard}
          // deletedCard={deletedCard}
          showEditDelete={true}
        />
      );
      const thisUserName = USERS.find((u) => u.id === parseInt(user)).name;
      return (
        <>
          <Card
            className="text-center"
            style={{ border: "2px solid rgba(0,0,0,1)" }}
          >
            <Card.Header
              style={{
                fontWeight: "bold",
                backgroundColor: "rgba(217,215,215)",
              }}
            >
              {thisUserName}
            </Card.Header>
            <Card.Body>
              <CustomAccordion
                accordionBody={loyaltyList}
                dataType={"Accounts"}
              />
            </Card.Body>
          </Card>
          <br />
        </>
      );
    });

    return (
      <Tab
        eventKey={loyaltyType}
        title={titleCase(loyaltyType)}
        key={loyaltyType}
      >
        {userAccordions}
      </Tab>
    );
  });

  return (
    <Tabs
      defaultActiveKey="airlines"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      {loyaltyTabs}
    </Tabs>
  );
}

LoyaltyTabs.propTypes = {
  loyaltyData: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyTabs);
