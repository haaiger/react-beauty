import { Transaction } from "@entities/transaction/model";
import { FC } from "react";

/** Интерфейс для пропсов компонента TransactionList. */
interface ITransactionListProps {
  /** Массив транзакций для расчета баланса. */
  transactions: Transaction[];
  /** Функция для открытия формы редактирования информации о транзакции. */
  onOpenEditTransactionsModal: (transaction: Transaction) => void;
  /** Функция для удаления транзакции. */
  onDeleteTransaction: (transaction: Transaction) => void;
}

/** Компонент TransactionList отображает список транзакций. */
const TransactionList: FC<ITransactionListProps> = (props) => {
  const { transactions, onOpenEditTransactionsModal, onDeleteTransaction } =
    props;

  return (
    <ul>
      {transactions.map((transaction) => {
        const { id, date, category, amount } = transaction;

        return (
          <li key={id}>
            {date} - {category}: {amount} руб.
            <button onClick={() => onOpenEditTransactionsModal(transaction)}>
              Изменить
            </button>
            <button onClick={() => onDeleteTransaction(transaction)}>
              Удалить
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
