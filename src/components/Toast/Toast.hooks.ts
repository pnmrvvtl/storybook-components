import { useEffect } from 'react'

export const useToastAutoDismiss = (
    toastId: string,
    durationMs: number,
    onDismissToast: (id: string) => void
) => {
    useEffect(() => {
        if (durationMs <= 0) return

        const dismissTimer = setTimeout(() => {
            onDismissToast(toastId)
        }, durationMs)

        return () => {
            clearTimeout(dismissTimer)
        }
    }, [toastId, durationMs, onDismissToast])
}
