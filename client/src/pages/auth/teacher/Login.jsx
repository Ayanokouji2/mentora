import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useTeacherLogin } from "../../../hooks/auth/api";
import { useDispatch } from "react-redux";
import { userExists } from "../../../redux/slices/auth";

// ✅ Validation schema — must start with 'TCH' and then 6 digits
const formSchema = z.object({
  teacher_id: z
    .string()
    .regex(
      /^TCH\d{6}$/,
      "Teacher ID must be in the format TCH followed by 6 digits"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const TeacherLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useTeacherLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacher_id: "",
      password: "",
    },
  });

  // ✅ Ensure prefix "TCH" and allow only numbers after that
  const handleTeacherIdChange = (e, onChange) => {
    let value = e.target.value.toUpperCase();

    // Always keep prefix "TCH"
    if (!value.startsWith("TCH")) {
      value = "TCH" + value.replace(/[^0-9]/g, "");
    } else {
      value = "TCH" + value.slice(3).replace(/[^0-9]/g, "");
    }

    // Limit total length to 9 (TCH + 6 digits)
    if (value.length > 9) value = value.slice(0, 9);

    onChange(value);
  };

  const onSubmit = async (values) => {
    const teacherData = await login(values.teacher_id, values.password);
    if (teacherData) {
      toast.success("Login successful!");
      dispatch(userExists(teacherData));
      // TODO: Redirect to Teacher DashBoard
      navigate("/create-attendance");
    }
  };

  return (
    <div className="bg-[#F4F3EA] h-screen flex justify-center items-center">
      <Card className="w-full max-w-md rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Teacher Login
          </CardTitle>
          <CardDescription className="text-sm text-center text-gray-600">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* ✅ Teacher ID */}
              <FormField
                control={form.control}
                name="teacher_id"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="TCH123456"
                          value={field.value}
                          onChange={(e) =>
                            handleTeacherIdChange(e, field.onChange)
                          }
                          className="pl-10 pr-4 py-5 font-semibold uppercase rounded-lg border border-gray-300 focus:border-[#FBC884] focus:ring-2 focus:ring-[#FBC884]"
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4 mb-3 text-md py-5 bg-[#FBC884] hover:bg-[#fbc884]/90 text-black font-semibold rounded-lg"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-500">
            Not registered yet? Contact your admin
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherLogin;
