export const statustoText = (status) => {
  if (status) {
    return <span>Fullfilled</span>;
  } else {
    return <span>Pending</span>;
  }
};

export const getNextDay = (dayIndex, resetTime) => {
  if (dayIndex === undefined) {
    throw new Error('"' + dayIndex + '" is not a valid input.');
  }

  let returnDate = new Date();
  let returnDay = returnDate.getDay();
  if (dayIndex !== returnDay) {
    returnDate.setDate(
      returnDate.getDate() + ((dayIndex + (7 - returnDay)) % 7)
    );
  }

  if (resetTime) {
    returnDate.setHours(0);
    returnDate.setMinutes(0);
    returnDate.setSeconds(0);
    returnDate.setMilliseconds(0);
  }
  return returnDate;
};

export const getUserFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("user"));

export const setUserToLocalStorage = (value) =>
  localStorage.setItem("user", JSON.stringify(value));

export const removeUserFromLocalStorage = () => localStorage.removeItem("user");
