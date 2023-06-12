const cards = [
  {
    id: 1,
    appDate: "2023-05-01",
    issuer: "Chase",
    card: "Sapphire Preferred",
    cardType: "Personal",
    userId: 1,
  },
  {
    id: 2,
    appDate: "2021-01-01",
    issuer: "Chase",
    card: "Sapphire Reserve",
    cardType: "Business",
    userId: 1,
  },
  {
    id: 3,
    appDate: "2019-05-01",
    issuer: "Amex",
    card: "Hilton Honors",
    cardType: "Personal",
    userId: 2,
  },
  {
    id: 4,
    appDate: "2021-06-28",
    issuer: "CapOne",
    card: "Venture X",
    cardType: "Personal",
    userId: 3,
  },
];

const loyaltyData = [
  {
    id: 1,
    loyaltyType: "airlines",
    company: "American",
    memberId: "9UJ7LK0",
    loginId: "foobar",
    password: "T********D*5",
    userId: 1,
  },
  {
    id: 2,
    loyaltyType: "airlines",
    company: "American",
    memberId: "9UJ7LK0",
    loginId: "foobar",
    password: "T********D*5",
    userId: 2,
  },
  {
    id: 3,
    loyaltyType: "airlines",
    company: "United",
    memberId: "9UJ7LK0",
    loginId: "noooooo",
    password: "T********D*5",
    userId: 1,
  },
  {
    id: 4,
    loyaltyType: "hotels",
    company: "Hyatt",
    memberId: "9UJ7LK0",
    loginId: "hakaka",
    password: "T********D*5",
    userId: 1,
  },
  {
    id: 5,
    loyaltyType: "hotels",
    company: "Hilton",
    memberId: "9UJ7LK0",
    loginId: "lololol",
    password: "T********D*5",
    userId: 2,
  },
  {
    id: 6,
    loyaltyType: "hotels",
    company: "Hilton",
    memberId: "9UJ7LK0",
    loginId: "lololol",
    password: "T********D*5",
    userId: 2,
  },
  {
    id: 7,
    loyaltyType: "hotels",
    company: "Hilton",
    memberId: "9UJ7LK0",
    loginId: "lololol",
    password: "T********D*5",
    userId: 3,
  },
  {
    id: 8,
    loyaltyType: "misc",
    company: "Hilton",
    memberId: "9UJ7LK0",
    loginId: "lololol",
    password: "T********D*5",
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
  loyaltyData,
};
