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
import { deleteLoyaltyData } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import _ from "lodash";

function LoyaltyTabs({ loyaltyData, deleteLoyaltyData }) {
  function handleDelete(loyalty) {
    deleteLoyaltyData(loyalty).then(() => {
      toast.success("Loyalty Account Deleted");
    });
  }

  const loyaltyByType = _.groupBy(loyaltyData, (o) => o.loyaltyType);
  const loyaltyTabs = Object.keys(loyaltyByType).map((loyaltyType) => {
    const loyaltyTypeData = loyaltyByType[loyaltyType];
    const loyaltyTypePerUser = _.groupBy(loyaltyTypeData, (o) => o.userId);
    const userCards = Object.keys(loyaltyTypePerUser).map((user) => {
      const loyaltyAccsForThisUser = loyaltyTypePerUser[user];
      const loyaltyList = (
        <LoyaltyList
          loyaltyData={loyaltyAccsForThisUser}
          onDeleteClick={handleDelete}
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
                defaultKey="1"
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
        {userCards}
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
  deleteLoyaltyData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
  };
}

const mapDispatchToProps = {
  deleteLoyaltyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoyaltyTabs);
