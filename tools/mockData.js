const cards = [
  {
    id: 1,
    appDate: "2023-05-01",
    issuer: "Chase",
    card: "Sapphire Preferred",
    cardType: "Personal",
    inquiries: {
      experian: true,
      equifax: false,
      transunion: false,
    },
    annualFee: 95,
    nextFeeDate: "2024-01-22",
    userId: 1,
  },
  {
    id: 2,
    appDate: "2021-01-01",
    issuer: "Chase",
    card: "Sapphire Reserve",
    cardType: "Business",
    inquiries: {
      experian: true,
      equifax: true,
      transunion: false,
    },
    annualFee: 0,
    nextFeeDate: "2024-09-22",
    userId: 1,
  },
  {
    id: 3,
    appDate: "2019-05-01",
    issuer: "Amex",
    card: "Hilton Honors",
    cardType: "Personal",
    inquiries: {
      experian: true,
      equifax: true,
      transunion: false,
    },
    annualFee: 95,
    nextFeeDate: "2024-09-22",
    userId: 2,
  },
  {
    id: 4,
    appDate: "2021-06-28",
    issuer: "CapOne",
    card: "Venture X",
    cardType: "Personal",
    inquiries: {
      experian: true,
      equifax: true,
      transunion: true,
    },
    annualFee: 450,
    nextFeeDate: "2024-09-22",
    userId: 3,
  },
];

const loyaltyData = [
  {
    id: 1,
    loyaltyType: "airlines",
    program: {
      id: 1,
      name: "American AAdvantage",
      img: "https://i.imgur.com/Pc1I7uX.png",
    },
    memberId: "9UJ7LK0",
    loginId: "foobar",
    password: "T********D*5",
    userId: 1,
  },
  {
    id: 2,
    loyaltyType: "airlines",
    program: {
      id: 1,
      name: "American AAdvantage",
      img: "https://i.imgur.com/Pc1I7uX.png",
    },
    memberId: "9UJ7LK0",
    loginId: "foobar",
    password: "T********D*5",
    userId: 2,
  },
  {
    id: 3,
    loyaltyType: "airlines",
    program: {
      id: 2,
      name: "United MileaguePlus",
      img: "https://i.imgur.com/znFTwQ1.png",
    },
    memberId: "9UJ7LK0",
    loginId: "noooooo",
    password: "T********D*5",
    userId: 1,
  },
  {
    id: 4,
    loyaltyType: "hotels",
    program: {
      id: 3,
      name: "World of Hyatt",
      img: "https://i.imgur.com/UnaXElg.png",
    },
    memberId: "9UJ7LK0",
    loginId: "hakaka",
    password: "T********D*5",
    userId: 1,
  },
  {
    id: 5,
    loyaltyType: "hotels",
    program: {
      id: 4,
      name: "Hilton Honors",
      img: "https://i.imgur.com/3A83gV6.png",
    },
    memberId: "9UJ7LK0",
    loginId: "lololol",
    password: "T********D*5",
    userId: 2,
  },
  {
    id: 6,
    loyaltyType: "hotels",
    program: {
      id: 4,
      name: "Hilton Honors",
      img: "https://i.imgur.com/3A83gV6.png",
    },
    memberId: "9UJ7LK0",
    loginId: "lololol",
    password: "T********D*5",
    userId: 2,
  },
  {
    id: 7,
    loyaltyType: "hotels",
    program: {
      id: 3,
      name: "World of Hyatt",
      img: "https://i.imgur.com/UnaXElg.png",
    },
    memberId: "9UJ7LK0",
    loginId: "lololol",
    password: "T********D*5",
    userId: 3,
  },
  {
    id: 8,
    loyaltyType: "misc",
    program: {
      id: 5,
      name: "Global Entry",
      img: "",
    },
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
