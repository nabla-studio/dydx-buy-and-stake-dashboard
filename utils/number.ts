export const formatCompactNumber = (number: number | `${number}`) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatCurrencyNumber = (number: number | `${number}`) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatPercentageNumber = (number: number | `${number}`) => {
  return new Intl.NumberFormat("en", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(number);
};
