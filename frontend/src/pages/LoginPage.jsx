import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, User, UserCircle2 } from "lucide-react";
import { useLoginMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/store/authSlice";
import { useNavigate } from "react-router";

// Zod schema for login
const loginSchema = z.object({
  email: z.string().min(1, "email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();

  const onSubmit = async (formData) => {
    await login(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User successfully login");
      const userData = data?.data?.userData;

      dispatch(userLoggedIn({ user: userData }));
      reset();
    } else if (error) {
      alert(error?.data?.message || "Failed to login");
    }
  }, [error, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500 to-cyan-700">
      <Card className="w-[350px] shadow-xl rounded-xl bg-[#1e2b40] relative">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-white px-6 py-2 rounded-md text-sm font-bold">
          SIGN IN
        </div>
        <CardContent className="pt-10">
          <div className="flex justify-center mb-6">
            <UserCircle2 size={45} className="text-white" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* email */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="email"
                className="pl-10 bg-gray-700 text-white placeholder-gray-400"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 bg-gray-700 text-white placeholder-gray-400"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end items-center text-sm text-gray-400">
              <a href="#" className="hover:underline text-cyan-400">
                Forgot your password?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold cursor-pointer"
            >
              {isLoading ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" /> Please wait...
                </span>
              ) : (
                "LOGIN"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
