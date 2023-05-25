const cards = [
  {
    id: 1,
    issuer: "Chase",
    card: "Sapphire Preferred",
    user: "Swaroop Uprety",
  },
  {
    id: 2,
    issuer: "Chase",
    card: "Sapphire Reserve",
    user: "Swaroop Uprety",
  },
  {
    id: 3,
    issuer: "Amex",
    card: "Hilton Honors",
    user: "Swaroop Uprety",
  },
  {
    id: 4,
    issuer: "Capital One",
    card: "Venture X",
    user: "Anshu Thapa",
  },
];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  cards,
};
