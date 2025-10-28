import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatISODate } from "../../../../../../../api/util";

const ActivityLog = ({ profileState }) => {
  const [logs, setLogs] = useState([]);

  const initiateUserLogs = () => {
    const formData = new FormData();

    formData.append("userId", profileState.id);

    fetch(`${import.meta.env.VITE_API_URL}/users/logs.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setLogs(data?.logs ?? []);
      });
  }

  const initiateAdminLogs = () => {
    const formData = new FormData();

    formData.append("userId", profileState.id);

    fetch(`${import.meta.env.VITE_API_URL}/users/adminLogs.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setLogs(data?.logs ?? []);
      });
  }


  useEffect(() => {
    if (profileState.role === "Admin" || profileState.role === "Staff") {
      initiateAdminLogs();
    } else {
      initiateUserLogs();
    }
  }, [profileState]);

  return (
    <Card className="shadow-xs grow rounded-sm">
      <CardContent>
        <p className="mb-5">
          Activity Log
        </p>

        <div className="grid">
          {logs.map((item) => (
            <div className="flex items-center gap-7 border-l-1 pl-3 py-2">
              <div className="text-gray-400 text-sm italic whitespace-nowrap">
                {formatISODate(item.created_at)}
              </div>

              <Card className="shadow-sm rounded-sm py-2 w-[70%]">
                <CardContent className="rounded-sm px-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{item.title}</div>

                    <div className="italic text-gray-500">Author: {[item.personal_name].join(" ")}</div>
                  </div>

                  <div className="text-gray-600 w-[90%]">
                    {item.description}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityLog;