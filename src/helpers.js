import { USERS } from "./constants";

export function wasCardOpenedWithinLast24Months(appDate) {
  const twoYearsAgoFromToday = Date.parse(
    new Date(new Date().setFullYear(new Date().getFullYear() - 2))
  );
  const today = Date.now();
  const parsedAppDate = Date.parse(appDate);
  return parsedAppDate >= twoYearsAgoFromToday && parsedAppDate <= today; // true
}

export function addUserNameToCard(card) {
  const cardholder = USERS.find(
    (user) => user.id === parseInt(card.userId)
  ).name;
  return {
    ...card,
    cardholder,
  };
}

export function sortCardsByDate(cards) {
  return cards.sort((a, b) => Date.parse(a.appDate) - Date.parse(b.appDate));
}

export function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function maskPwd(str) {
  const centerStr = str
    .split("")
    .splice(1, str.length - 5)
    .fill("*")
    .join("");
  return str.charAt(0) + centerStr + str.substring(str.length - 4);
}

export function formatDate(dateStr) {
  const dateSplit = dateStr.split("-");
  return `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[0]}`;
}

export function formatCurrency(currencyStr) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(currencyStr);
}

export const slugify = (str) => {
  const whitespacePattern = /[\s-]+/g;
  const nonLatinPattern = /[^\w-]/g;
  return str
    .trim()
    .toLocaleLowerCase("en-US")
    .normalize("NFKD")
    .replace(nonLatinPattern, " ")
    .replace(whitespacePattern, "-")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// Not using this function right now. But need to try again in the future
export const normalizeData = (cards) => {
  const handleInquiriesList = (inq) => {
    return Object.keys(inq).reduce((output, i) => {
      if (inq[i]) output += titleCase(i) + "\n";
      return output;
    }, "");
  };

  const formattedCards = [...cards].map((card) => {
    card.appDate = formatDate(card.appDate);
    card.nextFeeDate === ""
      ? (card.nextFeeDate = "N/A")
      : (card.nextFeeDate = formatDate(card.nextFeeDate));
    card.spendBy === ""
      ? (card.spendBy = "N/A")
      : (card.spendBy = formatDate(card.spendBy));
    card.bonusEarnDate === "" || card.bonusEarnDate === undefined
      ? (card.bonusEarnDate = "WIP")
      : formatDate(card.bonusEarnDate);
    card.status = titleCase(card.status);
    // card.inquiries = handleInquiriesList(card.inquiries);
    return card;
  });

  return formattedCards;
};

export function formDisabledCheck(dataType) {
  return (
    dataType === 0 || dataType === "0" || dataType === "" || dataType === null
  );
}
