import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";

const UsersTable = () => {
  const [usersList, setUsersList] = useState([]);

  const parseUsersData = ({ users = [], error }) => {
    if (error) {
      return toast(error.message);
    }
    
    const parsedData = users.map((item) => ({
      ...item,
      contacts: JSON.parse(item.contacts ?? "[]"),
      display_picture: `${import.meta.env.VITE_API_URL}/uploads/${item.display_picture}`,
      name: [item.personal_name, item.last_name].filter(Boolean).join(" "),
    }));

    setUsersList(parsedData);
  }

  const handleFetchError = (error) => {
    return toast(error.message);
  }

  const getUsersData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/fetch.php`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(parseUsersData)
      .catch(handleFetchError);
  }

  useEffect(() => {
    getUsersData();
  }, []);

  const updateUser = (user, res) => {
    setUsersList((prev) => {
      const updatedUsers = prev.map((userItem) => {
        if (userItem.id !== user.id) return userItem;

        return user;
      });

      return updatedUsers;
    });

    if (res.data) {
      toast(res.data.title, { description: res.data.message });
    }
  }

  const handleBlockUser = (user) => {
    const formData = new FormData();

    formData.append("id", user.id);
    formData.append("status", "Blocked");

    fetch(`${import.meta.env.VITE_API_URL}/users/block.php`, {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then(updateUser.bind(null, { ...user, status: "Blocked" }))
      .catch(handleFetchError);
  };

  const handleUnblockUser = (user) => {
    const formData = new FormData();

    formData.append("id", user.id);
    formData.append("status", "Active");

    fetch(`${import.meta.env.VITE_API_URL}/users/block.php`, {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then(updateUser.bind(null, { ...user, status: "Active" }))
      .catch(handleFetchError);
  };

  return (
    <Card className="p-0 rounded-md">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-400">
              <TableHead className="w-[350px] px-5 py-3 text-gray-500">Name</TableHead>
              <TableHead className="w-[200px] text-gray-500">Email</TableHead>
              <TableHead className="text-gray-500">Role</TableHead>
              <TableHead className="px-5 py-3 text-gray-500">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium px-5 py-2 h-[3.5rem]">
                  <div className="w-[90%] overflow-hidden text-ellipsis">
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-[90%] overflow-hidden text-ellipsis">
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="px-5 py-2">
                  <div className="flex items-center justify-between">
                    <span>{user.status}</span>


                    {user.role !== "Admin" && (
                      <Popover align="right">
                        <PopoverTrigger asChild>
                          <Button variant="icon"><Ellipsis /></Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[150px] p-0"  side="bottom" align="end">
                          <Command>
                            <CommandList>
                              <CommandGroup>

                                {(user.status !== "Blocked") && (
                                  <CommandItem onSelect={() => handleBlockUser(user)}>
                                    Block User
                                  </CommandItem>
                                )}

                                {user.status === "Blocked" && (
                                  <CommandItem onSelect={() => handleUnblockUser(user)}>
                                    Unblock User
                                  </CommandItem>
                                )}

                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
};

export default UsersTable;