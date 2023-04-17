import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorList = ({ authors, onDeleteClick, categories }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Category</th>
        <th>Modify</th>
        <th>Delete?</th>
      </tr>
    </thead>
    <tbody>
      {authors.map((author) => {
        return (
          <tr key={author.id}>
            <td>{author.name}</td>
            <td>{author.age}</td>
            <td>
              {
                categories.find((category) => category.id === author.categoryId)
                  .title
              }
            </td>
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
  categories: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default AuthorList;
