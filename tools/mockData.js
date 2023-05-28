const cards = [
  {
    id: 1,
    issuer: "Chase",
    card: "Sapphire Preferred",
    userId: 1,
  },
  {
    id: 2,
    issuer: "Chase",
    card: "Sapphire Reserve",
    userId: 1,
  },
  {
    id: 3,
    issuer: "Amex",
    card: "Hilton Honors",
    userId: 2,
  },
  {
    id: 4,
    issuer: "Capital One",
    card: "Venture X",
    userId: 3,
  },
];

const users = [
  {
    id: 1,
    name: "Swaroop Uprety",
  },
  {
    id: 2,
    name: "Anshu Thapa",
  },
  {
    id: 3,
    name: "Astha Thapa",
  },
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  cards,
  users,
};
