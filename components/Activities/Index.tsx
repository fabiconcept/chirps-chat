"use client";
import { useState } from 'react'
import { Collapsible, CollapsibleHeader, CollapsibleContent } from '../ui/custom-collapsable';
import { Badge } from '../ui/badge';

export default function Activities() {
    const [open, setOpen] = useState(false);
    return (
        <Collapsible
            defaultOpen={open}
            onOpenChange={setOpen}
            expandedHeight="70vh"
            collapsedHeight="4.25rem"
            className='right-10 gap-3'
        >
            <CollapsibleHeader
                title="My Activities"
                subtitle='Recent notifications'
                className='rounded-t-2xl border-t border-l border-r bg-background/95 backdrop-blur-sm hover:border-foreground/50 active:translate-y-3 transition-all py-3'
                actions={
                    <Badge variant="destructive">
                        20
                    </Badge>
                }
            />

            <CollapsibleContent className="px-6 pb-6 border-r border-l bg-background/95 backdrop-blur-sm mt-2">
                <></>
            </CollapsibleContent>
        </Collapsible>
    )
}
