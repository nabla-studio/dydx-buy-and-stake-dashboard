export const formatCompactNumber = (number: number | `${number}`) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatCurrencyNumber = (number: number | `${number}`) => {
  if (!number || number === "0") {
    return "0";
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatPercentageNumber = (number: number | `${number}`) => {
  return new Intl.NumberFormat("en", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(number);
};
