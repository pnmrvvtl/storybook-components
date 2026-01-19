export interface MenuItem {
    itemId: string
    labelText: string
    iconName?: string
    linkPath?: string
    subMenuItems?: MenuItem[]
}

export interface SidebarProps {
    menuItems: MenuItem[]
    isOpen: boolean
    onClose: () => void
}
