import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import type { MenuItem } from '../components/Sidebar'

const meta: Meta<typeof Sidebar> = {
    title: 'Components/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    }
}

export default meta
type Story = StoryObj<typeof Sidebar>

const sampleMenuSimple: MenuItem[] = [
    { itemId: '1', labelText: 'Home', iconName: '🏠', linkPath: '#' },
    { itemId: '2', labelText: 'About', iconName: '📖', linkPath: '#about' },
    { itemId: '3', labelText: 'Services', iconName: '⚙️', linkPath: '#services' },
    { itemId: '4', labelText: 'Contact', iconName: '📧', linkPath: '#contact' }
]

const sampleMenuOneLevelNested: MenuItem[] = [
    { itemId: '1', labelText: 'Dashboard', iconName: '📊', linkPath: '#' },
    {
        itemId: '2',
        labelText: 'Products',
        iconName: '📦',
        subMenuItems: [
            { itemId: '2-1', labelText: 'All Products', linkPath: '#products' },
            { itemId: '2-2', labelText: 'Categories', linkPath: '#products-categories' },
            { itemId: '2-3', labelText: 'Brands', linkPath: '#products-brands' }
        ]
    },
    { itemId: '3', labelText: 'Orders', iconName: '🛒', linkPath: '#orders' },
    {
        itemId: '4',
        labelText: 'Settings',
        iconName: '⚙️',
        subMenuItems: [
            { itemId: '4-1', labelText: 'Profile', linkPath: '#settings-profile' },
            { itemId: '4-2', labelText: 'Security', linkPath: '#settings-security' }
        ]
    }
]

const sampleMenuMultiLevelNested: MenuItem[] = [
    { itemId: '1', labelText: 'Home', iconName: '🏠', linkPath: '#' },
    {
        itemId: '2',
        labelText: 'Products',
        iconName: '📦',
        subMenuItems: [
            { itemId: '2-1', labelText: 'Electronics', linkPath: '#products-electronics' },
            {
                itemId: '2-2',
                labelText: 'Computers',
                subMenuItems: [
                    { itemId: '2-2-1', labelText: 'Laptops', linkPath: '#products-laptops' },
                    { itemId: '2-2-2', labelText: 'Desktops', linkPath: '#products-desktops' },
                    {
                        itemId: '2-2-3',
                        labelText: 'Accessories',
                        subMenuItems: [
                            { itemId: '2-2-3-1', labelText: 'Keyboards', linkPath: '#accessories-keyboards' },
                            { itemId: '2-2-3-2', labelText: 'Mice', linkPath: '#accessories-mice' },
                            { itemId: '2-2-3-3', labelText: 'Monitors', linkPath: '#accessories-monitors' }
                        ]
                    }
                ]
            },
            { itemId: '2-3', labelText: 'Phones', linkPath: '#products-phones' }
        ]
    },
    {
        itemId: '3',
        labelText: 'Account',
        iconName: '👤',
        subMenuItems: [
            { itemId: '3-1', labelText: 'Profile', linkPath: '#account-profile' },
            {
                itemId: '3-2',
                labelText: 'Settings',
                subMenuItems: [
                    { itemId: '3-2-1', labelText: 'Privacy', linkPath: '#settings-privacy' },
                    { itemId: '3-2-2', labelText: 'Notifications', linkPath: '#settings-notifications' }
                ]
            }
        ]
    }
]

const SidebarDemo = ({ menuItems }: { menuItems: MenuItem[] }) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div style={{ minHeight: '600px', padding: '20px', position: 'relative' }}>
            <button
                onClick={() => setIsOpen(true)}
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
                Open Sidebar
            </button>

            <Sidebar
                menuItems={menuItems}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    )
}

export const SimpleMenu: Story = {
    render: () => <SidebarDemo menuItems={sampleMenuSimple} />
}

export const OneLevelNested: Story = {
    render: () => <SidebarDemo menuItems={sampleMenuOneLevelNested} />
}

export const MultiLevelNested: Story = {
    render: () => <SidebarDemo menuItems={sampleMenuMultiLevelNested} />
}

export const Closed: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)
        return (
            <div style={{ minHeight: '600px', padding: '20px', position: 'relative' }}>
                <button
                    onClick={() => setIsOpen(true)}
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
                    Open Sidebar
                </button>

                <Sidebar
                    menuItems={sampleMenuOneLevelNested}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </div>
        )
    }
}
