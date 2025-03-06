export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  let formatted = new Intl.DateTimeFormat('en-US', options).format(date);
  formatted = formatted.replace(',', '.');
  return formatted;
}

export function getMonthsBetween(startDate: string, endDate: string): string[] {
  const result: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  let current = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);

  while (current <= endMonth) {
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    result.push(`${year}-${month}`);
    current.setMonth(current.getMonth() + 1);
  }
  return result;
}
