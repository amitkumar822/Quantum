import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  User,
  Lock,
  Calendar,
  Mail,
  Image as ImageIcon,
  X,
  Loader2,
} from "lucide-react";
import { useRegistrationMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profile", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("profile", null);
  };

  const [registration, { data, isLoading, isSuccess, error }] =
    useRegistrationMutation();

  const onSubmit = async (formData) => {
    await registration(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      // navigate("/login");
      toast.success(data?.message || "User successfully Registered");
      // reset();
    } else if (error) {
      alert(error?.data?.message || "Failed to Registered");
    }
  }, [error, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-500 to-cyan-700">
      <Card className="w-[400px] shadow-xl rounded-xl bg-[#1e2b40] relative">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-white px-6 py-2 rounded-md text-sm font-bold">
          REGISTER
        </div>
        <CardContent className="pt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Full Name"
                className="pl-10 bg-gray-700 text-white placeholder-gray-400"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="date"
                className="pl-10 bg-gray-700 text-white placeholder-gray-400"
                {...register("dob")}
              />
              {errors.dob && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
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

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="password"
                placeholder="Confirm Password"
                className="pl-10 bg-gray-700 text-white placeholder-gray-400"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Profile Image Upload */}
            <div>
              <Label className="text-gray-300 mb-1 block">Upload Profile {isLoading}</Label>
              <div className="flex items-center gap-2">
                <ImageIcon className="text-gray-400" />
                <Input
                  type="file"
                  accept="image/*"
                  className="bg-gray-700 text-white"
                  onChange={handleImageChange}
                />
              </div>
              {imagePreview && (
                <div className="relative mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-24 w-24 rounded-md object-cover border border-gray-500"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold cursor-pointer contain-paint"
            >
              {isLoading ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" /> Please wait... 
                </span>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
