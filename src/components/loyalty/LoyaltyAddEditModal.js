import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveLoyaltyData } from "../../redux/actions/loyaltyActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { PROGRAMS } from "../../constants";
import { maskPwd } from "../../helpers";
import LoyaltyForm from "./LoyaltyForm";

const newLoyaltyAcc = {
  id: null,
  loyaltyType: "",
  program: null,
  memberId: "",
  loginId: "",
  password: "",
  userId: null,
};

function LoyaltyAddEditModal({ loyaltyAcc, saveLoyaltyData }) {
  console.log("Re-Render");
  const [loyaltyAccForModal, setLoyaltyAccForModal] = useState(
    loyaltyAcc ? { ...loyaltyAcc } : newLoyaltyAcc
  );
  const [programsFilteredByType, setFilteredPrograms] = useState([]);

  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "loyaltyType") {
      const filteredPrograms = PROGRAMS.filter(
        (program) => program.type === value
      );
      setFilteredPrograms(filteredPrograms);
    }

    setLoyaltyAccForModal((prevValue) => ({
      ...prevValue,
      [name]:
        name === "id" || name === "userId"
          ? parseInt(value, 10)
          : name === "program"
          ? PROGRAMS.find((program) => program.id === parseInt(value))
          : value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaving(true);
    loyaltyAccForModal.password = maskPwd(loyaltyAccForModal.password);

    saveLoyaltyData(loyaltyAccForModal)
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

    toggleShow();
  };
  return (
    <>
      {loyaltyAccForModal.id ? (
        <Button
          variant="success"
          onClick={toggleShow}
          className="rounded-circle"
        >
          <MdModeEditOutline />
        </Button>
      ) : (
        <Button variant="primary" onClick={toggleShow}>
          Add Account
        </Button>
      )}

      <Modal show={show} onHide={toggleShow}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>
            {loyaltyAccForModal.id ? "Edit" : "Add"} Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoyaltyForm
            loyaltyAcc={loyaltyAccForModal}
            saving={saving}
            onSave={handleSave}
            onChange={handleChange}
            filteredPrograms={programsFilteredByType}
            // errors={errors}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

LoyaltyAddEditModal.propTypes = {
  loyaltyAcc: PropTypes.object.isRequired,
  saveLoyaltyData: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  saveLoyaltyData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoyaltyAddEditModal);
