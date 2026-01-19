import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from '../components/Toast'

const meta: Meta = {
    title: 'Components/Toast',
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
            </ToastProvider>
        )
    ]
}

export default meta

const ToastDemo = () => {
    const { displayToast } = useToast()

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2>Toast Notifications</h2>
            <p>Click buttons below to trigger toast notifications</p>

            <button
                onClick={() => displayToast('Operation completed successfully!', 'success', 3000)}
                style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#10b981',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 500
                }}
            >
                Show Success Toast
            </button>

            <button
                onClick={() => displayToast('An error occurred. Please try again.', 'error', 5000)}
                style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#ef4444',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 500
                }}
            >
                Show Error Toast
            </button>

            <button
                onClick={() => displayToast('Here is some useful information for you.', 'info', 4000)}
                style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#3b82f6',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 500
                }}
            >
                Show Info Toast
            </button>

            <button
                onClick={() => {
                    displayToast('First notification', 'success', 6000)
                    setTimeout(() => displayToast('Second notification', 'info', 6000), 300)
                    setTimeout(() => displayToast('Third notification', 'error', 6000), 600)
                }}
                style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#6b7280',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 500
                }}
            >
                Show Multiple Toasts
            </button>

            <button
                onClick={() => displayToast('This toast will stay for 10 seconds', 'info', 10000)}
                style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#8b5cf6',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 500
                }}
            >
                Show Long Duration Toast (10s)
            </button>
        </div>
    )
}

type Story = StoryObj<typeof ToastDemo>

export const InteractiveDemo: Story = {
    render: () => <ToastDemo />
}
