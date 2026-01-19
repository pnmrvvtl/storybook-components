import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useToastAutoDismiss } from './Toast.hooks'
import type { ToastProps } from './Toast.types'
import {
    ToastItem,
    ToastIcon,
    ToastMessage,
    CloseButton
} from './Toast.styles'

const SuccessIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
)

const ErrorIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
)

const InfoIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
)

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

const iconMap = {
    success: SuccessIcon,
    error: ErrorIcon,
    info: InfoIcon
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(({
    toastId,
    messageText,
    variantType,
    durationMs,
    onDismissToast
}, ref) => {
    useToastAutoDismiss(toastId, durationMs, onDismissToast)

    const IconComponent = iconMap[variantType]

    const handleClose = () => {
        onDismissToast(toastId)
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            layout
        >
            <ToastItem $variantType={variantType}>
                <ToastIcon $variantType={variantType}>
                    <IconComponent />
                </ToastIcon>

                <ToastMessage>{messageText}</ToastMessage>

                <CloseButton
                    onClick={handleClose}
                    aria-label="Close notification"
                >
                    <CloseIcon />
                </CloseButton>
            </ToastItem>
        </motion.div>
    )
})

Toast.displayName = 'Toast'
