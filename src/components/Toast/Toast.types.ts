export type ToastVariant = 'success' | 'error' | 'info'

export interface ToastData {
    toastId: string
    messageText: string
    variantType: ToastVariant
    durationMs: number
}

export interface ToastProps extends ToastData {
    onDismissToast: (toastId: string) => void
}

export interface ToastContextValue {
    toastList: ToastData[]
    displayToast: (messageText: string, variantType: ToastVariant, durationMs?: number) => void
    removeToast: (toastId: string) => void
}
