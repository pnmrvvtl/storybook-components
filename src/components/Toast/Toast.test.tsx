import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ToastProvider, useToast } from './ToastProvider'
import { Toast } from './Toast'

describe('Toast Component', () => {
    it('renders toast with correct message', () => {
        const handleDismiss = vi.fn()
        render(
            <Toast
                toastId="test-1"
                messageText="Test message"
                variantType="success"
                durationMs={3000}
                onDismissToast={handleDismiss}
            />
        )

        expect(screen.getByText('Test message')).toBeInTheDocument()
    })

    it('calls onDismissToast when close button is clicked', () => {
        const handleDismiss = vi.fn()
        render(
            <Toast
                toastId="test-1"
                messageText="Test message"
                variantType="success"
                durationMs={5000}
                onDismissToast={handleDismiss}
            />
        )

        const closeButton = screen.getByLabelText('Close notification')
        fireEvent.click(closeButton)

        expect(handleDismiss).toHaveBeenCalledWith('test-1')
    })

    it('does not auto-dismiss when duration is 0', async () => {
        vi.useFakeTimers()
        const handleDismiss = vi.fn()

        render(
            <Toast
                toastId="test-1"
                messageText="Test message"
                variantType="error"
                durationMs={0}
                onDismissToast={handleDismiss}
            />
        )

        vi.advanceTimersByTime(5000)

        expect(handleDismiss).not.toHaveBeenCalled()

        vi.useRealTimers()
    })
})

describe('ToastProvider and useToast', () => {
    const TestComponent = () => {
        const { displayToast, toastList } = useToast()

        return (
            <div>
                <button onClick={() => displayToast('Success message', 'success', 3000)}>
                    Show Success
                </button>
                <button onClick={() => displayToast('Error message', 'error', 2000)}>
                    Show Error
                </button>
                <div data-testid="toast-count">{toastList.length}</div>
            </div>
        )
    }

    it('displays toast when displayToast is called', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        )

        const button = screen.getByText('Show Success')
        fireEvent.click(button)

        expect(screen.getByText('Success message')).toBeInTheDocument()
    })

    it('can display multiple toasts', () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        )

        fireEvent.click(screen.getByText('Show Success'))
        fireEvent.click(screen.getByText('Show Error'))

        expect(screen.getByText('Success message')).toBeInTheDocument()
        expect(screen.getByText('Error message')).toBeInTheDocument()
        expect(screen.getByTestId('toast-count')).toHaveTextContent('2')
    })

    it('removes toast when close button is clicked', async () => {
        render(
            <ToastProvider>
                <TestComponent />
            </ToastProvider>
        )

        fireEvent.click(screen.getByText('Show Success'))
        expect(screen.getByText('Success message')).toBeInTheDocument()

        const closeButton = screen.getByLabelText('Close notification')
        fireEvent.click(closeButton)

        await waitFor(() => {
            expect(screen.queryByText('Success message')).not.toBeInTheDocument()
        })
    })
})
