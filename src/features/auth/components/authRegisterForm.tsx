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

export default function AuthRegisterForm() {
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
        // throw new Error("Network response was not ok");
        // throw new Error(response.error);
      }
      // Process response here
      console.log("Registration Successful", response);
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      //   toast({ title: "Registration Successful" });
    } else {
      console.log(result.error)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="smith@gmail.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Retype your Password" {...field} type="password" />
              </FormControl>
              <FormMessage className='text-[1.4rem]' />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}