import TransactionForm from "@features/addTransaction/ui/TransactionForm";
import "./App.css";
import TransactionList from "@features/listTransactions/ui/TransactionList";
import { Transaction } from "@entities/transaction/model";
import { useState } from "react";
import Balance from "@widgets/budgetOverview/ui/Balance";

function App() {
  /** Состояние для хранения списка транзакций. */
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  /** Функция для обработки добавления новой транзакции. */
  const handleAddTransaction = (data: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...data,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div>
      <h1>Управление бюджетом</h1>

      <TransactionForm onSubmit={handleAddTransaction} />

      <Balance transactions={transactions} />

      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
