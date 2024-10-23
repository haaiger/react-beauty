import { Transaction } from "@entities/transaction/model";
import { useState } from "react";
import Balance from "@widgets/budgetOverview/ui/Balance";
import EditTransactionModal from "@features/transaction/editTransaction/ui/EditTransactionModal";
import TransactionForm from "@features/transaction/transactionForm/ui";
import TransactionList from "@features/transaction/listTransactions/ui";
import { useAlert } from "@shared/providers/alertProvider";

const App = () => {
  /** Состояние для хранения списка транзакций. */
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  /** Состояние для модального окна. */
  const [isEditTransactionsModalOpen, setIsEditTransactionsModalOpen] =
    useState(false);
  /** Состояние для выбранной транзакции. */
  const [currentTransaction, setCurrentTransaction] =
    useState<Nullable<Transaction>>(null);

  const alert = useAlert();

  /**
   * Функция для добавления новой транзакции.
   *
   * @param transaction - данные новой транзакции.
   */
  const handleAddTransaction = (transaction: Transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };

    setTransactions((prev) => [...prev, newTransaction]);

    alert.show({
      message: "Новая транзакция успешно добавлена!",
    });
  };

  /**
   * Функция для изменения существующей транзакции.
   *
   * @param updatedTransactionInfo - обновленные данные транзакции.
   */
  const handleEditTransaction = (
    updatedTransactionInfo: Partial<Transaction>
  ) => {
    const { id: updatedTransactionId } = updatedTransactionInfo;

    setTransactions((prev) =>
      prev.map((transaction) => {
        const { id } = transaction;

        return id === updatedTransactionId
          ? { ...transaction, ...updatedTransactionInfo }
          : transaction;
      })
    );

    alert.show({
      message: "Транзакция успешно обновлена!",
    });
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

    alert.show({
      message: "Транзакция успешно удалена!",
    });
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
};

export default App;
