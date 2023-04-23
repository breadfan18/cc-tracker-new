import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

function EmptyList() {
  return (
    <div className="alert alert-danger" role="alert">
      <p style={{ marginBottom: "0" }}>
        No Courses to display. Click{" "}
        <Link to="/course/" style={{ textDecoration: "none" }}>
          here
        </Link>{" "}
        to add a course
      </p>
      <AiOutlineUserAdd
        className="closeIcon"
        onClick={() => console.log("foo")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default EmptyList;
