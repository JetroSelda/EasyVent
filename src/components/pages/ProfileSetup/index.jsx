import { useLocation, useNavigate } from "react-router-dom";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import ProfileForm from "../../custom-ui/ProfileForm";
import { toast } from "sonner";
import { useState } from "react";

const ProfileSetup = () => {
  const { state = {} } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (formValues) => {
    if (isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    const { id, file, personal_name, last_name, email, date_of_birth, bio, contacts = [], payments } = formValues;

    formData.append("personal_name", personal_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("bio", bio ?? "");
    formData.append("date_of_birth", date_of_birth ?? "");
    formData.append("id", id)
    
    formData.append("contacts", JSON.stringify(contacts));
    formData.append("payments", payments ? JSON.stringify(payments) : "[]");
    formData.append("status", state.role === "Provider" ? "Pending" : "Active");

    if (file) formData.append("file", file);

    fetch(`${import.meta.env.VITE_API_URL}/users/update.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data, error } = {}) => {
        if (error) {
          toast(error.title, {
            description: error.message,
          });
          return;
        }

        if (state.role === "Provider") return navigate("/listing", { state: { id_user: id } });

        if (data) {
          const todayDate = new Date();
          todayDate.setDate(todayDate.getDate() + 1);

          const tomorrow = todayDate.getTime();

          localStorage.setItem("user-data", JSON.stringify({
            ...formValues,
            display: data.display_picture ?? "",
            expiration: tomorrow,
            role: state.role,
          }));

          if (state && state.redirect) {
            navigate(state.redirect.page, { state: state.redirect.state });
            return;
          }

          toast(data.title, {
            description: data.message,
          });

          navigate("/dashboard");
        }
      })
  }
  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />
      <div className="w-full flex items-center justify-center py-[2rem]">
        <ProfileForm isProvider={state.role === "Provider"} isCreating defaultValues={state} onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default ProfileSetup;