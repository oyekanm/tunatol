"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSubmitButton } from "@/components/form";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

type Props = {
  url:string
}

// TODO: implement a reset password

export default function AuthLoginForm({url}:Props) {
  const router = useRouter();
  //  // decodeURIComponent(callbackUrl)

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);
    const redirect = url || "/"

    const { email, password } = data;

    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log({ response });
      if (response?.ok) {
        router.push(redirect);
        router.refresh();
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Login Successful", response);
      //   toast({ title: "Login Successful" });
    } catch (error: any) {
      console.error("Login Failed:", error);
      //   toast({ title: "Login Failed", description: error.message });
    }
  };

  const labelClass = "font-semibold text-[1.4rem] text-slate-700 block mb-2 dark:text-white"
  const inputClass = "!py-6 rounded-[5px] text-gray-700 !p-4 !py-8 text-[1.4rem] focus-visible:!outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"


  return (
    <Form {...form}
    // className="w-2/3 space-y-6"
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col  gap-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className={labelClass} >Provide Email</FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  placeholder="Provide Email"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage className='text-[1.4rem]' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className={labelClass}>Provide Password</FormLabel>
              <FormControl>
                <Input
                  className={inputClass}
                  placeholder="Provide Password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage className='text-[1.4rem]' />
            </FormItem>
          )}
        />
        <div className="text-right" >
          <Link href={`/register?callbackUrl=${url}`} className="text-[1.2rem] underline">click here to register</Link>
        </div>
        <FormSubmitButton
          // loading={false}
          className='w-full'
          loading={form.formState.isSubmitting}
          text="Continue" />
      </form>
    </Form>
  );
}