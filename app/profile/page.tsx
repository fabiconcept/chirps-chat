import NotFoundLottie from '@/components/404';

export default function page() {
    return (
        <div className="flex flex-col overflow-hidden items-center justify-center w-full h-[calc(100dvh-10rem)] max-sm:px-10">
            <div className='-translate-y-10'>
                <NotFoundLottie />
            </div>
            <div className="-translate-y-10 sm:-translate-y-20">
                <h3 className="text-2xl font-bold text-center">Oops!</h3>
                <p className="text-lg max-sm:text-sm text-center sm:w-[30ch] w-[20ch] leading-5 text-muted-foreground">Profile Page is under constructions</p>
            </div>
        </div>
    )
}