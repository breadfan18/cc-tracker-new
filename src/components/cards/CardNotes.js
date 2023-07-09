import React from "react";
import { Button, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function CardNotes() {
  return (
    <Card className="text-center">
      <Card.Header>Notes</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        <Table size="sm">
          <tbody>
            <tr>
              <td>01-01-2023</td>
              <td>Downgraded Sapphire to Reserve</td>
            </tr>
            <tr>
              <td>03-01-2023</td>
              <td style={{ display: "inline-block" }}>
                Brought Samay home from the hospital and it just took forever to
                get him to sleep
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>

      <Card.Footer className="text-muted">
        <Button variant="primary" className="addButton">
          Add Comment
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default CardNotes;
