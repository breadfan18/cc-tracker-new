import React from "react";
import { Button } from "react-bootstrap";
import { MdModeEditOutline } from "react-icons/md";

export function EditButton() {
  return (
    <Button variant="success" className="rounded-circle">
      <MdModeEditOutline />
    </Button>
  );
}
