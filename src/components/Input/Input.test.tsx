import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

describe('Input Component', () => {
    it('renders text input correctly', () => {
        const handleChange = vi.fn()
        render(
            <Input
                inputType="text"
                value=""
                onValueChange={handleChange}
                placeholderText="Enter text"
                labelText="Test Label"
            />
        )

        expect(screen.getByText('Test Label')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('calls onValueChange when input value changes', () => {
        const handleChange = vi.fn()
        render(
            <Input
                inputType="text"
                value=""
                onValueChange={handleChange}
                placeholderText="Enter text"
            />
        )

        const inputElement = screen.getByPlaceholderText('Enter text')
        fireEvent.change(inputElement, { target: { value: 'new value' } })

        expect(handleChange).toHaveBeenCalledWith('new value')
    })

    it('toggles password visibility when eye icon is clicked', () => {
        const handleChange = vi.fn()
        render(
            <Input
                inputType="password"
                value="secret"
                onValueChange={handleChange}
            />
        )

        const inputElement = screen.getByDisplayValue('secret') as HTMLInputElement
        expect(inputElement.type).toBe('password')

        const toggleButton = screen.getByLabelText('Show password')
        fireEvent.click(toggleButton)

        expect(inputElement.type).toBe('text')
        expect(screen.getByLabelText('Hide password')).toBeInTheDocument()
    })

    it('clears input when clear button is clicked', () => {
        const handleChange = vi.fn()
        render(
            <Input
                inputType="text"
                value="some text"
                onValueChange={handleChange}
                isClearable={true}
            />
        )

        const clearButton = screen.getByLabelText('Clear input')
        fireEvent.click(clearButton)

        expect(handleChange).toHaveBeenCalledWith('')
    })

    it('does not show clear button when input is empty', () => {
        const handleChange = vi.fn()
        render(
            <Input
                inputType="text"
                value=""
                onValueChange={handleChange}
                isClearable={true}
            />
        )

        expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument()
    })

    it('displays error message when hasError is true', () => {
        const handleChange = vi.fn()
        render(
            <Input
                inputType="text"
                value="invalid"
                onValueChange={handleChange}
                hasError={true}
                errorMessageText="This field is required"
            />
        )

        expect(screen.getByRole('alert')).toHaveTextContent('This field is required')
    })

    it('disables input when isDisabled is true', () => {
        const handleChange = vi.fn()
        render(
            <Input
                inputType="text"
                value="disabled"
                onValueChange={handleChange}
                isDisabled={true}
            />
        )

        const inputElement = screen.getByDisplayValue('disabled')
        expect(inputElement).toBeDisabled()
    })

    it('does not show clear button when disabled', () => {
        const handleChange = vi.fn()
        render(
            <Input
                inputType="text"
                value="text"
                onValueChange={handleChange}
                isClearable={true}
                isDisabled={true}
            />
        )

        expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument()
    })
})
