import UserAuthForm from "@/components/user/user-auth-form"

const Signup = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
      <h1 className="text-5xl text-gray-500 font-semibold mb-14">Sign up</h1>
      <UserAuthForm />
    </div>
  )
}

export default Signup