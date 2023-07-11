import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loadCardNotesFromFirebase,
  saveCardNoteToFirebase,
} from "../../redux/actions/cardNotesActions";
import { Spinner } from "../common/Spinner";

function CardNotes({
  card,
  cardNotes,
  loadCardNotesFromFirebase,
  saveCardNoteToFirebase,
  loading,
}) {
  const [note, setNote] = useState({
    note: "",
    cardId: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    console.log(value);
    setNote({
      note: value,
      cardId: card.id,
    });
  }

  function handleSave(e) {
    e.preventDefault();
    console.log("foo");
    saveCardNoteToFirebase(note);
  }
  return loading ? (
    <Spinner />
  ) : (
    <Card className="text-center">
      <Card.Header>Notes</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        <Table size="sm">
          <tbody>
            {cardNotes?.map((note) => (
              <tr key={note.id}>
                <td>01-01-2023</td>
                <td>{note.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      <Card.Footer className="text-muted">
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
          // onSubmit={handleSave}
        >
          <Form.Control as="textarea" rows={2} onChange={handleChange} />
          <Button
            type="submit"
            variant="primary"
            className="addButton"
            onClick={(e) => handleSave(e)}
          >
            Add Note
          </Button>
        </Form.Group>
      </Card.Footer>
    </Card>
  );
}

CardNotes.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadCardNotesFromFirebase: PropTypes.func.isRequired,
  saveCardNoteToFirebase: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  cardNotes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCardNotesFromFirebase,
  saveCardNoteToFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardNotes);
