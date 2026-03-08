export function formatBudget(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

export function formatBid(amount: number): string {
  return `$${amount}`;
}
