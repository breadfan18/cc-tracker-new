const courses = [
  {
    id: 1,
    title: "Securing React Apps with Auth0",
    slug: "react-auth0-authentication-security",
    authorId: 1,
    category: "JavaScript",
  },
  // {
  //   id: 2,
  //   title: "React: The Big Picture",
  //   slug: "react-big-picture",
  //   authorId: 1,
  //   category: "JavaScript",
  // },
  // {
  //   id: 3,
  //   title: "Creating Reusable React Components",
  //   slug: "react-creating-reusable-components",
  //   authorId: 1,
  //   category: "JavaScript",
  // },
  // {
  //   id: 4,
  //   title: "Building a JavaScript Development Environment",
  //   slug: "javascript-development-environment",
  //   authorId: 1,
  //   category: "JavaScript",
  // },
  // {
  //   id: 5,
  //   title: "Building Applications with React and Redux",
  //   slug: "react-redux-react-router-es6",
  //   authorId: 1,
  //   category: "JavaScript",
  // },
  // {
  //   id: 6,
  //   title: "Building Applications in React and Flux",
  //   slug: "react-flux-building-applications",
  //   authorId: 1,
  //   category: "JavaScript",
  // },
  // {
  //   id: 7,
  //   title: "Clean Code: Writing Code for Humans",
  //   slug: "writing-clean-code-humans",
  //   authorId: 1,
  //   category: "Software Practices",
  // },
  // {
  //   id: 8,
  //   title: "Architecting Applications for the Real World",
  //   slug: "architecting-applications-dotnet",
  //   authorId: 1,
  //   category: "Software Architecture",
  // },
  // {
  //   id: 9,
  //   title: "Becoming an Outlier: Reprogramming the Developer Mind",
  //   slug: "career-reboot-for-developer-mind",
  //   authorId: 1,
  //   category: "Career",
  // },
  // {
  //   id: 10,
  //   title: "Web Component Fundamentals",
  //   slug: "web-components-shadow-dom",
  //   authorId: 1,
  //   category: "HTML5",
  // },
];

const authors = [
  { id: 1, name: "Cory House", age: 35, categoryId: 2 },
  { id: 2, name: "Scott Allen", age: 35, categoryId: 3 },
  { id: 3, name: "Dan Wahlin", age: 35, categoryId: 4 },
];

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: "",
};

const categories = [
  { id: 1, title: "Science Fiction" },
  { id: 2, title: "Discovery" },
  { id: 3, title: "Horror" },
  { id: 4, title: "Biography" },
];

const emptyLists = {
  courses: false,
  authors: false,
};
// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  courses,
  authors,
  categories,
  emptyLists,
};
