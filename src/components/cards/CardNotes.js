import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveCardNoteToFirebase } from "../../redux/actions/cardNotesActions";
import { Spinner } from "../common/Spinner";
import { formatDate } from "../../helpers";
import { NEW_NOTE } from "../../constants";

function CardNotes({ card, cardNotes, saveCardNoteToFirebase, loading }) {
  const [note, setNote] = useState(NEW_NOTE);

  function handleChange(e) {
    setNote({
      note: e.target.value,
      cardId: card.id,
      date: new Date().toISOString().split("T")[0],
    });
  }

  function handleSave(e) {
    e.preventDefault();
    saveCardNoteToFirebase(note);
    setNote(NEW_NOTE);
  }

  return loading ? (
    <Spinner />
  ) : (
    <Card className="text-center">
      <Card.Header id="notesCardHeader">Notes</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        <Table size="sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {cardNotes?.map((note) => (
              <tr key={note.id}>
                <td>{formatDate(note.date)}</td>
                <td>{note.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      <Card.Footer className="text-muted">
        <Form.Group
          className="mb-3 notesFooter"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Control
            as="textarea"
            rows={2}
            onChange={handleChange}
            value={note.note}
          />
          <Button
            type="submit"
            variant="primary"
            className="addButton"
            onClick={(e) => handleSave(e)}
          >
            Add
          </Button>
        </Form.Group>
      </Card.Footer>
    </Card>
  );
}

CardNotes.propTypes = {
  loading: PropTypes.bool.isRequired,
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
  saveCardNoteToFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardNotes);
