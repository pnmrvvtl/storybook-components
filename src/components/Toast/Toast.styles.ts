import styled from 'styled-components'
import type { ToastVariant } from './Toast.types'

const variantColors: Record<ToastVariant, { background: string; border: string; icon: string }> = {
    success: {
        background: '#ecfdf5',
        border: '#10b981',
        icon: '#059669'
    },
    error: {
        background: '#fef2f2',
        border: '#ef4444',
        icon: '#dc2626'
    },
    info: {
        background: '#eff6ff',
        border: '#3b82f6',
        icon: '#2563eb'
    }
}

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`

export const ToastItem = styled.div<{ $variantType: ToastVariant }>`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 320px;
  max-width: 420px;
  padding: 16px;
  background: ${props => variantColors[props.$variantType].background};
  border: 2px solid ${props => variantColors[props.$variantType].border};
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`

export const ToastIcon = styled.div<{ $variantType: ToastVariant }>`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: ${props => variantColors[props.$variantType].icon};

  svg {
    width: 100%;
    height: 100%;
  }
`

export const ToastMessage = styled.div`
  flex: 1;
  font-size: 15px;
  line-height: 1.5;
  color: #111827;
  font-weight: 500;
`

export const CloseButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;

  &:hover {
    color: #111827;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`
