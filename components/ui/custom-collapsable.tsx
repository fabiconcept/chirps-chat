'use client';

import React, { createContext, useContext, useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronsDownIcon } from '../ChevronsDownIcon';

interface CollapsibleContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggle: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(undefined);

const useCollapsible = () => {
    const context = useContext(CollapsibleContext);
    if (!context) {
        throw new Error('Collapsible components must be used within a Collapsible');
    }
    return context;
};

interface CollapsibleProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    expandedHeight?: string;
    collapsedHeight?: string;
    maxWidth?: string;
    position?: 'fixed' | 'absolute' | 'relative';
    className?: string;
    containerClassName?: string;
}

export function Collapsible({
    children,
    defaultOpen = false,
    onOpenChange,
    expandedHeight = '600px',
    collapsedHeight = '4rem',
    className = '',
    containerClassName = '',
}: CollapsibleProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleSetOpen = (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
    };

    const toggle = () => handleSetOpen(!isOpen);

    return (
        <CollapsibleContext.Provider value={{ isOpen, setIsOpen: handleSetOpen, toggle }}>
            <motion.div
                className={cn(
                    'overflow-hidden z-50 w-sm',
                    'fixed bottom-0',
                    className
                )}
                animate={{ height: isOpen ? expandedHeight : collapsedHeight }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                }}
            >
                <div className={cn('h-full flex flex-col', containerClassName)}>
                    {children}
                </div>
            </motion.div>
        </CollapsibleContext.Provider>
    );
}

interface CollapsibleTriggerProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}

export const CollapsibleTrigger = forwardRef<HTMLDivElement, CollapsibleTriggerProps>(
    ({ children, className, onClick }, ref) => {
        const { toggle } = useCollapsible();

        const handleClick = (e: React.MouseEvent) => {
            onClick?.(e);
            if (!e.defaultPrevented) {
                toggle();
            }
        };

        return (
            <motion.div
                ref={ref}
                className={cn(
                    'flex items-center justify-between px-6 cursor-pointer shrink-0',
                    'transition-colors',
                    className
                )}
                onClick={handleClick}
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.div>
        );
    }
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

interface CollapsibleContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
    ({ children, className }, ref) => {
        const { isOpen } = useCollapsible();

        return (
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className={cn('overflow-y-auto flex-1 min-h-0', className)}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }
);

CollapsibleContent.displayName = 'CollapsibleContent';

interface CollapsibleIconProps {
    className?: string;
    openIcon?: React.ReactNode;
    closedIcon?: React.ReactNode;
    rotateClosedIcon?: boolean;
}

export function CollapsibleIcon({
    className = '',
    openIcon,
    closedIcon,
    rotateClosedIcon = true,
}: CollapsibleIconProps) {
    const { isOpen } = useCollapsible();

    const defaultIcon = (
        <motion.div
            animate={{ rotate: isOpen && rotateClosedIcon ? 0 : 180 }}
            transition={{ duration: 0.3 }}
        >
            <ChevronsDownIcon className='h-5.5 w-5.5 translate-y-[20%]' />
        </motion.div>
    );

    return (
        <div
            className={cn(
                'p-2 rounded-md inline-flex items-center justify-center',
                className
            )}
        >
            {isOpen ? openIcon || defaultIcon : closedIcon || defaultIcon}
        </div>
    );
}

interface CollapsibleHeaderProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
}

export function CollapsibleHeader({
    title,
    subtitle,
    icon,
    actions,
    className = '',
}: CollapsibleHeaderProps) {
    return (
        <CollapsibleTrigger className={className}>
            <div className="flex items-center gap-2">
                {icon && <div className="text-muted-foreground">{icon}</div>}
                <div>
                    <h2 className="text-base font-medium text-foreground">{title}</h2>
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                </div>
            </div>
            <div className="flex items-center gap-2">
                {actions}
                <CollapsibleIcon />
            </div>
        </CollapsibleTrigger>
    );
}