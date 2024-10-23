import "./App.css";
import { Transaction } from "@entities/transaction/model";
import { useState } from "react";
import Balance from "@widgets/budgetOverview/ui/Balance";
import EditTransactionModal from "@features/transaction/editTransaction/ui/EditTransactionModal";
import TransactionForm from "@features/transaction/transactionForm/ui";
import TransactionList from "@features/transaction/listTransactions/ui";

function App() {
  /** Состояние для хранения списка транзакций. */
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  /** Состояние для модального окна. */
  const [isEditTransactionsModalOpen, setIsEditTransactionsModalOpen] =
    useState(false);
  /** Состояние для выбранной транзакции. */
  const [currentTransaction, setCurrentTransaction] =
    useState<Nullable<Transaction>>(null);

  /**
   * Функция для обработки добавления новой транзакции.
   *
   * @param data - данные новой транзакции.
   */
  const handleAddTransaction = (data: Transaction) => {
    const newTransaction: Transaction = {
      ...data,
      id: Date.now().toString(),
    };

    setTransactions([...transactions, newTransaction]);
  };

  /**
   * Функция для изменения существующей транзакции.
   *
   * @param updatedTransactionData - обновленные данные транзакции.
   */
  const handleEditTransaction = (
    updatedTransactionData: Partial<Transaction>
  ) => {
    const { id: updatedTransactionId } = updatedTransactionData;

    setTransactions(
      transactions.map((transaction) => {
        const { id } = transaction;

        return id === updatedTransactionId
          ? { ...transaction, ...updatedTransactionData }
          : transaction;
      })
    );
  };

  /**
   * Функция для открытия модального окна редактирования транзакции.
   *
   * @param transaction - транзакция, которую нужно отредактировать.
   */
  const handleOpenEditTransactionsModal = (transaction: Transaction) => {
    if (!transaction || !transaction.id) return;

    setCurrentTransaction(transaction);
    setIsEditTransactionsModalOpen(true);
  };

  /** Функция для закрытия модального окна редактирования транзакции. */
  const handleCloseEditTransactionsModal = () => {
    setCurrentTransaction(null);
    setIsEditTransactionsModalOpen(false);
  };

  /**
   * Функция для удаления транзакции.
   *
   * @param transaction - транзакция, которую нужно удалить.
   */
  const handleDeleteTransaction = (transaction: Transaction) => {
    const { id: removeTransactionId } = transaction;

    setTransactions(
      transactions.filter((transaction) => {
        const { id } = transaction;

        return id !== removeTransactionId;
      })
    );
  };

  return (
    <>
      <EditTransactionModal
        currentTransaction={currentTransaction}
        isEditTransactionsModalOpen={isEditTransactionsModalOpen}
        onCloseEditTransactionsModal={handleCloseEditTransactionsModal}
        onEditTransaction={handleEditTransaction}
      />

      <div>
        <h1 id="budget-management-heading">Управление бюджетом</h1>

        <TransactionForm onSubmit={handleAddTransaction} />

        <Balance transactions={transactions} />

        <div role="region" aria-labelledby="transaction-list-heading">
          <h2 id="transaction-list-heading">Список транзакций</h2>

          <TransactionList
            transactions={transactions}
            onOpenEditTransactionsModal={handleOpenEditTransactionsModal}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </div>
    </>
  );
}

export default App;
