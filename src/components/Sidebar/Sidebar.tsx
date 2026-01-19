import { motion, AnimatePresence } from 'framer-motion'
import { useClickOutside, useExpandedItems } from './Sidebar.hooks'
import type { SidebarProps, MenuItem } from './Sidebar.types'
import {
    SidebarContainer,
    SidebarHeader,
    SidebarTitle,
    CloseButton,
    MenuList,
    MenuItemContainer,
    MenuItemButton,
    MenuItemIcon,
    MenuItemLabel,
    ExpandIcon
} from './Sidebar.styles'

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

const ChevronRightIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
    </svg>
)

interface MenuItemComponentProps {
    menuItem: MenuItem
    isExpanded: boolean
    onToggleExpansion: (itemId: string) => void
    isItemExpanded: (itemId: string) => boolean
}

const MenuItemComponent = ({
    menuItem,
    isExpanded,
    onToggleExpansion,
    isItemExpanded
}: MenuItemComponentProps) => {
    const hasSubItems = menuItem.subMenuItems && menuItem.subMenuItems.length > 0

    const handleClick = () => {
        if (hasSubItems) {
            onToggleExpansion(menuItem.itemId)
        } else if (menuItem.linkPath) {
            window.location.href = menuItem.linkPath
        }
    }

    return (
        <MenuItemContainer>
            <MenuItemButton
                onClick={handleClick}
                $hasSubItems={!!hasSubItems}
                $isExpanded={isExpanded}
            >
                {menuItem.iconName && (
                    <MenuItemIcon>{menuItem.iconName}</MenuItemIcon>
                )}
                <MenuItemLabel>{menuItem.labelText}</MenuItemLabel>
                {hasSubItems && (
                    <ExpandIcon $isExpanded={isExpanded}>
                        <ChevronRightIcon />
                    </ExpandIcon>
                )}
            </MenuItemButton>

            {hasSubItems && isExpanded && (
                <MenuList $isNested={true}>
                    {menuItem.subMenuItems?.map(subItem => (
                        <MenuItemComponent
                            key={subItem.itemId}
                            menuItem={subItem}
                            isExpanded={isItemExpanded(subItem.itemId)}
                            onToggleExpansion={onToggleExpansion}
                            isItemExpanded={isItemExpanded}
                        />
                    ))}
                </MenuList>
            )}
        </MenuItemContainer>
    )
}

export const Sidebar = ({ menuItems, isOpen, onClose }: SidebarProps) => {
    const sidebarRef = useClickOutside(isOpen, onClose)
    const { toggleItemExpansion, isItemExpanded } = useExpandedItems()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 998
                        }}
                        onClick={onClose}
                    />

                    <motion.div
                        key="sidebar"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 999,
                            width: '320px',
                            maxWidth: '90vw'
                        }}
                    >
                        <SidebarContainer ref={sidebarRef}>
                            <SidebarHeader>
                                <SidebarTitle>Menu</SidebarTitle>
                                <CloseButton onClick={onClose} aria-label="Close sidebar">
                                    <CloseIcon />
                                </CloseButton>
                            </SidebarHeader>

                            <MenuList>
                                {menuItems.map(menuItem => (
                                    <MenuItemComponent
                                        key={menuItem.itemId}
                                        menuItem={menuItem}
                                        isExpanded={isItemExpanded(menuItem.itemId)}
                                        onToggleExpansion={toggleItemExpansion}
                                        isItemExpanded={isItemExpanded}
                                    />
                                ))}
                            </MenuList>
                        </SidebarContainer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
