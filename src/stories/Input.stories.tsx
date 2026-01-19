import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../components/Input'
import { ToastProvider, useToast } from '../components/Toast'

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Input>

export const TextInput: Story = {
    args: {
        inputType: 'text',
        value: '',
        onValueChange: () => { },
        placeholderText: 'Enter text',
        labelText: 'Text Input'
    }
}

export const TextInputWithClear: Story = {
    args: {
        inputType: 'text',
        value: 'Some text',
        onValueChange: () => { },
        placeholderText: 'Enter text',
        labelText: 'Clearable Input',
        isClearable: true
    }
}

export const PasswordInput: Story = {
    args: {
        inputType: 'password',
        value: 'password123',
        onValueChange: () => { },
        placeholderText: 'Enter password',
        labelText: 'Password'
    }
}

export const NumberInput: Story = {
    args: {
        inputType: 'number',
        value: '42',
        onValueChange: () => { },
        placeholderText: 'Enter number',
        labelText: 'Number Input'
    }
}

export const DisabledInput: Story = {
    args: {
        inputType: 'text',
        value: 'Disabled text',
        onValueChange: () => { },
        placeholderText: 'Enter text',
        labelText: 'Disabled Input',
        isDisabled: true
    }
}

export const ErrorState: Story = {
    args: {
        inputType: 'text',
        value: 'invalid@',
        onValueChange: () => { },
        placeholderText: 'Enter email',
        labelText: 'Email',
        hasError: true,
        errorMessageText: 'Please enter a valid email address'
    }
}

export const WithoutLabel: Story = {
    args: {
        inputType: 'text',
        value: '',
        onValueChange: () => { },
        placeholderText: 'No label input'
    }
}

interface FormData {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export const ReactHookFormIntegration: Story = {
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
            </ToastProvider>
        )
    ],
    render: () => {
        const { displayToast } = useToast()
        const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<FormData>({
            mode: 'onChange',
            defaultValues: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        })

        const password = watch('password')

        const onSubmit = (data: FormData) => {
            displayToast(`Form submitted successfully! Welcome, ${data.username}!`, 'success', 4000)
            console.log('Form data:', data)
        }

        React.useEffect(() => {
            register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' }
            })
            register('email', {
                required: 'Email is required',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                }
            })
            register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
            })
            register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match'
            })
        }, [register, password])

        return (
            <div style={{ maxWidth: '500px', padding: '20px' }}>
                <h2 style={{ marginBottom: '24px', color: '#111827' }}>React Hook Form Example</h2>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <Input
                            inputType="text"
                            value={watch('username')}
                            onValueChange={(value) => setValue('username', value, { shouldValidate: true })}
                            labelText="Username"
                            placeholderText="Enter username"
                            hasError={!!errors.username}
                            errorMessageText={errors.username?.message}
                            isClearable
                        />
                    </div>

                    <div>
                        <Input
                            inputType="text"
                            value={watch('email')}
                            onValueChange={(value) => setValue('email', value, { shouldValidate: true })}
                            labelText="Email"
                            placeholderText="your.email@example.com"
                            hasError={!!errors.email}
                            errorMessageText={errors.email?.message}
                            isClearable
                        />
                    </div>

                    <div>
                        <Input
                            inputType="password"
                            value={watch('password')}
                            onValueChange={(value) => setValue('password', value, { shouldValidate: true })}
                            labelText="Password"
                            placeholderText="Enter password"
                            hasError={!!errors.password}
                            errorMessageText={errors.password?.message}
                        />
                    </div>

                    <div>
                        <Input
                            inputType="password"
                            value={watch('confirmPassword')}
                            onValueChange={(value) => setValue('confirmPassword', value, { shouldValidate: true })}
                            labelText="Confirm Password"
                            placeholderText="Confirm password"
                            hasError={!!errors.confirmPassword}
                            errorMessageText={errors.confirmPassword?.message}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            background: isValid ? '#10b981' : '#9ca3af',
                            color: 'white',
                            cursor: isValid ? 'pointer' : 'not-allowed',
                            fontWeight: 600,
                            fontSize: '16px',
                            marginTop: '8px',
                            opacity: isValid ? 1 : 0.6
                        }}
                    >
                        Submit Form
                    </button>
                </form>

                <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#6b7280'
                }}>
                    <strong>Validation Rules:</strong>
                    <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                        <li>Username: Required, min 3 characters</li>
                        <li>Email: Required, valid email format</li>
                        <li>Password: Required, min 8 characters</li>
                        <li>Confirm Password: Must match password</li>
                    </ul>
                </div>
            </div>
        )
    }
}
