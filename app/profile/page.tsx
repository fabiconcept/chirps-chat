import NotFoundLottie from '@/components/404';

export default function page() {
    return (
        <div className="flex flex-col overflow-hidden items-center justify-center w-full h-[calc(100dvh-10rem)] max-sm:px-10">
            <div className='-translate-y-10'>
                <NotFoundLottie />
            </div>
            <h3 className="text-2xl font-bold text-center -translate-y-10">Oops!</h3>
            <p className="text-lg text-center leading-5 -translate-y-10">Profile Page is under constructions</p>
        </div>
    )
}