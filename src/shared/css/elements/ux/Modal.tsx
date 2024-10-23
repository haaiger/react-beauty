import { FC, ReactNode, useRef } from "react";
import ReactDOM from "react-dom";
import { useClickAway } from "react-use";
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

  /** Создаем реф для модального контента. */
  const modalRef = useRef<HTMLDivElement>(null);

  /** Используем хук useClickAway для закрытия модального окна при клике вне его области. */
  useClickAway(modalRef, onClose);

  /** Если модальное окно не должно быть открыто, ничего не рендерим. */
  if (!isOpen) return null;

  /** Получаем элемент DOM, в который будет рендериться модальное окно. */
  const portalRoot = document.getElementById("portal-root");

  /** Если элемент не найден, ничего не рендерим. */
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content" role="document" ref={modalRef}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    portalRoot
  );
};

export default Modal;
