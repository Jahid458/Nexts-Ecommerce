"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "../../../../components/Application/ButtonLoading";
import { z } from "zod";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min("3", "password fiels is required"),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogicSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <Card className="w-100">
        <CardContent>
          <div className="flex justify-center">
            <Image
              src={Logo}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-30"
            />
          </div>
          <div className="text-center">
            <h1 className=" text-3xl  font-bold">Login Into Account</h1>
            <p>Login into Your Account by filling out the from below</p>
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogicSubmit)}>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>password</FormLabel>
                        <FormControl>
                          <Input
                            type={isTypePassword ? "password" : "text"}
                            placeholder="**********"
                            {...field}
                          />
                        </FormControl>
                        <button
                          onClick ={() => setIsTypePassword(!isTypePassword)}
                          className="absolute top-1/2 right-2 cursor-pointer"
                          type="button"
                        >
                          {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <ButtonLoading
                    loading={loading}
                    type="Submit"
                    text="Login"
                    className="w-full cursor-pointer"
                  />
                </div>

                <div className="text-center">
                  <div className="flex justify-center items-center gap-1">
                     <p>Don't have Account? </p>
                     <Link href='' className="text-primary underline">Create Account</Link>
                  </div>

                  <div className="mt-3">
                     <Link href='' className="text-primary underline">Forgot Password?</Link>
                  </div>
                  
                </div>
                  
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginPage;
