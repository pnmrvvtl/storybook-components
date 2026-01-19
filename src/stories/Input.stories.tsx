import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Input } from '../components/Input'

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        inputType: {
            control: 'select',
            options: ['text', 'password', 'number']
        },
        value: { control: 'text' },
        placeholderText: { control: 'text' },
        labelText: { control: 'text' },
        isDisabled: { control: 'boolean' },
        isClearable: { control: 'boolean' },
        hasError: { control: 'boolean' },
        errorMessageText: { control: 'text' }
    }
}

export default meta
type Story = StoryObj<typeof Input>

const InputWithState = (args: Parameters<typeof Input>[0]) => {
    const [inputValue, setInputValue] = useState(args.value || '')
    return <Input {...args} value={inputValue} onValueChange={setInputValue} />
}

export const TextInput: Story = {
    render: InputWithState,
    args: {
        inputType: 'text',
        value: '',
        placeholderText: 'Enter text...',
        labelText: 'Text Input'
    }
}

export const TextInputWithClear: Story = {
    render: InputWithState,
    args: {
        inputType: 'text',
        value: 'Sample text',
        placeholderText: 'Enter text...',
        labelText: 'Clearable Text Input',
        isClearable: true
    }
}

export const PasswordInput: Story = {
    render: InputWithState,
    args: {
        inputType: 'password',
        value: 'secret123',
        placeholderText: 'Enter password...',
        labelText: 'Password Input'
    }
}

export const NumberInput: Story = {
    render: InputWithState,
    args: {
        inputType: 'number',
        value: '42',
        placeholderText: 'Enter number...',
        labelText: 'Number Input',
        isClearable: true
    }
}

export const DisabledInput: Story = {
    render: InputWithState,
    args: {
        inputType: 'text',
        value: 'Cannot edit this',
        placeholderText: 'Disabled input',
        labelText: 'Disabled State',
        isDisabled: true
    }
}

export const ErrorState: Story = {
    render: InputWithState,
    args: {
        inputType: 'text',
        value: 'invalid@',
        placeholderText: 'Enter email...',
        labelText: 'Email Address',
        hasError: true,
        errorMessageText: 'Please enter a valid email address'
    }
}

export const WithoutLabel: Story = {
    render: InputWithState,
    args: {
        inputType: 'text',
        value: '',
        placeholderText: 'No label input...',
        isClearable: true
    }
}
