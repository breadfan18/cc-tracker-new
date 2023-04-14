import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import Spinner from "../common/Spinner";

export const ManageAuthorPage = ({ authors, loadAuthors, ...props }) => {
  const [author, setAuthor] = useState({ ...props.author });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Loading authors failed " + error));
    }
  }, []);

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   setAuthor((prevAuthor) => ({
  //     ...prevAuthor,
  //     [name]: value,
  //   }));
  // }

  function handleAuthorSave(event) {
    event.preventDefault();
    const { firstName, lastName, age } = event.target;
    console.log(firstName);
  }

  console.log(author);

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      onSave={handleAuthorSave}
      // onChange={handleChange}
    />
  );
};

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

function getAuthorById(authors, authorId) {
  const foo = authors.find((author) => author.id === authorId) || null;
  return foo;
}

const mapStateToProps = (state, ownProps) => {
  const authorId = parseInt(ownProps.match.params.authorId);
  const author =
    authorId && state.authors.length > 0
      ? getAuthorById(state.authors, authorId)
      : {
          id: null,
          name: "",
          age: "",
          categoryId: 2,
        };
  return {
    author,
    authors: state.authors,
  };
};

const mapDispatchToProps = {
  loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
