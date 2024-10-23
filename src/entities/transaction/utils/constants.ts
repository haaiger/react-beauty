import { PeriodOption } from "../model";

/** Опции для фильтрации транзакций по периоду. */
export const OPTIONS: PeriodOption[] = [
    { value: "week", label: "Неделя" },
    { value: "month", label: "Месяц" },
    { value: "year", label: "Год" },
    { value: "all", label: "Все" },
];