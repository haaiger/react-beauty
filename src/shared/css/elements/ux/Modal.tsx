import { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

/** Интерфейс для компонента модального окна Modal. */
interface ModalProps {
  /** Флаг, который определяет, открыто ли модальное окно */
  isOpen: boolean;
  /** Функция для закрытия модального окна. */
  onClose: () => void;
  /** Содержимое, которое будет отображаться внутри модального окна. */
  children: ReactNode;
}

/**
 * Компонент Modal отображает содержимое в виде модального окна,
 * используя React Portals для рендеринга в отдельный элемент DOM.
 */
const Modal: FC<ModalProps> = (props) => {
  const { isOpen, onClose, children } = props;

  /** Если модальное окно не должно быть открыто, ничего не рендерим. */
  if (!isOpen) return null;

  /** Получаем элемент DOM, в который будет рендериться модальное окно. */
  const portalRoot = document.getElementById("portal-root");

  /** Если элемент не найден, ничего не рендерим. */
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        {children}
      </div>
    </div>,
    portalRoot
  );
};

export default Modal;