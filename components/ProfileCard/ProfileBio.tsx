import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface ProfileBioProps {
    bio: string;
    size: "sm" | "md" | "lg";
    bioTextClass: string;
    sectionPadding: string;
    padding: string;
}

export default function ProfileBio({
    bio,
    size,
    bioTextClass,
    sectionPadding,
    padding
}: ProfileBioProps) {
    return (
        <div className={cn(sectionPadding, padding)}>
            <p className={cn(bioTextClass)}>
                {size !== "sm" && <Quote className="inline scale-x-[-1] -mt-2 mr-1" size={16} />}
                {bio}
                {size !== "sm" && <Quote className="inline -mt-2 ml-1" size={16} />}
            </p>
        </div>
    );
}
