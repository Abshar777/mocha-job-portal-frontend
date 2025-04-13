"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbMail } from "react-icons/tb";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormGeneratorV2 from "@/components/global/form-generator/v2";

// Zod Schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

// FormGenerator Props
const props = {
  inputType: "input",
  options: [],
  label: "Username",
  placeholder: "Enter your username",
  type: "password",
  lines: 1,
  className: {
    label: "text-white",
    input: "",
    icon: "",
    error: "",
    main: "",
  },
  showError: true,
  checked: false,
  Icon: TbMail,
  maxLength: 10,
};

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <div className="flex bg-background flex-col items-center justify-center h-screen">
      <Form {...form}>
        <div className="w-full grid grid-cols-3 p-2 place-items-end  gap-4">
          <div className=""></div>
          <div className="flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="selectv2"
                  options={[
                    {
                      label: "Username",
                      value: "username",
                      id: "username",
                    },
                    {
                      label: "Email",
                      value: "email",
                      id: "email",
                    },
                  ]}
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  Icon={TbMail}
                  className={{
                    label: "text-white",
                    main: "w-3/4",
                  }}
                  field={field}
                  errors={form.formState.errors}
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="upload"
                  type="text"
                  label="Email"
                  placeholder="Enter your email"
                  // Icon={TbMail}
                  className={{
                    label: "text-white",
                    main: "w-3/4",
                  }}
                  field={field}
                  errors={form.formState.errors}
                />
              )}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Page;
