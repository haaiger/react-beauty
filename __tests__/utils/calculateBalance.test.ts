import { Transaction } from '@entities/transaction/model';
import { calculateBalance } from '@entities/transaction/utils/calculateBalance';
import { describe, it, expect } from 'vitest';;

describe('calculateBalance', () => {
    it('should return 0 for an empty transaction list', () => {
        const transactions: Transaction[] = [];
        expect(calculateBalance(transactions)).toBe(0);
    });

    it('should correctly calculate balance for income transactions', () => {
        const transactions: Transaction[] = [
            { id: '1', amount: 100, category: 'Salary', date: '2023-10-01', type: 'income' },
            { id: '2', amount: 200, category: 'Bonus', date: '2023-10-02', type: 'income' },
        ];
        expect(calculateBalance(transactions)).toBe(300);
    });

    it('should correctly calculate balance for expense transactions', () => {
        const transactions: Transaction[] = [
            { id: '1', amount: 50, category: 'Groceries', date: '2023-10-01', type: 'expense' },
            { id: '2', amount: 30, category: 'Transport', date: '2023-10-02', type: 'expense' },
        ];
        expect(calculateBalance(transactions)).toBe(-80);
    });

    it('should correctly calculate balance for mixed transactions', () => {
        const transactions: Transaction[] = [
            { id: '1', amount: 100, category: 'Salary', date: '2023-10-01', type: 'income' },
            { id: '2', amount: 50, category: 'Groceries', date: '2023-10-02', type: 'expense' },
            { id: '3', amount: 200, category: 'Bonus', date: '2023-10-03', type: 'income' },
            { id: '4', amount: 30, category: 'Transport', date: '2023-10-04', type: 'expense' },
        ];
        expect(calculateBalance(transactions)).toBe(220);
    });

    it('should handle transactions with zero amount', () => {
        const transactions: Transaction[] = [
            { id: '1', amount: 0, category: 'Gift', date: '2023-10-01', type: 'income' },
            { id: '2', amount: 0, category: 'Misc', date: '2023-10-02', type: 'expense' },
        ];
        expect(calculateBalance(transactions)).toBe(0);
    });
});
