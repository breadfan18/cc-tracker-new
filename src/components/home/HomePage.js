import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { loadAuthors, loadCategories } from "../../redux/actions/authorActions";
import { loadCourses } from "../../redux/actions/courseActions";

const HomePage = ({
  authors,
  courses,
  authorCategories,
  loadAuthors,
  loadCourses,
  loadCategories,
}) => {
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

  return (
    <div className="jumbotron">
      <h1>Pluralsight Administration</h1>
      <p>React, Redux and React Router for ultra-responsive web apps.</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
};

HomePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  authorCategories: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authors: state.authors,
  authorCategories: state.authorCategories,
  courses: state.courses,
});

const mapDispatchToProps = {
  loadAuthors,
  loadCategories,
  loadCourses,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
