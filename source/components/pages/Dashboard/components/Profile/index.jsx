import { useEffect, useState } from "react";
import ProfileForm from "../../../../custom-ui/ProfileForm";
import { toast } from "sonner";

const Profile = () => {
  const [profileState, setProfileState] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user-data");

    const parsedData = JSON.parse(userData);

    setProfileState({ ...parsedData, });
  }, []);

  const onSubmit = (formValues) => {
    if (isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    const { id, file, personal_name, last_name, email, date_of_birth, bio, contacts = [] } = formValues;

    formData.append("personal_name", personal_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("bio", bio ?? "");
    formData.append("date_of_birth", date_of_birth ?? "");
    formData.append("id", id)
    
    formData.append("contacts", JSON.stringify(contacts));

    if (file) formData.append("file", file);

    fetch(`${import.meta.env.VITE_API_URL}/users/update.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data, error } = {}) => {
        setProfileState((prev) => ({ ...prev, file: undefined }))
        setIsLoading(false);
        if (error) {
          toast(error.title, {
            description: error.message,
          });
          return;
        }

        if (data) {
          toast(data.title, {
            description: "Successfully updated your profile data.",
          });

          localStorage.setItem("user-data", JSON.stringify({ ...formValues, display: data.display_picture ?? "", file: undefined }));
        }
      })
  }


  if (!profileState) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <ProfileForm onSubmit={onSubmit} defaultValues={profileState} />
    </div>
  )
};

export default Profile;