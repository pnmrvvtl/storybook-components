import { useState } from 'react'

export const useInputVisibility = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(previousState => !previousState)
    }

    return {
        isPasswordVisible,
        togglePasswordVisibility
    }
}

export const useInputClearHandler = (
    currentValue: string,
    onValueChange: (newValue: string) => void
) => {
    const canClear = currentValue.length > 0

    const handleClearInput = () => {
        onValueChange('')
    }

    return {
        canClear,
        handleClearInput
    }
}
