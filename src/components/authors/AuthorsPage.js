import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadAuthors,
  loadCategories,
  deleteAuthor,
} from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import AuthorList from "./AuthorList";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthorsPage = ({
  authors,
  loadAuthors,
  loading,
  authorCategories,
  loadCategories,
  deleteAuthor,
}) => {
  const [redirectToAddAuthorPage, setRedirect] = useState(false);
  const [authorDeleted, setAuthorDeleted] = useState(false);

  useEffect(() => {
    if (authors.length === 0 || authorDeleted) {
      loadAuthors().catch((error) => alert("Loading Authors failed. " + error));
      setAuthorDeleted(false);
    }

    if (authorCategories.length === 0) {
      loadCategories().catch((error) =>
        alert("Loading Author Categories failed. " + error)
      );
    }
  }, [authors]);

  function handleAuthorDelete(author) {
    deleteAuthor(author).catch((error) =>
      alert("Error deleteing author " + error)
    );
    setAuthorDeleted(true);
    setTimeout(() => {
      toast.success("Author deleted");
    }, 4000);
  }

  return (
    <>
      {redirectToAddAuthorPage && <Redirect to="/author" />}
      <h2>Authors</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirect(true)}
          >
            Add Author
          </button>
          <AuthorList
            authors={authors}
            categories={authorCategories}
            onDeleteClick={handleAuthorDelete}
          />
        </>
      )}
    </>
  );
};

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  authorCategories: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authors: state.authors,
  authorCategories: state.authorCategories,
  loading: state.apiCallsInProgress > 0 || state.authorCategories.length === 0,
  // deleteAuthorBoolean,
});

const mapDispatchToProps = {
  loadAuthors,
  loadCategories,
  deleteAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
