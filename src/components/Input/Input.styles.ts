import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: 400px;
`

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`

export const InputWrapper = styled.div<{ $hasError: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid ${props => props.$hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 8px;
  background: white;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${props => props.$hasError ? '#ef4444' : '#3b82f6'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  }

  &:hover:not(:focus-within) {
    border-color: ${props => props.$hasError ? '#ef4444' : '#9ca3af'};
  }
`

export const StyledInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #111827;
  background: transparent;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-right: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;

  &:hover {
    color: #111827;
  }

  &:disabled {
    color: #d1d5db;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const ErrorMessage = styled.span`
  font-size: 13px;
  color: #ef4444;
  margin-top: 2px;
`
