export function formatDateToDDMMYYYY(date: Date) {
  const _date = new Date(date);
  const day = String(_date.getDate()).padStart(2, "0");
  const month = String(_date.getMonth() + 1).padStart(2, "0");
  const year = _date.getFullYear();
  return `${day}.${month}.${year}`;
}
