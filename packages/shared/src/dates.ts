export function formatDateRange(start: string | null, end: string | null): string {
  const startLabel = start ? formatYearMonth(start) : "";
  const endLabel = end ? formatYearMonth(end) : "Present";
  if (!startLabel) return endLabel;
  return `${startLabel} — ${endLabel}`;
}

export function formatYearMonth(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function splitLines(value: string | null): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function splitStack(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
