/** Тип, который может быть либо заданного типа, либо null. */
type Nullable<T = unknown> = T | null

/** Дочерний элемент. */
type Children = ReactNode