import { AnimatePresence } from "framer-motion";
import { type FC, useState, createContext, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { Alert, type IAlertProps } from "@shared/elements/ux";
import "./styles.css";

export type ControlledAlertProps = Omit<IAlertProps, "id"> & {
  /** ID алерта. */
  id?: string;
};

export type AlertContext = {
  /** Показать алерт. */
  show: (alert: ControlledAlertProps) => void;
  /** Скрыть алерт. */
  hide: (id: string) => void;
};

export const AlertContext = createContext<AlertContext>({
  show: () => null,
  hide: () => null,
});

export interface IAlertPropviderProps {
  children: Children;
}

export const AlertProvider: FC<IAlertPropviderProps> = (props) => {
  const { children } = props;

  const root = document.getElementById("alert-root");

  const [alerts, setAlerts] = useState<IAlertProps[]>([]);

  const handleAlertShow = useCallback(
    (alert: ControlledAlertProps) => {
      const id = alert.id || window.crypto.randomUUID();

      setAlerts((prevAlert) => [
        ...prevAlert,
        {
          ...alert,
          id,
        },
      ]);
    },
    [setAlerts]
  );

  const handleAlertRemove = useCallback(
    (id: string) => {
      setAlerts((prevAlert) => prevAlert.filter((alert) => alert.id !== id));
    },
    [setAlerts]
  );

  const value = useMemo(() => {
    return { show: handleAlertShow, hide: handleAlertRemove };
  }, [handleAlertRemove, handleAlertShow]);

  return (
    <AlertContext.Provider value={value}>
      {createPortal(
        <div className="alert-container" id="alerts">
          <AnimatePresence mode="popLayout">
            {alerts.map((alert) => {
              const { id } = alert;

              return <Alert key={id} {...alert} data-testid="alert" />;
            })}
          </AnimatePresence>
        </div>,
        root ?? document.body
      )}

      {children}
    </AlertContext.Provider>
  );
};
