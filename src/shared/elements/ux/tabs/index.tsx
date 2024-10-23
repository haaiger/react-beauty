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
  /** Выбранный таб. */
  selectedTab: Nullable<T>;
  /** Функция изменения таба. */
  onSelectFilter: (filter: T) => void;
}

/** Компонент Tabs предоставляет интерфейс для выбора фильтрации данных. */
export const Tabs = <T,>(props: ITabsProps<T>) => {
  const { options, onSelectFilter, selectedTab } = props;
  const [currentTab, setCurrentTab] = React.useState<Nullable<T>>(selectedTab);

  const handleTabSelection = (value: T) => {
    setCurrentTab(value);
    onSelectFilter(value);
  };

  return (
    <div className="tabs" role="tablist">
      {options.map((option) => {
        const { value, label } = option;
        const isSelected = value === currentTab;

        return (
          <button
            key={String(value)}
            role="tab"
            className={isSelected ? "selected" : ""}
            aria-selected={isSelected}
            onClick={() => value && handleTabSelection(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
