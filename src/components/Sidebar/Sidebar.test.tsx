import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Sidebar } from './Sidebar'
import type { MenuItem } from './Sidebar.types'

const sampleMenu: MenuItem[] = [
    { itemId: '1', labelText: 'Home', linkPath: '/' },
    { itemId: '2', labelText: 'About', linkPath: '/about' }
]

const nestedMenu: MenuItem[] = [
    { itemId: '1', labelText: 'Dashboard', linkPath: '/' },
    {
        itemId: '2',
        labelText: 'Products',
        subMenuItems: [
            { itemId: '2-1', labelText: 'All Products', linkPath: '/products' },
            { itemId: '2-2', labelText: 'Categories', linkPath: '/products/categories' }
        ]
    }
]

const deeplyNestedMenu: MenuItem[] = [
    {
        itemId: '1',
        labelText: 'Level 1',
        subMenuItems: [
            {
                itemId: '1-1',
                labelText: 'Level 2',
                subMenuItems: [
                    { itemId: '1-1-1', labelText: 'Level 3', linkPath: '/level3' }
                ]
            }
        ]
    }
]

describe('Sidebar Component', () => {
    it('renders sidebar when isOpen is true', () => {
        const handleClose = vi.fn()
        render(
            <Sidebar
                menuItems={sampleMenu}
                isOpen={true}
                onClose={handleClose}
            />
        )

        expect(screen.getByText('Menu')).toBeInTheDocument()
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('About')).toBeInTheDocument()
    })

    it('does not render sidebar when isOpen is false', () => {
        const handleClose = vi.fn()
        render(
            <Sidebar
                menuItems={sampleMenu}
                isOpen={false}
                onClose={handleClose}
            />
        )

        expect(screen.queryByText('Menu')).not.toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
        const handleClose = vi.fn()
        render(
            <Sidebar
                menuItems={sampleMenu}
                isOpen={true}
                onClose={handleClose}
            />
        )

        const closeButton = screen.getByLabelText('Close sidebar')
        fireEvent.click(closeButton)

        expect(handleClose).toHaveBeenCalled()
    })

    it('calls onClose when overlay is clicked', () => {
        const handleClose = vi.fn()
        const { container } = render(
            <Sidebar
                menuItems={sampleMenu}
                isOpen={true}
                onClose={handleClose}
            />
        )

        const overlay = container.querySelector('div[style*="background: rgba(0, 0, 0, 0.5)"]')
        if (overlay) {
            fireEvent.click(overlay)
            expect(handleClose).toHaveBeenCalled()
        }
    })

    it('expands nested submenu when parent item is clicked', () => {
        const handleClose = vi.fn()
        render(
            <Sidebar
                menuItems={nestedMenu}
                isOpen={true}
                onClose={handleClose}
            />
        )

        expect(screen.queryByText('All Products')).not.toBeInTheDocument()

        const productsButton = screen.getByText('Products')
        fireEvent.click(productsButton)

        expect(screen.getByText('All Products')).toBeInTheDocument()
        expect(screen.getByText('Categories')).toBeInTheDocument()
    })

    it('collapses submenu when parent item is clicked again', () => {
        const handleClose = vi.fn()
        render(
            <Sidebar
                menuItems={nestedMenu}
                isOpen={true}
                onClose={handleClose}
            />
        )

        const productsButton = screen.getByText('Products')
        fireEvent.click(productsButton)
        expect(screen.getByText('All Products')).toBeInTheDocument()

        fireEvent.click(productsButton)
        expect(screen.queryByText('All Products')).not.toBeInTheDocument()
    })

    it('renders deeply nested menu items correctly', async () => {
        const handleClose = vi.fn()
        render(
            <Sidebar
                menuItems={deeplyNestedMenu}
                isOpen={true}
                onClose={handleClose}
            />
        )

        fireEvent.click(screen.getByText('Level 1'))
        await waitFor(() => expect(screen.getByText('Level 2')).toBeInTheDocument())

        fireEvent.click(screen.getByText('Level 2'))
        await waitFor(() => expect(screen.getByText('Level 3')).toBeInTheDocument())
    })

    it('displays icon when provided', () => {
        const menuWithIcon: MenuItem[] = [
            { itemId: '1', labelText: 'Home', iconName: '🏠', linkPath: '/' }
        ]

        const handleClose = vi.fn()
        render(
            <Sidebar
                menuItems={menuWithIcon}
                isOpen={true}
                onClose={handleClose}
            />
        )

        expect(screen.getByText('🏠')).toBeInTheDocument()
    })
})
