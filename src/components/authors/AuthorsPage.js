import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadAuthors,
  loadCategories,
  deleteAuthor,
} from "../../redux/actions/authorActions";
import { loadCourses } from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { Spinner } from "../common/Spinner";
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
  courses,
  loadCourses,
}) => {
  const [redirectToAddAuthorPage, setRedirect] = useState(false);
  const [authorDeleted, setAuthorDeleted] = useState({});
  const [errorOnDelete, setErrorOnDelete] = useState({
    author: {},
    deleteError: false,
  });
  const [foo, setFoo] = useState(false);

  useEffect(() => {
    // Working on this foo thing!!
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("Loading Authors failed. " + error));
    }
    if (courses.length === 0) {
      loadCourses().catch((error) => alert("Loading Authors failed. " + error));
    }
    if (authorCategories.length === 0) {
      loadCategories().catch((error) =>
        alert("Loading Author Categories failed. " + error)
      );
    }
  }, []);

  function authorHasCourse(author, courses) {
    return courses.find((course) => course.authorId === author.id);
  }

  function handleAuthorDelete(author) {
    let authorCount = authors.length;
    console.log(authorCount);
    if (authorHasCourse(author, courses)) {
      setErrorOnDelete({
        author,
        deleteError: true,
      });
      return;
    }
    if (errorOnDelete) setErrorOnDelete(false);
    setAuthorDeleted({ ...author });
    deleteAuthor(author)
      .then(() => {
        authorCount--;
        if (authorCount === 0) setFoo(true);
        toast.success("Author deleted");
      })
      .catch((error) => alert("Error deleteing author " + error));
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
            authorBeingDeleted={authorDeleted}
            errorOnDelete={errorOnDelete}
            setDeleteError={setErrorOnDelete}
          />
        </>
      )}
    </>
  );
};

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  authorCategories: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authors: state.authors,
  authorCategories: state.authorCategories,
  courses: state.courses,
  loading: state.apiCallsInProgress > 0,
});

const mapDispatchToProps = {
  loadAuthors,
  loadCategories,
  deleteAuthor,
  loadCourses,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
