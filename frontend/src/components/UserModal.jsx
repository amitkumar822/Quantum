// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ImagePlus, Trash2, Mail, User, Loader2 } from "lucide-react";
// import { toast } from "react-toastify";
// import {
//   useRegistrationMutation,
//   useUpdateUserMutation,
// } from "@/redux/api/userApi";

// // 🧠 Schema
// const schema = z
//   .object({
//     name: z.string().min(1, "Name is required"),
//     dob: z.string().min(1, "DOB is required"),
//     email: z.string().email("Invalid email"),
//     password: z.string().min(4, "At least 4 characters"),
//     confirmPassword: z.string().min(4, "Confirm your password"),
//     profile: z.any().optional(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// const UserModal = ({ user = null, open, setOpen }) => {
//   // const [open, setOpen] = useState(false);
//   const [image, setImage] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });

//   // Prefill data if editing
//   useEffect(() => {
//     if (user) {
//       reset({
//         name: user.name,
//         dob: user.dob,
//         email: user.email,
//         password: "",
//         confirmPassword: "",
//       });
//       if (user?.profile?.url) {
//         setImage(user?.profile?.url);
//       }
//     } else {
//       reset(); // Reset form on create
//       setImage(null);
//     }
//   }, [user, reset]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       setValue("profile", file);
//     }
//   };

//   const handleImageRemove = () => {
//     setImage(null);
//     setValue("profile", null);
//   };

//   // RTK Query mutation for Register New User
//   const [registration, { data, isLoading, isSuccess, error }] =
//     useRegistrationMutation();

//   // RTK Query mutation for Register New User
//   const [
//     updateUser,
//     {
//       data: updateData,
//       isLoading: updateIsLoading,
//       isSuccess: updateIsSuccess,
//       error: updateError,
//     },
//   ] = useUpdateUserMutation();

//   const onSubmit = async (formData) => {
//     const payload = new FormData();
//     payload.append("name", formData.name);
//     payload.append("dob", formData.dob);
//     payload.append("email", formData.email);
//     payload.append("password", formData.password);
//     payload.append("confirmPassword", formData.confirmPassword);
//     if (formData.profile) {
//       payload.append("profile", formData.profile);
//     }

//     if (!!user) {
//       await updateUser(payload);
//     } else {
//       await registration(payload);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       reset();
//       setImage(null);
//       toast.success(data?.message || "User successfully Registered");
//     } else if (error) {
//       alert(error?.data?.message || "Failed to Registered");
//     } else if (updateIsSuccess) {
//       toast.success(updateData?.message || "User successfully Update");
//       reset();
//       setImage(null);
//     } else if (updateError) {
//       alert(updateError?.data?.message || "Failed to Update");
//     }
//   }, [error, isSuccess, updateError, updateIsSuccess]);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[500px] w-full">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold">Create User</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
//           {/* Name */}
//           <div>
//             <Label htmlFor="name">Full Name</Label>
//             <div className="relative">
//               <Input
//                 id="name"
//                 placeholder="Enter full name"
//                 {...register("name")}
//                 className="pl-10"
//               />
//               <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
//             </div>
//             {errors.name && (
//               <p className="text-sm text-red-500">{errors.name.message}</p>
//             )}
//           </div>

//           {/* DOB */}
//           <div>
//             <Label htmlFor="dob">Date of Birth</Label>
//             <Input type="date" id="dob" {...register("dob")} />
//             {errors.dob && (
//               <p className="text-sm text-red-500">{errors.dob.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <Label htmlFor="email">Email</Label>
//             <div className="relative">
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter email"
//                 {...register("email")}
//                 className="pl-10"
//               />
//               <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
//             </div>
//             {errors.email && (
//               <p className="text-sm text-red-500">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Profile */}
//           <div>
//             <Label htmlFor="profile">Profile Picture</Label>
//             <div className="flex items-center gap-4">
//               <label className="cursor-pointer w-28 h-28 border rounded-lg flex justify-center items-center bg-gray-100 hover:bg-gray-200 relative">
//                 {image ? (
//                   <>
//                     <img
//                       src={image}
//                       alt="Preview"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                     <Trash2
//                       className="absolute top-1 right-1 w-5 h-5 text-red-500 bg-white rounded-full cursor-pointer"
//                       onClick={handleImageRemove}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <ImagePlus className="w-6 h-6 text-gray-500" />
//                     <input
//                       type="file"
//                       accept="image/*"
//                       {...register("profile")}
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </>
//                 )}
//               </label>
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="Enter password"
//               {...register("password")}
//             />
//             {errors.password && (
//               <p className="text-sm text-red-500">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <Label htmlFor="confirmPassword">Confirm Password</Label>
//             <Input
//               id="confirmPassword"
//               type="password"
//               placeholder="Re-enter password"
//               {...register("confirmPassword")}
//             />
//             {errors.confirmPassword && (
//               <p className="text-sm text-red-500">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <motion.div whileTap={{ scale: 0.97 }}>
//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-violet-600 hover:bg-violet-700 text-white cursor-pointer"
//             >
//               {isLoading ? (
//                 <span className="flex justify-center items-center gap-2">
//                   <Loader2 className="animate-spin" /> Please wait...
//                 </span>
//               ) : (
//                 "Submit"
//               )}
//             </Button>
//           </motion.div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UserModal;

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  useRegistrationMutation,
  useUpdateUserMutation,
} from "@/redux/api/userApi";

// Schemas
const createSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    dob: z.string().min(1, "DOB is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "At least 4 characters"),
    confirmPassword: z.string().min(4, "Confirm your password"),
    profile: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const updateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.string().min(1, "DOB is required"),
  email: z.string().email("Invalid email"),
  profile: z.any().optional(),
});

const UserModal = ({ user = null, open, setOpen }) => {
  const [image, setImage] = useState(null);

  const isEdit = !!user;
  const userId = user?._id;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? updateSchema : createSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        dob: user.dob,
        email: user.email,
      });
      setImage(user?.profile?.url || null);
    } else {
      reset();
      setImage(null);
    }
  }, [user, reset]);

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

  const [registration, { isLoading }] = useRegistrationMutation();
  const [updateUser, { isLoading: updateIsLoading }] = useUpdateUserMutation();

  const onSubmit = async (formData) => {
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("dob", formData.dob);
    payload.append("email", formData.email);
    if (formData.profile) payload.append("profile", formData.profile);

    if (isEdit) {
      await updateUser({ formData: payload, userId })
        .unwrap()
        .then((res) => {
          toast.success(res.message || "User updated successfully");
          setOpen(false);
          reset();
        })
        .catch((err) =>
          toast.error(err?.data?.message || "Failed to update user")
        );
    } else {
      payload.append("password", formData.password);
      payload.append("confirmPassword", formData.confirmPassword);
      await registration(payload)
        .unwrap()
        .then((res) => {
          toast.success(res.message || "User registered successfully");
          setOpen(false);
          reset();
        })
        .catch((err) =>
          toast.error(err?.data?.message || "Failed to register user")
        );
    }

    setImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Update User" : "Create User"}
          </DialogTitle>
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

          {/* Password (Only for Create) */}
          {!isEdit && (
            <>
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
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

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
            </>
          )}

          {/* Submit */}
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              disabled={isLoading || updateIsLoading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            >
              {isLoading || updateIsLoading ? (
                <span className="flex justify-center items-center gap-2">
                  <Loader2 className="animate-spin" /> Please wait...
                </span>
              ) : isEdit ? (
                "Update"
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
