// Budget filter brackets for the explorer. `max: Infinity` is open-ended.
export const budgets = [
  { key: 'under-10k', label: 'Under ₹10,000', min: 0, max: 10000 },
  { key: '10k-30k', label: '₹10,000 – ₹30,000', min: 10000, max: 30000 },
  { key: '30k-75k', label: '₹30,000 – ₹75,000', min: 30000, max: 75000 },
  { key: '75k-150k', label: '₹75,000 – ₹1.5 Lakh', min: 75000, max: 150000 },
  { key: '150k-plus', label: '₹1.5 Lakh and above', min: 150000, max: Infinity },
];
