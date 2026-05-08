import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { NotebookPen, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const TotalServicesAdmin = ({ filter, selectedFilter }) => {
  const [total, setTotal] = useState(0);
  const [delta, setDelta] = useState();

  const initiateData = (userData) => {
    const formData = new FormData();

    formData.append("userId", userData.id);

    fetch(`${import.meta.env.VITE_API_URL}/stats/totalServicesAdmin.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        const { list, delta } = filter(data?.services ?? []) || {};

        setTotal(list.length);
        setDelta(delta)
      })
  }

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (!userData) return;

    const parsedData = JSON.parse(userData ?? "");

    if (!parsedData) return;

    initiateData(parsedData);
  }, [filter]);
  return (
    <Card className="py-0 gap-0">
      <CardContent className="px-0">
        <div className="py-4 pb-2 px-6 flex justify-between">
          <div className="grid gap-3">
            <div>
              <NotebookPen />
            </div>

            <p className="font-semibold">
              Published Services
            </p>
          </div>

          <div className="text-[2.5rem] flex justify-center">
            {total}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 pb-4 text-sm">
        {typeof delta === "number" && (
          <div className="flex gap-2 leading-none font-medium">
            Trending {delta >= 0 ? "up" : "down"} by {delta.toFixed(2)}% {selectedFilter.replace("_", " ")} {delta >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          </div>
        )}
      </CardFooter>
    </Card>
  )
};

export default TotalServicesAdmin;