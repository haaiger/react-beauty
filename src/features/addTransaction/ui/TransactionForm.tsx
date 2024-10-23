import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Transaction } from "@entities/transaction/model";

/** Интерфейс для пропсов компонента TransactionForm. */
interface TransactionFormProps {
  /**  Функция для обработки отправки формы. */
  onSubmit: (data: Transaction) => void;
}

/** Компонент TransactionForm предоставляет форму для добавления новой транзакции. */
const TransactionForm: FC<TransactionFormProps> = (props) => {
  const { onSubmit } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Сумма</label>

        <Controller
          name="amount"
          control={control}
          defaultValue={0}
          rules={{ required: "Сумма обязательна", min: 0.01 }}
          render={({ field }) => <input type="number" step="0.01" {...field} />}
        />

        {errors.amount && <span>{errors.amount.message}</span>}
      </div>

      <div>
        <label>Категория</label>

        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: "Категория обязательна" }}
          render={({ field }) => <input type="text" {...field} />}
        />

        {errors.category && <span>{errors.category.message}</span>}
      </div>

      <div>
        <label>Дата</label>

        <Controller
          name="date"
          control={control}
          defaultValue={new Date().toISOString().split("T")[0]}
          rules={{ required: "Дата обязательна" }}
          render={({ field }) => <input type="date" {...field} />}
        />

        {errors.date && <span>{errors.date.message}</span>}
      </div>

      <div>
        <label>Тип</label>

        <Controller
          name="type"
          control={control}
          defaultValue="expense"
          render={({ field }) => (
            <select {...field}>
              <option value="income">Доход</option>

              <option value="expense">Расход</option>
            </select>
          )}
        />
      </div>

      <button type="submit">Добавить транзакцию</button>
    </form>
  );
};

export default TransactionForm;
