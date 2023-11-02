import Link from "next/link";
import FrontMaxWidthWrapper from "./frontpage-max-width";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import UserNav from "./user-nav";

export default async function Navbar() {

  const user = await getCurrentUser()

  return (
    <nav className="sticky h-14 inset-x-0 top-0 w-full border-b border-slate-200 bg-white/75 backdrop-blur-lg z-30 transition-all">
      <FrontMaxWidthWrapper>
        <div className="flex h-14 justify-between items-center border-b border-slate-200">
          <Link href="/" className="flex z-40 font-semibold">
            HabitBuilder
          </Link>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Pricing
                </Link>
                <Link
                  href="/signin"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className={buttonVariants({
                    size: 'sm',
                  })}
                >
                  <span className="text-[13px]">Get started</span>
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  <span className="mr-2">Dashboard</span>
                </Link>
                <UserNav user={{
                  name: user.name as string,
                  email: user.email as string,
                  image: user.image as string,
                }} />
              </>
            )}
          </div>
        </div>
      </FrontMaxWidthWrapper>
    </nav>
  )
}
