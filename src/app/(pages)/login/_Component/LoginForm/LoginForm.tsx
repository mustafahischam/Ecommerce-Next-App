"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"
import ForgotPassword from "../ForgotPassword/ForgotPassword"

const formSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string()
    .min(1, { message: "Password is required" }),
})

type FormFields = z.infer<typeof formSchema>


export function LoginForm() {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")



  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: FormFields) {
    setIsLoading(true)
    await signIn("credentials", {
      callbackUrl: callbackUrl ?? "/",
      email: values.email,
      password: values.password,
      redirect: true,
    })
    setIsLoading(false)
  }

  return (
    <Card className="max-w-md mx-auto mt-16 shadow-2xl border-0 bg-white">
      <div className="p-10">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-primary tracking-tight drop-shadow">
          Sign in to your account
        </h2>
        <Form {...form}>
          {searchParams.get("error") ?
            <h1 className="text-destructive text-2xl font-bold mb-4 text-center" >{searchParams.get
              ("error")}</h1> : ''}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      type="email"
                      autoComplete="email"
                      {...field}
                      className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                      className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between mt-2">
              <ForgotPassword />
            </div>
            <Button disabled={isLoading}
              type="submit"
              className="w-full font-semibold py-3 rounded-lg bg-primary hover:bg-primary/90 transition text-lg shadow"
            >
              {isLoading && <Loader2Icon className="animate-spin mr-2 inline" />}
              Sign In
            </Button>
            <div className="text-center text-sm text-muted-foreground mt-6">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-primary underline font-medium hover:text-primary/80 transition">
                Register
              </a>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  )
}