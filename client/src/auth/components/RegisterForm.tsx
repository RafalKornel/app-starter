import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaCircleInfo } from "react-icons/fa6";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TooltipWithIcon } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { useRegister } from "../hooks/useRegister";

const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),

    passwordConfirmation: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const registerMutation = useRegister();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    registerMutation
      .mutateAsync(data)
      .then((res) => {
        toast("Success!", {
          description: `Created new account with email ${res.email} and username ${res.username}`,
        });
      })
      .catch((e) => {
        console.log("caught error: ", e);

        toast("Error", { description: e.message });
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username
                <TooltipWithIcon icon={<FaCircleInfo className="ml-2" />}>
                  Your public display name.
                </TooltipWithIcon>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
                <TooltipWithIcon icon={<FaCircleInfo className="ml-2" />}>
                  E-mail address used to communicate with you
                </TooltipWithIcon>
              </FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>
                Password
                <TooltipWithIcon icon={<FaCircleInfo className="ml-2" />}>
                  Strong password makes your account harder to hack.
                </TooltipWithIcon>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password confirmation
                <TooltipWithIcon icon={<FaCircleInfo className="ml-2" />}>
                  Type password twice to avoid spelling mistakes
                </TooltipWithIcon>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
      <Toaster />
    </Form>
  );
}
