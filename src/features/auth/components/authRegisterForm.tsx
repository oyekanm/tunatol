"use client";

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
import { RegisterUser } from "@/actions/authActions";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";
import { FormSubmitButton } from "@/components/form";
import Link from "next/link";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("provide a valid email"),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  c_password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

type Props = {
  url:string
}

export default function AuthRegisterForm({url}:Props) {
  const router = useRouter();
  const toast = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      c_password: "",
      email: "",
      name: "",
      password: ""
    },
  });

  const onSubmit = async (data: FormData) => {
    const result = FormSchema.safeParse(data)
    const redirect = url || "/"

    if (result.success) {
      const { name, email, password, c_password } = result.data;

      const user = { name, email, password }

      if (password !== c_password) {
        console.log("passwords do not match")
        return;
      }

      const response = await RegisterUser(user)
      if (!response.success) {
        console.log(response.error)
        toast({ text: response.error, status: "error" });
        // throw new Error("Network response was not ok");
        // throw new Error(response.error);
      }

      // Process response here
      toast({ text: "Registration Successful", duration: 1500, status: "success" });

      // console.log("Registration Successful", response);
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      router.push(redirect);
      router.refresh();
    } else {
      console.log(result.error)
    }
  };

  const labelClass = "font-semibold text-[1.4rem] text-slate-700 block mb-2 dark:text-white"
  const inputClass = "!py-6 rounded-[5px] text-gray-700 !p-4 !py-8 text-[1.4rem] focus-visible:!outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} className={inputClass} />
              </FormControl>
              <FormMessage className='text-[1.4rem]' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Email</FormLabel>
              <FormControl>
                <Input className={inputClass} placeholder="smith@gmail.com" {...field} />
              </FormControl>
              <FormMessage className='text-[1.4rem]' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Password</FormLabel>
              <FormControl>
                <Input className={inputClass} placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage className='text-[1.4rem]' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="c_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClass}>Confirm Password</FormLabel>
              <FormControl>
                <Input className={inputClass} placeholder="Retype your Password" {...field} type="password" />
              </FormControl>
              <FormMessage className='text-[1.4rem]' />
            </FormItem>
          )}
        />
        <div className="text-right" >
        {/* router.push(`/login?callbackUrl=${url}`) */}
          <Link href={`/login?callbackUrl=${url}`} className="text-[1.2rem] underline">click here to login</Link>
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