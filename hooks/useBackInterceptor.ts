import { useEffect, useCallback, useRef, useState } from 'react';

interface BackInterceptorOptions {
    /**
     * Callback function to execute when back button is pressed
     * Return true to prevent default back navigation, false to allow it
     */
    onBack: () => boolean | void;
    /**
     * Whether the back handler is currently enabled
     */
    enabled?: boolean;
    /**
     * Priority level for handling back actions (higher = handled first)
     * Useful when multiple handlers are active
     */
    priority?: number;
}

interface DoubleBackExitOptions {
    /**
     * Whether the double back to exit feature is enabled
     */
    enabled?: boolean;
    /**
     * Message to show when first back is pressed
     * @default "Press back again to exit"
     */
    message?: string;
    /**
     * Timeout in milliseconds before resetting the exit state
     * @default 2000
     */
    timeout?: number;
    /**
     * Callback function to show the toast/notification
     * If not provided, uses default console.log
     */
    onShowToast?: (message: string) => void;
    /**
     * Callback function called when user confirms exit (presses back twice)
     */
    onExit?: () => void;
    /**
     * Priority level for the exit handler
     * @default -1 (lowest priority, so other handlers run first)
     */
    priority?: number;
}

type BackHandler = {
    id: number;
    onBack: () => boolean | void;
    priority: number;
};

// Global registry of back handlers
const backHandlers: BackHandler[] = [];
let handlerIdCounter = 0;
let isHistoryListenerSetup = false;

/**
 * Custom hook to intercept back button/gesture actions on mobile
 * Useful for closing modals, drawers, or overlays before navigating away
 * 
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose }) {
 *   useBackHandler({
 *     enabled: isOpen,
 *     onBack: () => {
 *       onClose();
 *       return true; // Prevent default back navigation
 *     }
 *   });
 *   
 *   return isOpen ? <div>Modal content</div> : null;
 * }
 * ```
 */
export function useBackInterceptor({ onBack, enabled = true, priority = 0 }: BackInterceptorOptions) {
    const handlerIdRef = useRef<number | null>(null);
    const onBackRef = useRef(onBack);

    // Keep the callback ref up to date
    useEffect(() => {
        onBackRef.current = onBack;
    }, [onBack]);

    const setupHistoryListener = useCallback(() => {
        if (isHistoryListenerSetup) return;

        isHistoryListenerSetup = true;

        // Push a dummy state to create a history entry
        window.history.pushState({ backHandlerSentinel: true }, '');

        const handlePopState = (event: PopStateEvent) => {
            // Sort handlers by priority (highest first)
            const sortedHandlers = [...backHandlers].sort((a, b) => b.priority - a.priority);

            // Execute handlers until one returns true (handled)
            let handled = false;
            for (const handler of sortedHandlers) {
                const result = handler.onBack();
                if (result === true) {
                    handled = true;
                    break;
                }
            }

            if (handled) {
                // Prevent navigation by pushing state again
                window.history.pushState({ backHandlerSentinel: true }, '');
            } else {
                // Allow navigation - clean up
                isHistoryListenerSetup = false;
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
            isHistoryListenerSetup = false;
        };
    }, []);

    useEffect(() => {
        if (!enabled) {
            // Remove handler if disabled
            if (handlerIdRef.current !== null) {
                const index = backHandlers.findIndex(h => h.id === handlerIdRef.current);
                if (index !== -1) {
                    backHandlers.splice(index, 1);
                }
                handlerIdRef.current = null;
            }

            // Clean up history state if no handlers remain
            if (backHandlers.length === 0 && isHistoryListenerSetup) {
                // Remove the sentinel state
                if (window.history.state?.backHandlerSentinel) {
                    window.history.back();
                }
            }

            return;
        }

        // Setup history listener on first handler
        if (backHandlers.length === 0) {
            setupHistoryListener();
        }

        // Add or update handler
        if (handlerIdRef.current === null) {
            handlerIdRef.current = handlerIdCounter++;
            backHandlers.push({
                id: handlerIdRef.current,
                onBack: () => onBackRef.current(),
                priority,
            });
        } else {
            // Update existing handler
            const handler = backHandlers.find(h => h.id === handlerIdRef.current);
            if (handler) {
                handler.onBack = () => onBackRef.current();
                handler.priority = priority;
            }
        }

        return () => {
            if (handlerIdRef.current !== null) {
                const index = backHandlers.findIndex(h => h.id === handlerIdRef.current);
                if (index !== -1) {
                    backHandlers.splice(index, 1);
                }
                handlerIdRef.current = null;
            }

            // Clean up history state if no handlers remain
            if (backHandlers.length === 0 && isHistoryListenerSetup) {
                if (window.history.state?.backHandlerSentinel) {
                    window.history.back();
                }
            }
        };
    }, [enabled, priority, setupHistoryListener]);
}

/**
 * Utility function to manually trigger back navigation
 * Useful for programmatic back actions
 */
export function triggerBack() {
    window.history.back();
}

/**
 * Check if any back handlers are currently active
 */
export function hasActiveBackHandlers(): boolean {
    return backHandlers.length > 0;
}

/**
 * Hook to implement "press back again to exit" functionality
 * Shows a message on first back press, exits on second press within timeout period
 * 
 * @example
 * ```tsx
 * function App() {
 *   useDoubleBackExit({
 *     enabled: true,
 *     message: "Press back again to exit app",
 *     onShowToast: (msg) => toast.info(msg),
 *     onExit: () => {
 *       // Clean up or navigate away
 *       window.location.href = '/';
 *     }
 *   });
 *   
 *   return <YourApp />;
 * }
 * ```
 */
export function useDoubleBackExit({
    enabled = true,
    message = 'Press back again to exit',
    timeout = 2000,
    onShowToast,
    onExit,
    priority = -1,
}: DoubleBackExitOptions = {}) {
    const [exitPressed, setExitPressed] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useBackInterceptor({
        enabled,
        priority,
        onBack: () => {
            if (exitPressed) {
                // Second press - allow exit
                setExitPressed(false);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                // Call exit callback if provided
                if (onExit) {
                    onExit();
                }

                // Return false to allow navigation
                return false;
            } else {
                // First press - show message and set state
                setExitPressed(true);

                // Show toast message
                if (onShowToast) {
                    onShowToast(message);
                } else {
                    console.log(message);
                }

                // Reset after timeout
                timeoutRef.current = setTimeout(() => {
                    setExitPressed(false);
                }, timeout);

                // Prevent navigation
                return true;
            }
        },
    });

    return exitPressed;
}

/**
 * Hook that combines modal/overlay closing with double back to exit
 * First back closes the overlay, then double back to exit kicks in
 * 
 * @example
 * ```tsx
 * function App() {
 *   const [showModal, setShowModal] = useState(false);
 *   
 *   useBackHandlerWithDoubleExit({
 *     hasOverlay: showModal,
 *     onCloseOverlay: () => setShowModal(false),
 *     exitMessage: "Press back again to exit",
 *     onShowToast: (msg) => toast.info(msg),
 *   });
 *   
 *   return (
 *     <>
 *       <button onClick={() => setShowModal(true)}>Open</button>
 *       {showModal && <Modal />}
 *     </>
 *   );
 * }
 * ```
 */
export function useBackHandlerWithDoubleExit({
    hasOverlay,
    onCloseOverlay,
    exitMessage = 'Press back again to exit',
    exitTimeout = 2000,
    onShowToast,
    onExit,
    overlayPriority = 10,
}: {
    hasOverlay: boolean;
    onCloseOverlay: () => void;
    exitMessage?: string;
    exitTimeout?: number;
    onShowToast?: (message: string) => void;
    onExit?: () => void;
    overlayPriority?: number;
}) {
    // Handle overlay closing (higher priority)
    useBackInterceptor({
        enabled: hasOverlay,
        priority: overlayPriority,
        onBack: () => {
            onCloseOverlay();
            return true;
        },
    });

    // Handle double back to exit (lower priority, only when no overlay)
    const exitPressed = useDoubleBackExit({
        enabled: !hasOverlay,
        message: exitMessage,
        timeout: exitTimeout,
        onShowToast,
        onExit,
        priority: -1,
    });

    return exitPressed;
}