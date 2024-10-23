import { FC } from "react";
import { Transaction } from "@entities/transaction/model";
import { calculateBalance } from "@entities/transaction/utils/calculateBalance";

/** Интерфейс для пропсов компонента Balance. */
interface BalanceProps {
  /** Массив транзакций для расчета баланса. */
  transactions: Transaction[];
}

/** Компонент Balance отображает текущий баланс пользователя
 * на основе переданного списка транзакций.
 */
const Balance: FC<BalanceProps> = (props) => {
  const { transactions } = props;

  /** Расчет баланса. */
  const balance = calculateBalance(transactions);

  return (
    <div>
      <h2>Текущий баланс</h2>
      <p>{balance} руб.</p>{" "}
    </div>
  );
};

export default Balance;
