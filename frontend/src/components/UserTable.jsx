import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  X,
  Filter,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserModal from "./UserModal";
import {
  useDeleteUserMutation,
  useGetALlUsersQuery,
} from "@/redux/api/userApi";
import { highlightText } from "@/helpers/highLightText";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";

const UserTable = () => {
  // Fetch class details from the database using a query hook
  const { data: allUserDetails } = useGetALlUsersQuery();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!!allUserDetails) {
      setData(allUserDetails?.data || []);
    }
  }, [allUserDetails]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({
    role: null,
    dateRange: null,
  });

  // Filter and sort data
  const filteredData = data
    ?.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = !filters.role || item.role === filters.role;

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  // Handle sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle filter change
  const handleRoleFilter = (role) => {
    setFilters({
      ...filters,
      role: role === filters.role ? null : role,
    });
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Roles for filter dropdown
  const roles = [...new Set(data?.map((item) => item.role))];

  // Mutation hook for delete user
  const [deleteUser, { isLoading, isSuccess, error }] = useDeleteUserMutation();

  // 🗑️ Manage delete confirmation modal state
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState(""); // ID of teacher to delete

  const handleDelete = async () => {
    await deleteUser(userId);
  };

  // Edit User Model Open
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User successfully delete");
      setDeleteModalOpen(false);
    } else if (error) {
      alert(error?.data?.message || "Failed to delete");
    }
  }, [error, isSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                {filters.role ? `Role: ${filters.role}` : "Filter by Role"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {roles?.map((role, index) => (
                <DropdownMenuItem
                  key={role + index}
                  onSelect={() => handleRoleFilter(role)}
                  className={filters.role === role ? "bg-gray-100" : ""}
                >
                  {role}
                </DropdownMenuItem>
              ))}
              {filters.role && (
                <DropdownMenuItem
                  onSelect={() => handleRoleFilter(null)}
                  className="text-red-500"
                >
                  Clear filter
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <>
            <Button
              onClick={() => setModalOpen(!modalOpen)}
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold cursor-pointer"
            >
              Add New User
            </Button>
          </>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  Name
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("dob")}
              >
                <div className="flex items-center">
                  Age
                  {sortConfig.key === "dob" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("role")}
              >
                <div className="flex items-center">
                  Role
                  {sortConfig.key === "role" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("createdAt")}
              >
                <div className="flex items-center">
                  Created At
                  {sortConfig.key === "createdAt" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.length > 0 ? (
              filteredData?.map((item) => (
                <TableRow key={item._id}>
                  {/* Highlight Full Name */}
                  <TableCell>
                    {item?.profile?.url ? (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item?.profile?.url}
                        alt=""
                      />
                    ) : (
                      <>
                        <span className="w-10 h-10 rounded-full bg-blue-200/60 flex items-center justify-center">
                          {item?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      </>
                    )}
                  </TableCell>
                  <TableCell
                    className="font-medium"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.name, searchTerm.trim()),
                    }}
                  />
                  {/* Highlight Email */}
                  <TableCell
                    className="font-medium"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(item.email, searchTerm.trim()),
                    }}
                  />

                  <TableCell>{calculateAge(item.dob)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status ? "default" : "secondary"}
                      className={item.status ? "bg-green-500" : "bg-gray-400"}
                    >
                      {item.status ? "Active" : "Inactive"} {item?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-4 w-4 text-blue-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() => {
                              setDeleteModalOpen(true), setUserId(item?._id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">{filteredData?.length}</span> of{" "}
          <span className="font-medium">{filteredData?.length}</span> results
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline" disabled>
            Next
          </Button>
        </div>
      </div>

      {/* Class Delete Model */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message={"User"}
        isPending={isLoading}
      />

      {/* Edit user model */}
      <UserModal user={selectedUser} open={modalOpen} setOpen={setModalOpen} />
    </motion.div>
  );
};

export default UserTable;
