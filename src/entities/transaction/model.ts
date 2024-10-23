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