import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider, useToast } from './components/Toast'
import { Input } from './components/Input'
import { Sidebar } from './components/Sidebar'
import type { MenuItem } from './components/Sidebar'

const menuItems: MenuItem[] = [
    { itemId: '1', labelText: 'Home', iconName: '🏠', linkPath: '#home' },
    { itemId: '2', labelText: 'About', iconName: '📖', linkPath: '#about' },
    {
        itemId: '3',
        labelText: 'Products',
        iconName: '📦',
        subMenuItems: [
            { itemId: '3-1', labelText: 'All Products', linkPath: '#products' },
            { itemId: '3-2', labelText: 'Categories', linkPath: '#categories' },
            {
                itemId: '3-3',
                labelText: 'Electronics',
                subMenuItems: [
                    { itemId: '3-3-1', labelText: 'Laptops', linkPath: '#laptops' },
                    { itemId: '3-3-2', labelText: 'Phones', linkPath: '#phones' }
                ]
            }
        ]
    },
    { itemId: '4', labelText: 'Contact', iconName: '📧', linkPath: '#contact' }
]

const DemoApp = () => {
    const [textValue, setTextValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { displayToast } = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!textValue || !emailValue || !passwordValue) {
            displayToast('Please fill in all fields', 'error', 4000)
            return
        }

        if (!emailValue.includes('@')) {
            displayToast('Please enter a valid email address', 'error', 4000)
            return
        }

        displayToast('Form submitted successfully!', 'success', 3000)
        setTimeout(() => {
            displayToast('Your account has been created', 'info', 4000)
        }, 500)
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                background: 'white',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '32px'
                }}>
                    <h1 style={{
                        margin: 0,
                        fontSize: '32px',
                        fontWeight: 700,
                        color: '#111827'
                    }}>
                        Component Library Demo
                    </h1>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#667eea',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '14px'
                        }}
                    >
                        ☰ Menu
                    </button>
                </div>

                <p style={{
                    color: '#6b7280',
                    marginBottom: '32px',
                    fontSize: '16px',
                    lineHeight: '1.6'
                }}>
                    This demo showcases all three components working together: Input fields with validation,
                    Toast notifications, and a Sidebar menu with nested items.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Input
                        inputType="text"
                        value={textValue}
                        onValueChange={setTextValue}
                        labelText="Full Name"
                        placeholderText="Enter your full name"
                        isClearable={true}
                    />

                    <Input
                        inputType="text"
                        value={emailValue}
                        onValueChange={setEmailValue}
                        labelText="Email Address"
                        placeholderText="your.email@example.com"
                        isClearable={true}
                    />

                    <Input
                        inputType="password"
                        value={passwordValue}
                        onValueChange={setPasswordValue}
                        labelText="Password"
                        placeholderText="Enter your password"
                    />

                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        marginTop: '8px'
                    }}>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                padding: '14px 24px',
                                borderRadius: '8px',
                                border: 'none',
                                background: '#10b981',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '16px'
                            }}
                        >
                            Submit Form
                        </button>
                        <button
                            type="button"
                            onClick={() => displayToast('This is an info message!', 'info', 3000)}
                            style={{
                                flex: 1,
                                padding: '14px 24px',
                                borderRadius: '8px',
                                border: '2px solid #3b82f6',
                                background: 'white',
                                color: '#3b82f6',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '16px'
                            }}
                        >
                            Show Info Toast
                        </button>
                    </div>
                </form>

                <div style={{
                    marginTop: '32px',
                    padding: '20px',
                    background: '#f3f4f6',
                    borderRadius: '8px'
                }}>
                    <h3 style={{ marginTop: 0, color: '#374151', fontSize: '18px' }}>Component Features:</h3>
                    <ul style={{ color: '#6b7280', lineHeight: '1.8', paddingLeft: '20px' }}>
                        <li><strong>Input:</strong> Type validation, password toggle, clearable</li>
                        <li><strong>Toast:</strong> Success/error/info variants, auto-dismiss</li>
                        <li><strong>Sidebar:</strong> Nested menus, smooth animations</li>
                    </ul>
                </div>
            </div>

            <Sidebar
                menuItems={menuItems}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
    )
}

const App = () => (
    <ToastProvider>
        <DemoApp />
    </ToastProvider>
)

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find root element')

createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
