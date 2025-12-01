"use client"
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ActivitiesHeader() {
    const router = useRouter();
    const count = 20;

    return (
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-input/50">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="h-9 w-9"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold">My Activities</h1>
                        <p className="text-xs text-muted-foreground">Recent notifications</p>
                    </div>
                </div>
                <Badge variant="destructive" className="h-6">
                    {count}
                </Badge>
            </div>
        </div>
    );
}
