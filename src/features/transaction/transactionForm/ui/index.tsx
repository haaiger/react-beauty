import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { Transaction } from "@entities/transaction/model";

/** Интерфейс для пропсов компонента TransactionForm. */
interface TransactionFormProps {
  /** Значения по умолчанию для полей формы. */
  defaultValues?: Partial<Transaction>;
  /**  Функция для обработки отправки формы. */
  onSubmit: (data: Transaction) => void;
}

/** Компонент TransactionForm предоставляет форму для добавления новой транзакции. */
const TransactionForm: FC<TransactionFormProps> = (props) => {
  const { onSubmit, defaultValues } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="amount">Сумма</label>

        <Controller
          name="amount"
          control={control}
          defaultValue={0}
          rules={{ required: "Сумма обязательна", min: 0.01 }}
          render={({ field }) => (
            <input
              placeholder="0"
              aria-label="Сумма транзакции"
              type="number"
              step="0.01"
              {...field}
              onFocus={(e) => e.target.value === "0" && (e.target.value = "")} // Убирает дефолтное значение при фокусе
              onBlur={(e) => e.target.value === "" && (e.target.value = "0")}
            />
          )}
        />

        {errors.amount && <span>{errors.amount.message}</span>}
      </div>

      <div>
        <label htmlFor="category">Категория</label>

        <Controller
          name="category"
          control={control}
          defaultValue=""
          aria-label="Категория транзакции"
          rules={{ required: "Категория обязательна" }}
          render={({ field }) => (
            <input aria-label="Категория транзакции" type="text" {...field} />
          )}
        />

        {errors.category && <span>{errors.category.message}</span>}
      </div>

      <div>
        <label htmlFor="date">Дата</label>

        <Controller
          name="date"
          control={control}
          aria-label="Дата транзакции"
          defaultValue={new Date().toISOString().split("T")[0]}
          rules={{ required: "Дата обязательна" }}
          render={({ field }) => (
            <input aria-label="Дата транзакции" type="date" {...field} />
          )}
        />

        {errors.date && <span>{errors.date.message}</span>}
      </div>

      <div>
        <label htmlFor="type">Дата</label>

        <Controller
          name="type"
          control={control}
          defaultValue="income"
          render={({ field }) => (
            <select aria-label="Тип транзакции" {...field}>
              <option value="income">Доход</option>

              <option value="expense">Расход</option>
            </select>
          )}
        />
      </div>

      <button type="submit" aria-label="Добавить транзакцию">
        Добавить транзакцию
      </button>
    </form>
  );
};

export default TransactionForm;
