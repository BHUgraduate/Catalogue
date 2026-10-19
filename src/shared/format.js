// Compact INR for UI chips: 7000 → ₹7K, 150000 → ₹1.5L, 400000 → ₹4L
export const inrShort = (n) => {
  if (n >= 100000) return `₹${+(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${+(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

// A service matches a budget bracket when its price range overlaps it.
export const overlaps = (service, bracket) =>
  service.minPrice <= bracket.max && service.maxPrice >= bracket.min;
