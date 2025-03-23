import { UserAuthForm } from "../components/Login";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900 bg-[url('/images/authentication1.jpeg')] bg-cover bg-center bg-no-repeat" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back!
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your credentials to continue
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>

      <div className="flex h-screen items-center justify-center md:hidden">
        <div className="mx-auto flex w-80 flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to continue
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </>
  );
}
