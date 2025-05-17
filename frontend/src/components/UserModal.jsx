import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Trash2, Mail, User, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRegistrationMutation } from "@/redux/api/userApi";

// 🧠 Schema
const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    dob: z.string().min(1, "DOB is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "At least 4 characters"),
    confirmPassword: z.string().min(4, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const UserModal = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setValue("profile", file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setValue("profile", null);
  };

  const [registration, { data, isLoading, isSuccess, error }] =
    useRegistrationMutation();

  const onSubmit = async (formData) => {
    await registration(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setImage(null);
      setOpen(false);
      toast.success(data?.message || "User successfully Registered");
    } else if (error) {
      alert(error?.data?.message || "Failed to Registered");
    }
  }, [error, isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold cursor-pointer">
          Add New User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Enter full name"
                {...register("name")}
                className="pl-10"
              />
              <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input type="date" id="dob" {...register("dob")} />
            {errors.dob && (
              <p className="text-sm text-red-500">{errors.dob.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email")}
                className="pl-10"
              />
              <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Profile */}
          <div>
            <Label htmlFor="profile">Profile Picture</Label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer w-28 h-28 border rounded-lg flex justify-center items-center bg-gray-100 hover:bg-gray-200 relative">
                {image ? (
                  <>
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Trash2
                      className="absolute top-1 right-1 w-5 h-5 text-red-500 bg-white rounded-full cursor-pointer"
                      onClick={handleImageRemove}
                    />
                  </>
                ) : (
                  <>
                    <ImagePlus className="w-6 h-6 text-gray-500" />
                    <input
                      type="file"
                      accept="image/*"
                      {...register("profile")}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white cursor-pointer"
            >
              {isLoading ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" /> Please wait...
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
