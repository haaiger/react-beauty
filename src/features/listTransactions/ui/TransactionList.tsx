import { Transaction } from "@entities/transaction/model";
import { FC } from "react";

/** Интерфейс для пропсов компонента TransactionList. */
interface ITransactionListProps {
  /** Массив транзакций для расчета баланса. */
  transactions: Transaction[];
}

/** Компонент TransactionList отображает список транзакций. */
const TransactionList: FC<ITransactionListProps> = (props) => {
  const { transactions } = props;

  return (
    <ul>
      {transactions.map((transaction) => {
        const { id, date, category, amount } = transaction;

        return (
          <li key={id}>
            {date} - {category}: {amount} руб.
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
