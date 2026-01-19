import styled from 'styled-components'

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  max-width: 90vw;
  background: white;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
  overflow-y: auto;
  padding: 24px 0;
`

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
`

export const SidebarTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const MenuList = styled.ul<{ $isNested?: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;
  ${props => props.$isNested && `
    padding-left: 16px;
    margin-top: 4px;
  `}
`

export const MenuItemContainer = styled.li`
  margin: 0;
`

export const MenuItemButton = styled.button<{ $hasSubItems: boolean; $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 15px;
  color: #374151;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }

  &:active {
    background: #e5e7eb;
  }
`

export const MenuItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  margin-right: 12px;
  font-size: 18px;
`

export const MenuItemLabel = styled.span`
  flex: 1;
  font-weight: 500;
`

export const ExpandIcon = styled.span<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
  transform: rotate(${props => props.$isExpanded ? '90deg' : '0deg'});

  svg {
    width: 16px;
    height: 16px;
  }
`
