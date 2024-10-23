import { useContext } from 'react'

import { AlertContext } from '@shared/providers/alertProvider'

/**
 * Хук useAlert предоставляет функции для показа и скрытия алертов.
 * Использует AlertContext для управления состоянием алертов.
 * 
 * @returns {AlertContext} Объект с методами show и hide для управления алертами.
 */
export const useAlert = () => useContext(AlertContext)
