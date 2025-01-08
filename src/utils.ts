export function roundDecimal(value: number | string, decimals = 2): string {
  const numVal = typeof value === "number" ? value : parseFloat(value);

  if (isNaN(numVal)) {
    throw new Error("Invalid number");
  }

  return numVal.toFixed(decimals);
}
