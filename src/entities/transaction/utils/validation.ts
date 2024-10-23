/** Функция для валидации суммы транзакции. */
export const validateAmount = (value: number) => {
    if (value === 0) return "Сумма не может быть равна 0";
    if (value < 0) return "Сумма не может быть отрицательной";

    const stringValue = value.toString();
    const regex = /^(0|[1-9]\d*)(\.\d+)?$/;

    return regex.test(stringValue) || "Некорректный формат числа";
};

/** Функция для валидации даты транзакции. */
export const validateDate = (value: string) => {
    const selectedDate = new Date(value);
    const today = new Date();
    const minDate = new Date("1900-01-01");

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) return "Дата не может быть в будущем";
    if (selectedDate < minDate) return "Дата не может быть меньше 1900 года";

    return true;
};