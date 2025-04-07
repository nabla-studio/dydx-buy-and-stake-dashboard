export const formatShortDate = (date: Date | number) =>
  Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
  }).format(date);
