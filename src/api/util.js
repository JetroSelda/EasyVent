const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const formatCurrency = (amount = 0) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2
  });

  return formatter.format(amount);
}

export function formatCurrencyWithoutSymbol(locale, currency, value) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'code'
  })
    .format(value)
    .replace(currency, '')
    .trim();
}

export const debounce = (func, delay = 1000) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const formatMilitaryTime = (hours, minutes) => {
  // Return empty string if both are 0
  if (hours === 0 && minutes === 0) {
    return "";
  }

  const period = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  let formattedHours = hours % 12;
  if (formattedHours === 0) {
    formattedHours = 12;
  }

  // Ensure minutes are always 2 digits
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${String(formattedHours).padStart(2, "0")}:${formattedMinutes} ${period}`;
}

export const formatDate = (date) => {
  if (!date) return "";

  const currDate = date instanceof Date ? date : new Date(date);

  const time = formatMilitaryTime(currDate.getHours(), currDate.getMinutes())

  return `${months[currDate.getMonth()]} ${currDate.getDate()}, ${currDate.getFullYear()} ${time}`;
}

export const formatISODate = (date) => {
  if (!date) return "";

  const currDate = date instanceof Date ? date : new Date(date);

  const dateArr = [
    currDate.getFullYear(),
    (currDate.getMonth() + 1).toString().padStart(2, "0"),
    (currDate.getDate()).toString().padStart(2, "0"),
  ];

  return dateArr.join("-");
}

export const formatTime = (timeStr) => {
  const match = timeStr.match(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/);

  if (!match) return timeStr;

  let [ , h, m, , s ] = match;
  const hour12 = (+h % 12) || 12;
  const ampm = +h < 12 ? "AM" : "PM";

  return `${hour12}:${m}${s ? `:${s}` : ""} ${ampm}`;
}