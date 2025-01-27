// React imports
import { Link, useNavigate } from "react-router-dom";

// React-Hook-Form
import { useForm } from "react-hook-form"

// Zod Form
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

// Shadcn Imports
import { useToast } from "@/hooks/use-toast"
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

// Context
import { useAuthContext } from "@/context/AuthContext";

// Mutations and Queries
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";

// Validations
import { SignupValidation } from "@/lib/validations";

// Icon Library
import { Loader2 } from "lucide-react";

export default function SignupForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useAuthContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: ""
    },
  })

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  // Submit Handler Function
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    try {
      const newUser = await createUserAccount(values); // from mutation function

      // If new user creation didn't succeed
      if (!newUser) {
        toast({
          variant: "destructive",
          title: "Signup failed ! Please try again.",
        });

        return;
      }

      // Creating session for sign-up user
      const session = await signInAccount({
        email: values.email,
        password: values.password
      });

      // If Signup failed
      if (!session) {
        toast({
          title: "Something went wrong ! Please login to your new account."
        });

        navigate('/sign-in');

        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate('/');
      } else {
        toast({ title: 'Signup failed! Try again.' });

        return;
      }
    } catch (error) {
      console.log({ error });
    }
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isCreatingUser}
            className="w-full h-12 rounded-xl shad-button_primary"
          >
            {isCreatingUser ? <div className="flex gap-x-2.5 items-center justify-center">
              <Loader2 className="animate-spin" />
              <p>Signing up...</p>
            </div> : <p>Sign up</p>}
          </Button>

          <p className="text-center small-medium xl:base-medium">Already have an account ? <Link to={"/sign-in"} className="text-primary-500 xl:hover:underline">Signin</Link></p>

        </form>
      </div>
    </Form>
  )
}
