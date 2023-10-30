import { buttonVariants } from "@/components/ui/button"
import UserAuthForm from "@/components/user/user-auth-form"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const Signup = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className={cn(
        buttonVariants({ variant: "ghost" }), "absolute left-4 top-4 md:left-8 md:top-8"
      )}>
        <ChevronLeft color="#ff5c00" className="mr-2 h-5 w-5" /> Back
      </Link>
      <div className="mx-auto w-full flex flex-col justify-center space-y-8 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          {/* <p className="text-sm text-muted-foreground">Enter your email below to create your account</p> */}
        </div>
        <UserAuthForm />
        <p className="text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="/" className="underline underline-offset-4 decoration-[#FF5C00]">
            Terms of Service
          </Link> {" "}
          and {" "}
          <Link href="/" className="underline underline-offset-4 decoration-[#FF5C00]">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Signup