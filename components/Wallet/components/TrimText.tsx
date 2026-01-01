export default function HiddenText({ text, maxLength }: { text: string, maxLength: number }) {
    if (text.length <= maxLength) {
        return <>{text}</>;
    }

    // Calculate characters to show on each side
    const charsToShow = Math.floor((maxLength - 3) / 2); // -3 for the '...'
    const start = text.slice(0, charsToShow);
    const end = text.slice(-charsToShow);

    return <>{start}...{end}</>;
}   