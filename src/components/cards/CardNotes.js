import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  saveCardNoteToFirebase,
  deleteCardNoteFromFirebase,
} from "../../redux/actions/cardNotesActions";
import { Spinner } from "../common/Spinner";
import { formatDate } from "../../helpers";
import { NEW_NOTE } from "../../constants";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

function CardNotes({
  card,
  cardNotes,
  saveCardNoteToFirebase,
  deleteCardNoteFromFirebase,
  loading,
}) {
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
    toast.success("Note Added");
    setNote(NEW_NOTE);
  }

  function handleDelete(note) {
    deleteCardNoteFromFirebase(note);
    toast.success("Note Deleted");
  }

  return loading ? (
    <Spinner />
  ) : (
    <Card className="text-center">
      <Card.Header id="notesCardHeader">Card Notes</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        <Table size="sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cardNotes?.map((note) => (
              <tr key={note.id}>
                <td>{formatDate(note.date)}</td>
                <td>{note.note}</td>
                <td style={{ textAlign: "right" }}>
                  <AiFillDelete
                    style={{
                      color: "#DC3545",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(note)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer
        className="text-muted notesFooter"
        style={{ padding: "10px" }}
      >
        <Form.Control
          as="textarea"
          rows={2}
          onChange={handleChange}
          value={note.note}
        />
        <Button className="addButton" onClick={(e) => handleSave(e)}>
          Add
        </Button>
      </Card.Footer>
    </Card>
  );
}

CardNotes.propTypes = {
  loading: PropTypes.bool.isRequired,
  saveCardNoteToFirebase: PropTypes.func.isRequired,
  deleteCardNoteFromFirebase: PropTypes.func.isRequired,
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
  deleteCardNoteFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardNotes);
