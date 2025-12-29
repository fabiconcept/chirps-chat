"use client"
import React from "react";

interface Shortcut {
    id: string;
}

interface KeyBoardShortCutContext {
    allowedShortcuts: Set<string>;
    shortcuts: Record<string, Shortcut>;
    allowShortcuts: (shortcutIds: string[]) => void;
    disallowShortcuts: (shortcutIds: string[]) => void;
    notoriousShortcuts: Set<string>;
}

const SHORTCUTS: Record<string, Shortcut> = {
    search: { id: 'search' },
    commandK: { id: 'commandK' },
    commandN: { id: 'commandN' },
    altA: { id: 'alt+A' },
    commandF: { id: 'commandF' },
    commandW: { id: 'commandW' },
    command1: { id: 'command1' },
    command2: { id: 'command2' },
    command3: { id: 'command3' },
    command4: { id: 'command4' },
    command5: { id: 'command5' },
    altW: { id: 'alt+W' },
};

const KeyBoardShortCutContext = React.createContext<KeyBoardShortCutContext | undefined>(undefined);

export const KeyBoardShortCutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [allowedShortcuts, setAllowedShortcuts] = React.useState<Set<string>>(new Set([...Object.keys(SHORTCUTS), 'commandL']));

    const notoriousShortcuts = React.useMemo(() => new Set(['alt+A', 'commandN', 'commandW', 'search', 'command1', 'command2', 'command3', 'command4', 'command5', 'alt+W']), []);

    // useEffect(()=>{
    //     console.log(allowedShortcuts);
    // }, [allowedShortcuts]);

    const allowShortcuts = React.useCallback((shortcutIds: string[]) => {
        setAllowedShortcuts(prev => new Set([...prev, ...shortcutIds]));
    }, []);

    const disallowShortcuts = React.useCallback((shortcutIds: string[]) => {
        setAllowedShortcuts(prev => {
            const next = new Set(prev);
            shortcutIds.forEach(id => next.delete(id));
            return next;
        });
    }, []);

    return (
        <KeyBoardShortCutContext.Provider value={{ allowedShortcuts, shortcuts: SHORTCUTS, allowShortcuts, disallowShortcuts, notoriousShortcuts }}>
            {children}
        </KeyBoardShortCutContext.Provider>
    );
};

export const useKeyBoardShortCut = () => {
    const context = React.useContext(KeyBoardShortCutContext);
    if (!context) throw new Error('useKeyBoardShortCut must be used within KeyBoardShortCutProvider');
    return context;
};