import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toast } from './Toast'
import type { ToastData, ToastContextValue } from './Toast.types'
import { ToastContainer } from './Toast.styles'

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const useToast = (): ToastContextValue => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within ToastProvider')
    }
    return context
}

interface ToastProviderProps {
    children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toastList, setToastList] = useState<ToastData[]>([])

    const displayToast = useCallback(
        (messageText: string, variantType: ToastData['variantType'], durationMs: number = 3000) => {
            const newToast: ToastData = {
                toastId: `toast-${Date.now()}-${Math.random()}`,
                messageText,
                variantType,
                durationMs
            }
            setToastList(prevList => [...prevList, newToast])
        },
        []
    )

    const removeToast = useCallback((toastId: string) => {
        setToastList(prevList => prevList.filter(toast => toast.toastId !== toastId))
    }, [])

    const contextValue: ToastContextValue = {
        toastList,
        displayToast,
        removeToast
    }

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastContainer>
                <AnimatePresence mode="popLayout">
                    {toastList.map(toast => (
                        <Toast
                            key={toast.toastId}
                            {...toast}
                            onDismissToast={removeToast}
                        />
                    ))}
                </AnimatePresence>
            </ToastContainer>
        </ToastContext.Provider>
    )
}
