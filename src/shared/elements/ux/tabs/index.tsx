import "./styles.css";
import React from "react";

/** Интерфейс для одной опции таба с дженериком. */
interface ITabOption<T> {
  /** Значение, которое будет передано при выборе таба. */
  value: T;
  /** Текст, который будет отображаться на кнопке. */
  label: string;
}

/** Интерфейс для пропсов компонента Tabs с дженериком. */
interface ITabsProps<T> {
  /** Массив опций для табов. */
  options: ITabOption<T>[];
  /** Функция изменения таба. */
  onSelectFilter: (filter: T) => void;
}

/** Компонент Tabs предоставляет интерфейс для выбора фильтрации данных. */
export const Tabs = <T,>(props: ITabsProps<T>) => {
  const { options, onSelectFilter } = props;
  const [selectedTab, setSelectedTab] = React.useState<T | null>(null);

  return (
    <div className="tabs" role="tablist">
      {options.map((option) => {
        const { value, label } = option;
        const isSelected = value === selectedTab;

        return (
          <button
            key={String(value)}
            role="tab"
            className={isSelected ? "selected" : ""}
            aria-selected={isSelected}
            onClick={() => {
              setSelectedTab(value);
              onSelectFilter(value);
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
