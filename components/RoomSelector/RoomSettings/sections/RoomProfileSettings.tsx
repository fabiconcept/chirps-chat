"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import banners from "@/constants/banners";
import { useState } from "react";
import Banner from "./assets/banner";
import { Hash, Globe, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import AvatarSelector from "./assets/AvatarSelector";
import ProtectedImage from "@/components/Feed/TextPost/ProtectedImage";

// Preview Component
function RoomPreview({ name, bannerBg, description, isPublic, avatarUrl }: { name: string; bannerBg: string; description: string; isPublic: boolean; avatarUrl: string }) {
    return (
        <div className="w-full max-w-80 mx-auto p-2 rounded-4xl border border-input bg-background/80 backdrop-blur-md">
            {/* Banner */}
            <div className="h-24 relative overflow-hidden rounded-lg rounded-t-3xl" style={{ backgroundColor: bannerBg }}>
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
            </div>

            {/* Room Icon */}
            <div className="-mt-10 px-4 relative z-10">
                <div className="h-16 w-16 rounded-2xl border-4 border-background shadow-lg overflow-hidden">
                    <ProtectedImage 
                        src={avatarUrl} 
                        alt={name}
                        fill
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Room Info */}
            <div className="p-4 space-y-2">
                <div>
                    <h3 className="text-lg font-semibold text-foreground truncate">
                        {name || "Room Name"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {isPublic ? "Public Room" : "Private Room"}
                    </p>
                </div>

                {description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                        {description}
                    </p>
                )}

                <div className="pt-2">
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-foreground">24</span>
                            <span className="text-muted-foreground">Members</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-foreground">12</span>
                            <span className="text-muted-foreground">Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RoomProfileSettings({ title, description }: { title: string, description: string }) {
    const [name, setName] = useState("Five Nights");
    const [selectedBanner, setSelectedBanner] = useState<number | null>(1);
    const [roomDescription, setRoomDescription] = useState("A cozy place to hang out and chat about anything!");
    const [isPublic, setIsPublic] = useState(true);
    const [searchVisible, setSearchVisible] = useState(true);
    const [roomAvatarUrl, setRoomAvatarUrl] = useState("https://chirps-chat.sirv.com/premium/rasta.png");

    // Get the selected banner background color
    const selectedBannerBg = banners.find(b => b.id === selectedBanner)?.bg || banners[0].bg;

    return (
        <div className="flex gap-6 pb-8">
            <div className="space-y-10 flex-1">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h3 className="md:text-lg font-semibold flex items-center gap-2">
                        <Hash className="h-5 w-5 text-primary" />
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
                </motion.div>
                <Separator />
                
                {/* Room Name */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid w-full items-center gap-y-3 p-4 rounded-xl border border-input bg-linear-to-br from-primary/5 to-transparent"
                >
                    <Label htmlFor="name" className="font-medium text-base">
                        Room Name
                </Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Room Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                        maxLength={50}
                        className="bg-background/50"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                        {name.length}/50
                    </p>
                </motion.div>
                
                <Separator />

                {/* Room Avatar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="grid w-full items-center gap-y-3 p-4 rounded-xl border border-input bg-linear-to-br from-indigo-500/5 to-transparent"
                >
                    <Label htmlFor="room-avatar" className="font-medium text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-indigo-500" />
                        Room Avatar
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Choose a distinctive avatar for your room
                    </p>
                    <div className="flex items-center gap-4">
                        <AvatarSelector
                            selectedAvatarUrl={roomAvatarUrl}
                            onAvatarSelect={setRoomAvatarUrl}
                            displayName={name}
                            type="room"
                        />
                        <div className="flex-1 space-y-2">
                            <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                                <p className="text-xs font-medium text-indigo-500 mb-1">🎨 Room Identity</p>
                                <p className="text-xs text-muted-foreground">
                                    This avatar represents your room in lists and previews
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50 border border-input">
                                <p className="text-xs font-medium mb-1">💫 Stand Out</p>
                                <p className="text-xs text-muted-foreground">
                                    Choose from legendary, epic, rare, or common avatars
                                </p>
                            </div>
                        </div>
            </div>
                </motion.div>

            <Separator />

                {/* Banner Selection */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid w-full items-center gap-y-3 p-4 rounded-xl border border-input bg-linear-to-br from-purple-500/5 to-transparent"
                >
                    <Label htmlFor="banner" className="font-medium text-base">
                        Banner Color
                </Label>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
                        {banners.map((banner, index) => (
                            <motion.div
                                key={banner.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                            >
                                <Banner
                                    isSelected={selectedBanner === banner.id}
                                    bg={banner.bg}
                                    name={banner.name}
                                    onClick={() => setSelectedBanner(banner.id)}
                                />
                            </motion.div>
                    ))}
                </div>
                </motion.div>

                <Separator />

                {/* Room Description */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid w-full items-center gap-y-3 p-4 rounded-xl border border-input bg-linear-to-br from-blue-500/5 to-transparent"
                >
                    <Label htmlFor="room-description" className="font-medium text-base">
                        Description
                    </Label>
                    <Textarea
                        id="room-description"
                        placeholder="Describe your room..."
                        value={roomDescription}
                        onChange={(e) => setRoomDescription(e.target.value)}
                        className="min-h-20 bg-background/50"
                        maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                        {roomDescription.length}/200
                    </p>
                </motion.div>

                <Separator />

                {/* Public Toggle */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-input bg-linear-to-br from-green-500/5 to-transparent hover:border-green-500/30 transition-all duration-300"
                >
                    <div className="space-y-0.5">
                        <Label htmlFor="public-toggle" className="font-medium text-base flex items-center gap-2">
                            <Globe className="h-4 w-4 text-green-500" />
                            Public Room
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Allow anyone to discover and join this room
                        </p>
                    </div>
                    <Switch
                        id="public-toggle"
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                    />
                </motion.div>

                <Separator />

                {/* Search Visibility */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className={`flex items-center justify-between p-4 rounded-xl border border-input bg-linear-to-br from-indigo-500/5 to-transparent hover:border-indigo-500/30 transition-all duration-300 ${!isPublic ? "opacity-50" : ""}`}
                >
                    <div className="space-y-0.5">
                        <Label htmlFor="search-toggle" className="font-medium text-base flex items-center gap-2">
                            <Search className="h-4 w-4 text-indigo-500" />
                            Show in Search Results
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Make this room discoverable in search
                        </p>
                    </div>
                    <Switch
                        id="search-toggle"
                        checked={searchVisible}
                        onCheckedChange={setSearchVisible}
                        disabled={!isPublic}
                    />
                </motion.div>

                <Separator />

                {/* Save Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-end sticky bottom-0 bg-linear-to-t from-background via-background to-transparent pt-6 pb-2"
                >
                    <Button className="shadow-lg hover:shadow-xl transition-shadow">
                        <Hash className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </motion.div>
            </div>

            {/* Preview Panel */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 min-w-72 sticky top-0 h-fit"
            >
                <div className="mb-2">
                    <Label className="text-sm font-semibold">Live Preview</Label>
                    <p className="text-xs text-muted-foreground">Updates as you type</p>
                </div>
                <RoomPreview 
                    name={name} 
                    bannerBg={selectedBannerBg} 
                    description={roomDescription}
                    isPublic={isPublic}
                    avatarUrl={roomAvatarUrl}
                />
            </motion.div>
        </div>
    );
}