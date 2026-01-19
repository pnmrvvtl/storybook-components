import React from 'react'
import { useInputVisibility, useInputClearHandler } from './Input.hooks'
import type { InputProps } from './Input.types'
import {
    InputContainer,
    InputLabel,
    InputWrapper,
    StyledInput,
    IconButton,
    ErrorMessage
} from './Input.styles'

const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const EyeOffIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
)

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

export const Input = ({
    inputType,
    value,
    onValueChange,
    placeholderText,
    isDisabled = false,
    isClearable = false,
    labelText,
    hasError = false,
    errorMessageText,
    inputName,
    inputId
}: InputProps) => {
    const { isPasswordVisible, togglePasswordVisibility } = useInputVisibility()
    const { canClear, handleClearInput } = useInputClearHandler(value, onValueChange)

    const isPasswordType = inputType === 'password'
    const actualInputType = isPasswordType && isPasswordVisible ? 'text' : inputType

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(event.target.value)
    }

    return (
        <InputContainer>
            {labelText && <InputLabel htmlFor={inputId}>{labelText}</InputLabel>}

            <InputWrapper $hasError={hasError}>
                <StyledInput
                    id={inputId}
                    name={inputName}
                    type={actualInputType}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholderText}
                    disabled={isDisabled}
                />

                {isClearable && canClear && !isDisabled && (
                    <IconButton
                        type="button"
                        onClick={handleClearInput}
                        aria-label="Clear input"
                    >
                        <CloseIcon />
                    </IconButton>
                )}

                {isPasswordType && (
                    <IconButton
                        type="button"
                        onClick={togglePasswordVisibility}
                        disabled={isDisabled}
                        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                    >
                        {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </IconButton>
                )}
            </InputWrapper>

            {hasError && errorMessageText && (
                <ErrorMessage role="alert">{errorMessageText}</ErrorMessage>
            )}
        </InputContainer>
    )
}
