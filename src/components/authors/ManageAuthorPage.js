import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const newAuthor = {
  id: null,
  name: "",
  age: "",
  categoryId: 2,
};

export const ManageAuthorPage = ({
  authors,
  loadAuthors,
  saveAuthor,
  history,
  ...props
}) => {
  const [author, setAuthor] = useState({ ...props.author });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Loading authors failed " + error));
    } else {
      setAuthor({ ...props.author });
    }
  }, [props.author]);

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  }

  function handleAuthorSave(event) {
    event.preventDefault();
    setSaving(true);
    debugger;
    saveAuthor(author)
      .then(() => {
        toast.success("Author Saved");
        history.push("/authors");
      })
      .catch((error) => {
        setSaving(false);
      });
  }

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      saving={saving}
      onSave={handleAuthorSave}
      onChange={handleChange}
    />
  );
};

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function getAuthorById(authors, authorId) {
  return authors.find((author) => author.id === authorId) || null;
}

const mapStateToProps = (state, ownProps) => {
  const authorId = parseInt(ownProps.match.params.authorId);
  const author =
    authorId && state.authors.length > 0
      ? getAuthorById(state.authors, authorId)
      : newAuthor;
  return {
    author,
    authors: state.authors,
  };
};

const mapDispatchToProps = {
  loadAuthors,
  saveAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
