const numberFormatter = (amount: number | undefined) => {
  if (!amount) return "";
  if (amount > 999999) return (amount / 10 ** 6).toFixed(1) + "M";
  else if (amount > 999) return (amount / 10 ** 3).toFixed(1) + "K";
  else return amount;
};

export { numberFormatter };
