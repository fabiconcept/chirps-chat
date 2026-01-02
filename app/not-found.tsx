import NotFoundLottie from '@/components/404'
import './stylesheets/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
    return (
        <div className="flex overflow-hidden flex-row items-center justify-center w-full h-[calc(100dvh-16rem)]">
            <NotFoundLottie />
        </div>
    )
}