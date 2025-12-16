import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function RoomProfileSettings({ title, description }: { title: string, description: string }) {
    const [name, setName] = useState("Five Nights");
    
    return (
        <div className="space-y-10">
            <div className="">
                <h3 className="md:text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>

            <div className="grid w-full items-center gap-y-3">
                <Label htmlFor="name" className="font-medium">
                    Name
                </Label>
                <Input 
                    id="name" 
                    type="text" 
                    placeholder="Room Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <Separator />

            <div className="grid w-full items-center gap-y-3">
                <Label htmlFor="name" className="font-medium">
                    Icon
                </Label>
                <div className="flex items-center gap-2">
                    <Button className="py-2 rounded-md">Upload</Button>
                    <Button className="py-2 rounded-md">Remove</Button>
                </div>
            </div>
            
        </div>
    );
}