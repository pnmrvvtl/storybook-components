import { useEffect, useRef, useState } from 'react'

export const useClickOutside = (
    isOpen: boolean,
    onClose: () => void
) => {
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if (sidebarRef.current && !sidebarRef.current.contains(target)) {
                onClose()
            }
        }

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscapeKey)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isOpen, onClose])

    return sidebarRef
}

export const useExpandedItems = () => {
    const [expandedItemIds, setExpandedItemIds] = useState<Set<string>>(new Set())

    const toggleItemExpansion = (itemId: string) => {
        setExpandedItemIds(previousIds => {
            const newIds = new Set(previousIds)
            if (newIds.has(itemId)) {
                newIds.delete(itemId)
            } else {
                newIds.add(itemId)
            }
            return newIds
        })
    }

    const isItemExpanded = (itemId: string) => {
        return expandedItemIds.has(itemId)
    }

    return {
        expandedItemIds,
        toggleItemExpansion,
        isItemExpanded
    }
}
