import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from '../components/Toast'

const meta: Meta = {
    title: 'Components/Toast',
    component: () => null,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
            </ToastProvider>
        )
    ],
    parameters: {
        docs: {
            description: {
                component: 'Toast notification system with auto-dismiss, multiple variants (success, error, info), and smooth Framer Motion animations. Toasts appear at the bottom-right corner and can be dismissed manually or automatically.'
            }
        }
    }
}

export default meta
type Story = StoryObj

const ToastDemo = ({ variant, duration, message }: {
    variant: 'success' | 'error' | 'info'
    duration: number
    message: string
}) => {
    const { displayToast } = useToast()

    return (
        <div style={{ padding: '20px' }}>
            <button
                onClick={() => displayToast(message, variant, duration)}
                style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: variant === 'success' ? '#10b981' : variant === 'error' ? '#ef4444' : '#3b82f6',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '16px'
                }}
            >
                Show {variant.charAt(0).toUpperCase() + variant.slice(1)} Toast
            </button>
        </div>
    )
}

export const Success: Story = {
    render: () => <ToastDemo variant="success" message="Operation completed successfully!" duration={3000} />
}

export const Error: Story = {
    render: () => <ToastDemo variant="error" message="An error occurred. Please try again." duration={5000} />
}

export const Info: Story = {
    render: () => <ToastDemo variant="info" message="Here is some useful information for you." duration={4000} />
}

export const LongDuration: Story = {
    render: () => <ToastDemo variant="info" message="This toast will stay for 10 seconds" duration={10000} />
}

export const MultipleToasts: Story = {
    render: () => {
        const { displayToast } = useToast()

        const showMultiple = () => {
            displayToast('First notification', 'success', 6000)
            setTimeout(() => displayToast('Second notification', 'info', 6000), 300)
            setTimeout(() => displayToast('Third notification', 'error', 6000), 600)
        }

        return (
            <div style={{ padding: '20px' }}>
                <button
                    onClick={showMultiple}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#6b7280',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '16px'
                    }}
                >
                    Show Multiple Toasts
                </button>
            </div>
        )
    }
}
