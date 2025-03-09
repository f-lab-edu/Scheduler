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
