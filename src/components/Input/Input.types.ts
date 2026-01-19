export type InputType = 'text' | 'password' | 'number'

export interface InputProps {
    inputType: InputType
    value: string
    onValueChange: (newValue: string) => void
    placeholderText?: string
    isDisabled?: boolean
    isClearable?: boolean
    labelText?: string
    hasError?: boolean
    errorMessageText?: string
    inputName?: string
    inputId?: string
}
