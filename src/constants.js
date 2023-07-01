export const CARD_DATA_KEYS = {
  appDate: "appDate",
  creditLine: "creditLine",
  annualFee: "annualFee",
  nextFeeDate: "nextFeeDate",
  bonusEarnDate: "bonusEarnDate",
  cardType: "cardType",
  userId: "userId",
  bonusEarned: "bonusEarned",
  status: "status",
  issuer: "issuer",
  card: "card",
  spendReq: "spendReq",
  spendBy: "spendBy",
  signupBonus: "signupBonus",
  inquiries: "inquiries",
  cardholder: "cardholder",
};

export const LOYALTY_DATA_KEYS = {
  loyaltyType: "loyaltyType",
  program: "program",
  memberId: "memberId",
  loginId: "loginId",
  password: "password",
  userId: "userId",
};

export const ISSUERS = [
  { name: "Chase", img: "https://i.imgur.com/AsfYKFY.png" },
  { name: "Amex", img: "https://i.imgur.com/1XOuPt8.png" },
  { name: "CapOne", img: "https://i.imgur.com/u3Rr8rT.png" },
  { name: "Barclays", img: "https://i.imgur.com/bsjoGQv.png" },
];
export const CARD_TYPE = ["Personal", "Business"];
export const ACCOUNT_TYPE = ["airlines", "hotels", "misc"];
export const ACC_STATUS = ["open", "closed", "downgraded"];
export const PROGRAMS = [
  {
    id: 1,
    type: "airlines",
    name: "American AAdvantage",
    img: "https://i.imgur.com/Pc1I7uX.png",
  },
  {
    id: 2,
    type: "airlines",
    name: "United MileaguePlus",
    img: "https://i.imgur.com/znFTwQ1.png",
  },
  {
    id: 3,
    type: "hotels",
    name: "World of Hyatt",
    img: "https://i.imgur.com/UnaXElg.png",
  },
  {
    id: 4,
    type: "hotels",
    name: "Hilton Honors",
    img: "https://i.imgur.com/3A83gV6.png",
  },
  {
    id: 5,
    type: "misc",
    name: "Global Entry",
    img: "",
  },
];

export const USERS = [
  {
    id: 1,
    name: "Swaroop Uprety",
  },
  {
    id: 2,
    name: "Kory Smith",
  },
  {
    id: 3,
    name: "Nathan Jonas",
  },
  {
    id: 4,
    name: "Jess Elle",
  },
  {
    id: 5,
    name: "Danyale Marshall",
  },
];
