import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import { Spinner } from "../common/Spinner";
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Loading authors failed " + error));
    } else {
      setAuthor({ ...props.author });
    }
  }, [props.author]);

  function formIsValid() {
    const { name, age } = author;
    const errors = {};
    if (!name) errors.name = "Author name is required";
    if (!age) errors.age = "Author age is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
  }

  function handleAuthorSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveAuthor(author)
      .then(() => {
        toast.success(author.id === null ? "Author Created" : "Author Updated");
        history.push("/authors");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({
          onSave: error.message,
        });
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
      errors={errors}
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
