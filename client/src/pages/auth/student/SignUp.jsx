import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Eye,
  EyeOff,
  Lock,
  User,
  Calendar,
  GraduationCap,
  Venus,
  Mars,
} from "lucide-react";
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
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSignup } from "../../../hooks/auth/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { class_names, sections } from "../../../constants/data";

// ✅ Validation Schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  class_name: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  dob: z.string().min(1, "Date of birth is required"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading } = useSignup();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      class_name: "",
      section: "",
      gender: "",
      dob: "",
    },
  });

  const onSubmit = async (values) => {
    const res = await signup(values);
    if (res?.success) toast.success("Signup successful!");
    else toast.error(res?.message || "Signup failed");
  };

  return (
    <div className="bg-[#F4F3EA] h-screen flex justify-center items-center">
      <Card className="w-full max-w-md rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Student Signup
          </CardTitle>
          <CardDescription className="text-sm text-center text-gray-600">
            Please fill in your details to create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Student Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="pl-10 pr-4 py-5 font-semibold rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]"
                          {...field}
                        />
                      </FormControl>
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                          className="pl-10 pr-4 py-5 font-semibold rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]"
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
                          placeholder="Create a password"
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
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Class & Section in the Same Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Class Dropdown */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="class_name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full py-5 font-semibold rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]">
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {class_names.map((item) => (
                              <SelectItem key={item.id} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Section Dropdown */}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full py-5 font-semibold rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]">
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sections.map((item) => (
                              <SelectItem key={item.id} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-600">
                      Gender
                    </FormLabel>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="Male"
                          checked={field.value === "Male"}
                          onChange={field.onChange}
                        />
                        <Mars className="text-blue-500" size={16} /> Male
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="Female"
                          checked={field.value === "Female"}
                          onChange={field.onChange}
                        />
                        <Venus className="text-pink-500" size={16} /> Female
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="date"
                          className="pl-10 pr-4 py-5 font-semibold rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]"
                          {...field}
                        />
                      </FormControl>
                      <Calendar
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 mb-3 text-md py-5 bg-[#FBC884] hover:bg-[#fbc884]/90 text-black font-semibold rounded-lg"
              >
                {loading ? "Signing up..." : "Signup"}
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/student-login"
              className="font-semibold hover:text-yellow-500"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
