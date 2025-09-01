import { Button } from '@/components/ui/button';

function Home() {

    return (
        <>
            <div className="flex min-h-svh flex-col items-center justify-center">
                <Button className='p-16'>Shadcn + tailwind css 적용 잘됨</Button>
                <h1 className="text-red-500 bg-yellow-500">디자인 토큰 적용 잘됨!</h1>
            </div>
        </>
    )
}

export default Home;