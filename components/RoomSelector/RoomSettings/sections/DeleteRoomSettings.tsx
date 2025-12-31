"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const ROOM_NAME = "Five Nights"; // This should come from props or context

export default function DeleteRoomSettings({ title, description }: { title: string, description: string }) {
    const [confirmationText, setConfirmationText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [shake, setShake] = useState(false);

    const isConfirmationValid = confirmationText === ROOM_NAME;

    const handleDelete = () => {
        if (!isConfirmationValid) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        setIsDeleting(true);
        // Simulate deletion process
        setTimeout(() => {
            alert("Room deleted successfully");
            setIsDeleting(false);
        }, 1500);
    };

    return (
        <div className="space-y-6 pb-8">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="md:text-lg font-bold text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 animate-pulse" />
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            </motion.div>

            <Separator className="bg-destructive/30" />

            {/* Warning Box */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative p-6 rounded-xl border-2 border-destructive/50 bg-linear-to-br from-destructive/20 via-destructive/10 to-transparent space-y-3 shadow-lg shadow-destructive/10"
            >
                <div className="absolute inset-0 bg-linear-to-br from-destructive/5 to-transparent rounded-xl animate-pulse" />
                <div className="relative flex items-start gap-4">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <AlertTriangle className="h-8 w-8 text-destructive shrink-0" />
                    </motion.div>
                    <div className="space-y-3">
                        <h4 className="text-lg font-bold text-destructive">⚠️ Warning: This action is irreversible</h4>
                        <ul className="text-sm text-foreground space-y-2">
                            {[
                                "All messages will be permanently deleted",
                                "All members will lose access immediately",
                                "All room settings and data will be lost",
                                "This action cannot be undone"
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10 border border-destructive/20"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Confirmation Input */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4 pt-4 p-6 rounded-xl border-2 border-destructive/30 bg-linear-to-br from-destructive/5 to-transparent"
            >
                <div className="space-y-3">
                    <Label htmlFor="confirm-delete" className="font-semibold text-base flex flex-col gap-2">
                        <span>Type the room name to confirm deletion:</span>
                        <code className="px-4 py-2 bg-destructive/20 text-destructive rounded-lg font-mono text-base border-2 border-destructive/40 inline-block">
                            {ROOM_NAME}
                        </code>
                    </Label>
                    <motion.div
                        animate={shake ? {
                            x: [-10, 10, -10, 10, 0],
                        } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <Input
                            id="confirm-delete"
                            type="text"
                            placeholder="Enter room name"
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                            className={`text-base font-semibold h-12 ${
                                confirmationText && !isConfirmationValid
                                    ? "border-2 border-destructive focus-visible:border-destructive bg-destructive/5"
                                    : "border-2"
                            } ${isConfirmationValid ? "border-green-500 bg-green-500/5" : ""}`}
                        />
                    </motion.div>
                    {confirmationText && !isConfirmationValid && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-destructive font-medium p-2 rounded-lg bg-destructive/10 border border-destructive/20"
                        >
                            ❌ Room name doesn&apos;t match. Please type exactly: <strong>{ROOM_NAME}</strong>
                        </motion.p>
                    )}
                    {isConfirmationValid && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-green-600 font-medium p-2 rounded-lg bg-green-500/10 border border-green-500/20"
                        >
                            ✅ Confirmation matched. You may proceed.
                        </motion.p>
                    )}
                </div>

                <Button
                    variant="destructive"
                    className="w-full h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
                    disabled={!isConfirmationValid || isDeleting}
                    onClick={handleDelete}
                >
                    {isDeleting ? (
                        <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="flex items-center gap-2"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Deleting Room...
                        </motion.span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Delete Room Permanently
                        </span>
                    )}
                </Button>
            </motion.div>

            <Separator className="bg-destructive/30" />

            {/* Additional Warning */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-center space-y-2 p-4 rounded-lg bg-muted/50"
            >
                <p className="font-semibold text-foreground">⚠️ Once you delete a room, there is no going back.</p>
                <p className="text-muted-foreground">Please be absolutely certain before proceeding.</p>
            </motion.div>
        </div>
    );
}