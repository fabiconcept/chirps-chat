"use client"
import Lottie from 'lottie-react'
import Lottie404 from '@/components/lottie/404.json';
import { useEffect } from 'react';
import { removeSearchParam } from '@/lib/utils';

export default function NotFoundLottie() {
    useEffect(() => {
        removeSearchParam("fullscreen");    
    }, [])

    return (
        <Lottie
                animationData={Lottie404}
                autoPlay
                loop={true}
                className='dark:mix-blend-luminosity'
            />
    )
}
