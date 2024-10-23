import { Transaction } from "@entities/transaction/model";
import TransactionForm from "@features/transaction/transactionForm/ui";
import Modal from "@shared/css/elements/ux/modal";
import { FC } from "react";

/** Интерфейс для пропсов компонента EditTransactionModal. */
interface IEditTransactionModalProps {
  /** Текущая транзакция для редактирования. */
  currentTransaction: Nullable<Transaction>;
  /** Флаг, указывающий, открыто ли модальное окно редактирования транзакции. */
  isEditTransactionsModalOpen: boolean;
  /** Функция для закрытия модального окна редактирования транзакции. */
  onCloseEditTransactionsModal: () => void;
  /** Функция для обработки изменения транзакции. */
  onEditTransaction: (transaction: Transaction) => void;
}

/** Компонент EditTransactionModal предоставляет модальное окно для редактирования транзакции. */
const EditTransactionModal: FC<IEditTransactionModalProps> = (props) => {
  const {
    currentTransaction,
    isEditTransactionsModalOpen,
    onCloseEditTransactionsModal,
    onEditTransaction,
  } = props;

  return (
    <Modal
      isOpen={isEditTransactionsModalOpen}
      onClose={onCloseEditTransactionsModal}
    >
      {currentTransaction && (
        <TransactionForm
          defaultValues={currentTransaction}
          onSubmit={(updatedData) => {
            onEditTransaction(updatedData);
            onCloseEditTransactionsModal();
          }}
        />
      )}
    </Modal>
  );
};

export default EditTransactionModal;
