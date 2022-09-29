import { format, isValid } from "date-fns";

/**
 * 日付を yyyy-MM-dd HH:mm にフォーマットする
 */
type DateFormat = (date: Date) => string;

export const dateFormat: DateFormat = (date) =>
  isValid(date) ? format(date, "yyyy-MM-dd HH:mm") : "";
