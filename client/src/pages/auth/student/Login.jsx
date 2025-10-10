import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLogin } from "../../../hooks/auth";

// ✅ Zod validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ✅ Use hook at the top level
  const { login, loading, data, error } = useLogin();

  const onSubmit = async (values) => {
    const res = await login(values.email, values.password);
    console.log(data,error);
    if (data) {
      toast.success(data.message || "Login successful");
      // e.g. navigate to dashboard
      // navigate("/dashboard");
    } else {
      toast.error(error?.message || "Invalid credentials");
    }
  };

  return (
    <div className="bg-[#F4F3EA] h-screen flex justify-center items-center">
      <Card className="w-full max-w-md rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Student Login
          </CardTitle>
          <CardDescription className="text-sm text-center text-gray-600">
            Please enter your email and password to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 pr-4 font-semibold py-5 rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]"
                          {...field}
                        />
                      </FormControl>
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 py-5 font-semibold rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]"
                          {...field}
                        />
                      </FormControl>
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 mb-3 text-md py-5 bg-[#FBC884] hover:bg-[#fbc884]/90 text-black font-semibold rounded-lg"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
