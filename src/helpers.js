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
