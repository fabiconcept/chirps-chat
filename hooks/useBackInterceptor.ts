import { useEffect, useCallback, useRef } from 'react';

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

type BackInterceptor = {
    id: number;
    onBack: () => boolean | void;
    priority: number;
};

// Global registry of back handlers
const backHandlers: BackInterceptor[] = [];
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