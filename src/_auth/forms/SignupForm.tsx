// React-Hook-Form
import { useForm } from "react-hook-form"

// Zod Form
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

// Shadcn Imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

// Validations
import { SignupValidation } from "@/lib/validations";

export default function SignupForm() {
  const isLoading = true;

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  // Submit Handler Function
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex flex-1 flex-col items-center justify-center">
        <div>
          {/* Brand */}
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            className="mx-auto"
          />
          <div className="mt-4">
            <h1 className="text-center h3-bold md:h4-bold">Create your account</h1>
            <p className="text-light-3 text-center mt-2 small-medium md:base-regular">To use Snapgram enter your details</p>
          </div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="h-12 w-full rounded-xl shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="h-12 w-full rounded-xl shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="h-12 w-full rounded-xl shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="h-12 w-full rounded-xl shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-primary-600 xl:hover:bg-primary-500"
          >
            {isLoading ? <div className="flex items-center justify-center">
              <p>Loading...</p>
            </div> : <p>Submit</p>}
          </Button>
        </form>
      </div>
    </Form>
  )
}
