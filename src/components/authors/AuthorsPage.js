import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import AuthorList from "./AuthorList";
import { Redirect } from "react-router-dom";

export const AuthorsPage = ({ authors, loadAuthors, loading }) => {
  const [redirectToAddAuthorPage, setRedirect] = useState(false);
  useEffect(() => {
    if (authors.length === 0)
      loadAuthors().catch((error) => alert("Loading Authors failed. " + error));
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
          <AuthorList authors={authors} />
        </>
      )}
    </>
  );
};

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authors: state.authors,
  loading: state.apiCallsInProgress > 0,
});

const mapDispatchToProps = {
  loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
