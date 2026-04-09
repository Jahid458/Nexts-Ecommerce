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
import Link from "next/link"
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";



const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema.pick({
     name:true, email: true, password: true 
    }).extend({
        confirmPassword:z.string()
    }).refine((data) => data.password === data.confirmPassword,{
        message: 'Password and confirm password must be same',
        path: ['confirmPassword']
    })



  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ''
    },
  });

  const handleRegisterSubmit = async (values) => {
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
            <h1 className=" text-3xl  font-bold">Create  Account</h1>
            <p>Create New Account by filling out the from below</p>
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Your Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                            type="password"
                            placeholder="**********"
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
                    name="cofirmPassword"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>Confirm password</FormLabel>
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
                    text="Create Account"
                    className="w-full cursor-pointer"
                  />
                </div>

                <div className="text-center">
                  <div className="flex justify-center items-center gap-1">
                     <p>Already have an  Account? </p>
                     <Link href={WEBSITE_LOGIN} className="text-primary underline">Login!</Link>
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

export default RegisterPage;