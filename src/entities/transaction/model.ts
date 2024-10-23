/** Тип транзакции. */
export type Transaction = {
    /** Уникальный идентификатор транзакции. */
    id: string;
    /** Сумма транзакции. */
    amount: number;
    /** Категория транзакции. */
    category: string;
    /** Дата транзакции в формате ISO. */
    date: string;
    /** Тип транзакции: доход или расход */
    type: 'income' | 'expense';
}

/** Период, за который может быть получена информация о транзакциях. */
export type Period = 'all' | 'week' | 'month' | 'year';

/** Метки для периодов. */
export type PeriodLabel = 'Все' | 'Неделя' | 'Месяц' | 'Год';

/** Тип для опций фильтрации транзакций по периоду. */
export type PeriodOption = {
    value: Period;
    label: PeriodLabel;
};
