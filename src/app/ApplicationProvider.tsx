import { type FC } from "react";
import { AlertProvider } from "@shared/providers/alertProvider";

export interface IApplicationProviderProps {
  children: Children;
}

/**
 * Содержит все провайдеры приложения.
 *
 * * AlertProvider - используется для отображения алертов в приложении
 */
export const ApplicationProvider: FC<IApplicationProviderProps> = (props) => {
  const { children } = props;

  return <AlertProvider>{children}</AlertProvider>;
};
