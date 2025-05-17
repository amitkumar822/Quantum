import { useLogoutUserMutation } from "@/redux/api/userApi";
import { userLoggedOut } from "@/redux/store/authSlice";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Logout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout API calls
  const [logoutUser, { data, isSuccess, error, isLoading }] =
    useLogoutUserMutation();

  const handleLogout = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout Successfully");
      navigate("/login");
      dispatch(userLoggedOut());
      localStorage.clear();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    } else if (error) {
      toast.error(error?.data.message || "Logout failed");
    }
  }, [error, isSuccess]);

  return (
    <div>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer md:w-fit w-full"
        >
          {isLoading ? (
            <span className="flex gap-2 justify-center items-center text-sm">
              <Loader size={18} className="animate-spin" />
              Please Wait
            </span>
          ) : (
            "Logout"
          )}
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Logout;
