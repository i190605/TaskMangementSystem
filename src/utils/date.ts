const displayDateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function formatDisplayDate(date: string) {
  return displayDateFormatter.format(new Date(date));
}
