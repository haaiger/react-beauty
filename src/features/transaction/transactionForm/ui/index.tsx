import { FC, memo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Transaction } from "@entities/transaction/model";
import {
  validateAmount,
  validateDate,
} from "@entities/transaction/utils/validation";

/** Интерфейс для пропсов компонента TransactionForm. */
interface TransactionFormProps {
  /** Значения по умолчанию для полей формы. */
  defaultValues?: Partial<Transaction>;
  /** Текст для кнопки отправки формы. */
  submitButtonText?: string;
  /** Функция для обработки отправки формы. */
  onSubmit: (transaction: Transaction) => void;
}

/** Компонент TransactionForm предоставляет форму для добавления новой транзакции. */
const TransactionForm: FC<TransactionFormProps> = memo((props) => {
  const {
    defaultValues,
    submitButtonText = "Добавить транзакцию",
    onSubmit,
  } = props;

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
          rules={{
            required: "Сумма обязательна",
            validate: validateAmount,
          }}
          render={({ field }) => (
            <input
              placeholder="0"
              id="amount"
              aria-label="Сумма транзакции"
              aria-describedby={errors.amount ? "amount-error" : undefined}
              type="number"
              step="0.01"
              {...field}
              onFocus={() => {
                if (field.value === 0) {
                  field.onChange("");
                }
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  field.onChange("0");
                }
              }}
            />
          )}
        />
        {errors.amount && (
          <span id="amount-error">{errors.amount.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="category">Категория</label>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: "Категория обязательна" }}
          render={({ field }) => (
            <input
              id="category"
              aria-label="Категория транзакции"
              aria-describedby={errors.category ? "category-error" : undefined}
              type="text"
              {...field}
            />
          )}
        />
        {errors.category && (
          <span id="category-error">{errors.category.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="date">Дата</label>
        <Controller
          name="date"
          control={control}
          defaultValue={new Date().toISOString().split("T")[0]}
          rules={{
            required: "Дата обязательна",
            validate: validateDate,
          }}
          render={({ field }) => (
            <input
              id="date"
              aria-label="Дата транзакции"
              aria-describedby={errors.date ? "date-error" : undefined}
              type="date"
              {...field}
            />
          )}
        />
        {errors.date && <span id="date-error">{errors.date.message}</span>}
      </div>

      <div>
        <label htmlFor="type">Тип</label>
        <Controller
          name="type"
          control={control}
          defaultValue="income"
          render={({ field }) => (
            <select id="type" aria-label="Тип транзакции" {...field}>
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
            </select>
          )}
        />
      </div>

      <button type="submit" aria-label="Добавить транзакцию">
        {submitButtonText}
      </button>
    </form>
  );
});

export default TransactionForm;
