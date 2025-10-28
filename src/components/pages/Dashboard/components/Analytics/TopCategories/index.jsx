"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"

const chartData = [
  { month: "Function Hall", item_count: 186 },
  { month: "Restaurant", item_count: 305 },
  { month: "Independent Providers", item_count: 237 },
  { month: "Hotel/Resort", item_count: 273 },
]

const chartConfig = {
  item_count: {
    label: "Services",
    color: "var(--chart-1)",
  },
}

function TopCategories() {
  const [data, setData] = useState([]);
  const initiateData = (userData) => {
    const formData = new FormData();

    formData.append("userId", userData.id);

    fetch(`${import.meta.env.VITE_API_URL}/stats/totalServicesAdmin.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        const services = data?.services ?? [];
        
        const categories = ["Function Hall", "Restaurant", "Independent Provider", "Hotel/Resort"];

        const chartServices = categories.map((item) => {
          const servicesCount = services.filter((servc) => servc.category === item)?.length ?? 0;

          return { month: item, item_count: servicesCount };
        });

        setData(chartServices);
      });
  }

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (!userData) return;

    const parsedData = JSON.parse(userData ?? "");

    if (!parsedData) return;

    initiateData(parsedData);
  }, []);

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Leading Categories</CardTitle>
        <CardDescription>
          Showing total services per categories
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-[4/3] max-h-[250px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="item_count"
              fill="var(--color-item_count)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TopCategories