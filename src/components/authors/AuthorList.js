import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorList = ({
  authors,
  onDeleteClick,
  categories,
  authorBeingDeleted,
  deleteError,
}) => (
  <>
    {deleteError && (
      <div className="alert alert-danger" role="alert">
        Cannot delete an author with active course(s)
      </div>
    )}
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
          const authorDeleted = authorBeingDeleted.id === author.id;
          return (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.age}</td>
              <td>
                {
                  categories.find(
                    (category) => category.id === author.categoryId
                  ).title
                }
              </td>
              <td>
                <Link to={"/author/" + author.id}>
                  <button
                    className="btn btn-outline-info"
                    style={{ minWidth: "130px" }}
                  >
                    Modify
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(author)}
                  disabled={authorDeleted}
                  style={{ minWidth: "130px" }}
                >
                  {authorDeleted ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>
);

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  authorBeingDeleted: PropTypes.object.isRequired,
  deleteError: PropTypes.bool.isRequired,
};

export default AuthorList;
