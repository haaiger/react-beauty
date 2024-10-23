import { FC } from "react";
import { Transaction } from "@entities/transaction/model";
import { calculateBalance } from "@entities/transaction/utils/calculateBalance";

/** Интерфейс для пропсов компонента Balance. */
interface IBalanceProps {
  /** Массив транзакций для расчета баланса. */
  transactions: Transaction[];
  /** Заголовок для баланса. */
  title?: string;
}

/** Компонент Balance отображает текущий баланс пользователя
 * на основе переданного списка транзакций.
 */
const Balance: FC<IBalanceProps> = (props) => {
  const { transactions, title = "Текущий баланс" } = props;

  /** Расчет баланса. */
  const balance = calculateBalance(transactions);

  return (
    <div role="region" aria-labelledby="balance-heading" aria-live="polite">
      <h2 id="balance-heading">{title}</h2>

      <p>{balance} руб.</p>
    </div>
  );
};

export default Balance;
