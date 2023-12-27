const reduceAddress = (address: string) => {
  return address.length > 10 ? `${address.substring(0, 5)}...${address.slice(-5)}` : address;
};

export { reduceAddress };
