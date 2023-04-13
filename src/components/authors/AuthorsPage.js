import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import AuthorList from "./AuthorList";

export const AuthorsPage = ({ authors, loadAuthors }) => {
  useEffect(() => {
    if (authors.length === 0)
      loadAuthors().catch((error) => alert("Loading Authors failed. " + error));
  }, []);
  return authors.length === 0 ? <Spinner /> : <AuthorList authors={authors} />;
};

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authors: state.authors,
});

const mapDispatchToProps = {
  loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
