import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AppLayout from "../../_components/layout/AppLayout";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash2, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  image: z.string().optional(),
});

export default function Profile() {
  const { user: student } = useSelector((state) => state.auth);
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <AppLayout>
      <div className="p-4 ">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <div className="">
                <Avatar className="size-36">
                  <AvatarImage src={student?.image} />
                  <AvatarFallback className="text-2xl font-semibold">
                    {student?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-gray-400">Name</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your name"
                            className="h-auto pr-10 py-3"
                          />
                        </FormControl>

                        {/* Icon */}
                        <User className="absolute right-3  top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
