import { ITask, TPriorities } from 'types/types';

//Month date. year
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

//YYYY-MM-DD
export function formatDashDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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

export function filterDataByPriorities(data: ITask[], selectedPriorities: TPriorities[]): ITask[] {
  if (!selectedPriorities.length) {
    return data;
  }
  return data.filter((task) => selectedPriorities.includes(task.priority));
}
export function filterDataBySearchValue(data: ITask[], value: string): ITask[] {
  if (value.length === 0) {
    return data;
  }
  return data.filter((task) => task.title.toLowerCase().includes(value.toLowerCase()));
}
