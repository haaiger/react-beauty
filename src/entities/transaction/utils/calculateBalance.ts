import { Transaction } from "../model";

/**
 * Функция для расчёта баланса на основе списка транзакций.
 *
 * @param transactions - Массив транзакций.
 *
 * @returns Текущий баланс.
 */
export const calculateBalance = (transactions: Transaction[]): number => {
    return transactions.reduce((acc, transaction) => {
        const { amount, type } = transaction;
        const numericAmount = Number(amount);

        return type === "income" ? acc + numericAmount : acc - numericAmount;
    }, 0);
};