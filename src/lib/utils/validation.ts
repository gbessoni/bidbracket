export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 2) return "Name must be at least 2 characters";
  if (trimmed.length > 20) return "Name must be 20 characters or less";
  return null;
}

export function validateAge(age: number): string | null {
  if (!Number.isInteger(age)) return "Age must be a whole number";
  if (age < 13) return "Must be at least 13 years old";
  if (age > 120) return "Invalid age";
  return null;
}

export function validateLeagueName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 2) return "League name must be at least 2 characters";
  if (trimmed.length > 30) return "League name must be 30 characters or less";
  return null;
}

export function validateInviteCode(code: string): string | null {
  if (code.length !== 4) return "Invite code must be 4 characters";
  if (!/^[A-Z0-9]+$/.test(code)) return "Invalid invite code format";
  return null;
}

export function validateBid(bid: number, currentBid: number, budget: number): string | null {
  if (!Number.isInteger(bid)) return "Bid must be a whole number";
  if (bid <= currentBid) return `Bid must be higher than $${currentBid}`;
  if (bid > budget) return "Insufficient budget";
  if (bid < 1) return "Minimum bid is $1";
  return null;
}
