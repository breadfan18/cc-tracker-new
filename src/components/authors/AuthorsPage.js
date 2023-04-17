import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadAuthors, loadCategories } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import AuthorList from "./AuthorList";
import { Redirect } from "react-router-dom";

export const AuthorsPage = ({
  authors,
  loadAuthors,
  loading,
  authorCategories,
  loadCategories,
}) => {
  const [redirectToAddAuthorPage, setRedirect] = useState(false);

  useEffect(() => {
    if (authors.length === 0)
      loadAuthors().catch((error) => alert("Loading Authors failed. " + error));

    if (authorCategories.length === 0) {
      loadCategories().catch((error) =>
        alert("Loading Author Categories failed. " + error)
      );

      console.log({ authorCategories });
    }
  }, []);

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
          <AuthorList authors={authors} categories={authorCategories} />
        </>
      )}
    </>
  );
};

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  authorCategories: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authors: state.authors,
  authorCategories: state.authorCategories,
  loading: state.apiCallsInProgress > 0 || state.authorCategories.length === 0,
});

const mapDispatchToProps = {
  loadAuthors,
  loadCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
