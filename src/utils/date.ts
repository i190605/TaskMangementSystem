const displayDateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function formatDisplayDate(date: string) {
  return displayDateFormatter.format(new Date(date));
}

export function getTodayDateInputValue() {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60_000;

  return new Date(today.getTime() - timezoneOffset).toISOString().slice(0, 10);
}

function getDateInputTime(value: string) {
  const [year, month, day] = value.split('-').map(Number);

  return new Date(year, month - 1, day).getTime();
}

export function getDaysUntilDate(date: string, today = getTodayDateInputValue()) {
  const millisecondsPerDay = 86_400_000;

  return Math.ceil((getDateInputTime(date) - getDateInputTime(today)) / millisecondsPerDay);
}
