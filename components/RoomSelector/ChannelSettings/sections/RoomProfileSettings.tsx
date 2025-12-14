export default function RoomProfileSettings({ title, description }: { title: string, description: string }) {
    return (
        <div className="space-y-6">
            <div className="">
                <h3 className="md:text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}