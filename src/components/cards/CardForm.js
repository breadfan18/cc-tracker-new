import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import { CARD_TYPE, ISSUERS, USERS } from "../../constants";
import DateInput from "../common/DateInput";
import RadioInput from "../common/RadioInput";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const CardForm = ({ card, onSave, onChange, saving, errors = {} }) => {
  return (
    <>
      <Form onSubmit={onSave}>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <Row className="mb-3">
          <Col>
            <DateInput
              name="appDate"
              label="Application Date"
              onChange={onChange}
              value={card.appDate}
            />
          </Col>
          <Col>
            <SelectInput
              name="userId"
              label="Card Holder"
              value={card.userId || ""}
              defaultOption="Select Card Holder"
              options={USERS.map((user) => ({
                value: user.id,
                text: user.name,
              }))}
              onChange={onChange}
              error={errors.author}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectInput
              name="issuer"
              label="Issuer"
              value={card.issuer || ""}
              defaultOption="Select Issuer"
              options={ISSUERS.map((issuer) => ({
                value: issuer,
                text: issuer,
              }))}
              onChange={onChange}
              error={errors.author}
            />
          </Col>
          <Col>
            <TextInput
              name="card"
              label="Card"
              value={card.card || ""}
              onChange={onChange}
              error={errors.title}
            />
          </Col>
        </Row>{" "}
        <SelectInput
          name="cardType"
          label="Card Type"
          value={card.cardType}
          defaultOption="Select Card Type"
          options={CARD_TYPE.map((type) => ({
            value: type,
            text: type,
          }))}
          onChange={onChange}
          error={errors.author}
        />
        <Row>
          <Col>
            <TextInput
              name="annualFee"
              label="Annual Fee"
              value={card.annualFee}
              onChange={onChange}
              error={errors.title}
            />
          </Col>
          <Col>
            <DateInput
              name="nextFeeDate"
              label="Next Annual Fee Due"
              onChange={onChange}
              value={card.nextFeeDate}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <RadioInput
              name="inquiries"
              label="Inquiries"
              inquiriesStatus={card.inquiries}
              onChange={onChange}
            />
          </Col>
        </Row>
        <hr />
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary addButton"
        >
          {card.id === null ? "Add Card" : "Save Changes"}
        </button>
      </Form>
    </>
  );
};

CardForm.propTypes = {
  card: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CardForm;
