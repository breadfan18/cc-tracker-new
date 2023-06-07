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
  const userName = USERS.find((user) => user.id === parseInt(card.userId)).name;
  return {
    ...card,
    userName,
  };
}

export function sortCardsByDate(cards) {
  return cards.sort((a, b) => Date.parse(a.appDate) - Date.parse(b.appDate));
}

export function sortCardsByName(cards) {
  return cards.sort((a, b) => {
    const nameA = a.userName.toUpperCase(); // ignore upper and lowercase
    const nameB = b.userName.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
}
