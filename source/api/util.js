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

export const formatDate = (date) => {
  if (!date) return "";

  const currDate = date instanceof Date ? date : new Date(date);

  return `${months[currDate.getMonth()]} ${currDate.getDate()}, ${currDate.getFullYear()}`;
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