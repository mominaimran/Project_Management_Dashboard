// utils/dateValidator.js
export const dateValidator = (dateStr) => {
  // 1️⃣ Format check (dd/mm/yyyy)
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // ✅ escaped slashes
  const match = dateStr.match(dateRegex);

  if (!match) {
    return { isValid: false, message: "Date must be in dd/mm/yyyy format" };
  }

  let [, day, month, year] = match;
  day = parseInt(day, 10);
  month = parseInt(month, 10);
  year = parseInt(year, 10);

  // 2️⃣ Real date check
  const dateObj = new Date(`${year}-${month}-${day}`);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() + 1 !== month ||
    dateObj.getDate() !== day
  ) {
    return { isValid: false, message: "Invalid date value" };
  }

  // 3️⃣ Return ISO format for DB
  const isoDate = new Date(Date.UTC(year, month - 1, day)).toISOString();

  return { isValid: true, isoDate };
};
