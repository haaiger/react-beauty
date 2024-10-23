import { motion, type HTMLMotionProps, type PanInfo } from "framer-motion";
import { useEffect, useState, useCallback, useRef, forwardRef } from "react";

import { useAlert } from "@shared/providers/alertProvider";
import "./styles.css";

export interface IAlertProps extends Omit<HTMLMotionProps<"div">, "className"> {
  /** Время в мс, сколько должен отобажаться алерт. */
  delay?: number;
  /** Текстовое сообщение. */
  message?: Children;
  /** ID алерта. */
  id: string;
}

export const Alert = forwardRef<HTMLDivElement, IAlertProps>((props, ref) => {
  const { delay = 3000, message, id, ...rest } = props;

  const { hide } = useAlert();
  const hiderAlertTimer = useRef<unknown>();

  const [show, setShow] = useState(true);
  const [copy, setCopy] = useState(false);

  /** Обработчик нажатия по алерту - скрывает алерт, по которому кликнули. */
  const handleHideAlert = useCallback(() => hide(id), [hide, id]);

  useEffect(() => {
    return () => {
      clearTimeout(Number(hiderAlertTimer.current));
    };
  }, []);

  useEffect(() => {
    hiderAlertTimer.current = setTimeout(() => {
      setShow(false);
    }, delay);
  }, [delay]);

  useEffect(() => {
    if (!show) {
      handleHideAlert();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.y;

    if (Math.abs(offset) > 20) {
      handleHideAlert();
    }
  };

  const handleHover = () => {
    clearTimeout(Number(hiderAlertTimer.current));
  };

  const handleClick = (e: React.PointerEvent<HTMLDivElement>) => {
    const isMouseClick = e.nativeEvent.pointerType === "mouse";

    if (!isMouseClick) return;

    setTimeout(() => {
      setCopy(true);

      navigator.clipboard.writeText(String(message));
    }, 200);
  };

  const handleTouch = () => {
    handleHover();

    setTimeout(() => {
      setCopy(true);

      navigator.clipboard.writeText(String(message));
    }, 1200);
  };

  useEffect(() => {
    if (!("vibrate" in navigator)) return;
    if (copy) navigator.vibrate(70);
  }, [copy]);

  return (
    <motion.div
      ref={ref}
      animate={{ y: 0, opacity: 1 }}
      data-testid={"alert"}
      drag={"y"}
      exit={{ y: "-100%", opacity: 0 }}
      initial={{ y: "-100%", opacity: 1 }}
      key={id}
      layout
      transition={{ type: "spring", bounce: 0.1 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      dragConstraints={{
        bottom: 0,
      }}
      onClick={handleClick}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleHover}
      onMouseLeave={handleHideAlert}
      onTouchEnd={handleHideAlert}
      onTouchStart={handleTouch}
      {...rest}
    >
      <h3 className="alert" data-testid={"alert-children"}>
        {message}
      </h3>
    </motion.div>
  );
});
