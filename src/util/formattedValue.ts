export const formattedValue = (value: string) => {
  if (value.length > 30) return value.slice(1, 15) + "..." + value.slice(-12);
  return value;
};
