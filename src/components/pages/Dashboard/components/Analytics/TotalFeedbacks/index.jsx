import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareText, NotebookPen, Users } from "lucide-react";
import { useEffect, useState } from "react";

const TotalFeedbacks = () => {
  const [total, setTotal] = useState(0);
  const initiateData = (userData) => {
    const formData = new FormData();

    formData.append("userId", userData.id);

    fetch(`${import.meta.env.VITE_API_URL}/stats/totalFeedbacks.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        const feedbacks = data?.feedbacks ?? [];

        setTotal(feedbacks.length);
      })
  }

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (!userData) return;

    const parsedData = JSON.parse(userData ?? "");

    if (!parsedData) return;

    initiateData(parsedData);
  }, []);
  return (
    <Card className="py-0">
      <CardContent className="px-0">
        <div className="py-4 px-6 flex justify-between">
          <div className="grid gap-3">
            <div>
              <MessageSquareText />
            </div>

            <p className="font-semibold">
              Total Feedbacks
            </p>
          </div>

          <div className="text-[2.5rem] flex justify-center">
            {total}
          </div>
        </div>
      </CardContent>
    </Card>
  )
};

export default TotalFeedbacks;