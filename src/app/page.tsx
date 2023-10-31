import FrontMaxWidthWrapper from '@/components/frontpage-max-width'
import Navbar from '@/components/navbar'
import { buttonVariants } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  return (
    <>
      {/* @ts-ignore */}
      <Navbar />
      <FrontMaxWidthWrapper className="flex flex-col justify-center items-center text-center mt-28 mb-12 sm:mt-34">
        <div className="flex justify-center items-center space-x-2 max-w-fit rounded-full shadow-md bg-white border border-gray-200 backdrop-blur mx-auto mb-4 px-8 py-2 overflow-hidden transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm text-slate-700 font-semibold">
            Habitify is now public!
          </p>
        </div>
        <h1 className="text-5xl font-bold max-w-4xl md:text-6xl lg:text-[70px] lg:leading-4}">
          Enhance Your Daily <span className='text-blue-600'>Habits</span> with Modern Tools
        </h1>
        <p className='mt-5 max-w-prose text-muted-foreground sm:text-lg'>
          HabitBuilder empowers you to seamlessly track and improve your daily routines.
          Add your habits and take control of your progress from the start.
        </p>

        <Link className={buttonVariants({ size: "lg", className: "mt-6" })} href="/signup">
          Get started <MoveRight size={18} className='ml-2' />
        </Link>
      </FrontMaxWidthWrapper>

      {/* section 1 */}
      <div>
        <div className="relative isolate">
          <div className="absolute blur-3xl left-0 right-0 -top-40 sm:-top-80 -z-10 pointer-events-none transform-gpu overflow-hidden">
            <div className="relative w-[36.125rem] sm:w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] aspect-[1155/678] opacity-20 -translate-x-1/2 roatate-[30deg]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-10">
              <div className="flow-root mt-18 sm:mt-24">
                <div className="rounded-xl bg-slate-900/5 -m-2 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src='/frontpage-demo3.jpg'
                    width={1555}
                    height={893}
                    quality={100}
                    alt="HabitBuilder demo"
                    className="rounded-md bg-white shadow-xl ring-1 ring-slate-900/10 p-1 sm:p-8 md:p-18"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute blur-3xl left-0 right-0 -top-40 sm:-top-80 -z-10 pointer-events-none transform-gpu overflow-hidden">
            <div className="relative w-[36.125rem] sm:w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] left-[calc(50%-15rem)] sm:left-[calc(50%-38rem)] aspect-[1155/678] opacity-20 -translate-x-1/2 roatate-[30deg]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
          </div>
        </div>
      </div>

      {/* section 2 how app looks */}
      <div className="max-w-5xl mx-auto mb-28 mt-28 sm:mt-[175px]">
        <div className="mb-12 px-6 lg:px-10">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h1 className="text-4xl text-slate-900 font-bold mt-2 sm:text-5xl">
              Start achieving your goals with HabitBuilder.
            </h1>
            <p className="text-lg text-slate-500 mt-4">
              Managing your daily habits has never been easier than with HabitBuilder.
            </p>
          </div>
        </div>

        {/* steps */}
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 items-center sm:grid-rows-1 gap-x-5 gap-y-2 mt-20">
          <ol className="space-y-4 p-4 lg:p-0">
            <li className="md:flex-1">
              <div className="flex flex-col border-l-4 border-slate-300 space-y-2 py-2 pl-4 text-start">
                <div className="flex items-center">
                  <span className="text-[14px] font-semibold text-blue-600">Step 1</span>
                  <span className="text-xl font-bold pl-4">Create your account</span>
                </div>
                <span className="text-slate-600 mt-4">You can begin with our free plan and upgrade to the <Link href="/pricing" className="text-blue-800 hover:underline hover:underline-offset-2">pro plan</Link> anytime you want.</span>
              </div>
            </li>

            <li className="md:flex-1">
              <div className="flex flex-col justify-center border-l-4 border-slate-300 space-y-2 h-[100px] py-2 pl-4 text-start">
                <div className="flex items-center">
                  <span className="text-[14px] font-semibold text-blue-600">Step 2</span>
                  <span className="text-xl font-bold pl-4">Set your daily goals</span>
                </div>
                <span className="text-slate-600 mt-4">Set your daily goals and pave the way to success.</span>
              </div>
            </li>

            <li className="md:flex-1">
              <div className="flex flex-col justify-center border-l-4 border-slate-300 space-y-2 h-[100px] py-2 pl-4 text-start">
                <div className="flex items-center">
                  <span className="text-[14px] font-semibold text-blue-600">Step 3</span>
                  <span className="text-xl font-bold pl-4">Start logging habits</span>
                </div>
                <span className="text-slate-600 mt-4"> Try out HabitBuilder today – it truly takes less than a minute.</span>
              </div>
            </li>
          </ol>

          <div className="p-4 lg:p-0">
            <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/5">
              <Image
                src='/frontpage-demo-habitcreate.jpg'
                width={1126}
                height={684}
                quality={100}
                alt="HabitBuilder log demo"
              />
            </div>
          </div>

          <div>
            <Image
              src="/frontpage-demo-habit2.jpg"
              width={1359}
              height={893}
              quality={100}
              alt="HabitBuilder log demo"
            />
          </div>
        </div>
      </div>
    </>
  )
}
