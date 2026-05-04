import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ListCheck, Mail, Search, UserPlus, Users } from "lucide-react";
import UsersTable from "./component/UsersTable";
import ServicesTable from "./component/ServicesTable";
import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Spinner } from "@/components/ui/spinner";

const InvitationForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Staff");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef();

  const handleError = (error) => {
    toast("Something went wrong!", { description: error.message });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    const formData = new FormData();

    formData.append("email", email);
    formData.append("role", role);

    fetch(`${import.meta.env.VITE_API_URL}/users/inviteUser.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then(({ data, error }) => {
        if (error) {
          return toast("Invalid Data", { description: error.message });
        }

        toast("User invited", { description: data.message });
        onClose();
      })
      .catch(handleError);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Invite User</DialogTitle>
        <DialogDescription>
          Please fill in user details
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 py-4">
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

        <Label>User Role</Label>
        <Select value={role} onValueChange={(updatedValue) => setRole(updatedValue)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Contact Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Staff">Staff</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button disabled={isLoading} type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button disabled={isLoading} type="submit" onClick={() => formRef.current.requestSubmit()}>
          {isLoading ? <Spinner /> : <Mail />} Send Invitation
        </Button>
      </DialogFooter>
  </form>
  )
}

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import VerifyUser from "./component/VerifyUser";

const AdminPage = () => {
  const [userData, setUserData] = useState({});
  const [currentTab, setCurrentTab] = useState("users");
  const [enabledInvite, setEnabledInvite] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const { role } = userData;

  const openInviteForm = () => setEnabledInvite(true);

  useEffect(() => {
    const user = localStorage.getItem("user-data");
    const parsedData = JSON.parse(user ?? "{}");

    if (parsedData.role !== "Admin") setCurrentTab("services");

    setUserData(parsedData);
  }, []);

  if (!userData.id) return;

  if (selectedUser) return <VerifyUser user={selectedUser} onSubmit={() => setSelectedUser(null)} />

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div className="relative w-[20rem]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
          <Input
            type="search" 
            placeholder="Search users..."
            className="pl-10 pr-3 w-full h-8"
            onChange={(evt) => setSearchQuery(evt.target.value)}
          />
        </div>

        <Button onClick={openInviteForm} type="button" className="bg-[#183B4E] hover:bg-[#2e5e78] ml-auto w-[8rem]"><UserPlus /> Invite Users</Button>
      </div>
      <UsersTable searchFilter={searchQuery} setSelectedUser={setSelectedUser} />

      <Dialog open={!!enabledInvite} onOpenChange={setEnabledInvite}>
        <DialogContent className="sm:max-w-[355px] max-h-[85vh] overflow-auto">
          <InvitationForm onClose={() => setEnabledInvite(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;