import { Transaction } from "@entities/transaction/model";
import { FC } from "react";
import "./style.css";

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
            <article
              className="transaction-item"
              aria-labelledby={`transaction-${id}`}
            >
              <p id={`transaction-${id}`}>
                {date} - {category}: {amount} руб.
              </p>

              <div>
                <button
                  aria-label={`Изменить транзакцию ${category} на сумму ${amount} руб.`}
                  onClick={() => onOpenEditTransactionsModal(transaction)}
                >
                  Изменить
                </button>

                <button
                  aria-label={`Удалить транзакцию ${category} на сумму ${amount} руб.`}
                  onClick={() => onDeleteTransaction(transaction)}
                >
                  Удалить
                </button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
