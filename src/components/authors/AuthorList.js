import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorList = ({ authors, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Modify</th>
        <th>Delete?</th>
      </tr>
    </thead>
    <tbody>
      {authors.map((author) => {
        return (
          <tr key={author.id}>
            <td>{author.name.split(" ")[0]}</td>
            <td>{author.name.split(" ")[1]}</td>
            <td>{author.age}</td>
            <td>
              <Link to={"/author/" + author.id}>
                <button className="btn btn-outline-info">Modify</button>
              </Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(author)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default AuthorList;
