import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import banners from "@/constants/banners";
import { useState } from "react";
import Banner from "./assets/banner";

export default function RoomProfileSettings({ title, description }: { title: string, description: string }) {
    const [name, setName] = useState("Five Nights");
    const [selectedBanner, setSelectedBanner] = useState<number | null>(null);

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
                    Banner
                </Label>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
                    {banners.map((banner) => (
                        <Banner key={banner.id} isSelected={selectedBanner === banner.id} bg={banner.bg} name={banner.name} onClick={() => setSelectedBanner(banner.id)} />
                    ))}
                </div>
            </div>

        </div>
    );
}