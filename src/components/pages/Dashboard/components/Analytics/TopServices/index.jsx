import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useMemo, useState } from "react";

const chartConfig = {
  label: {
    color: "var(--background)",
  },
}

function TopServices() {
  const [bookings, setBookings] = useState([]);

  const data = useMemo(() => {
    if (bookings.length === 0) return [];

    const map = new Map();
    bookings.forEach(obj => {
      if (!map.has(obj.id_service)) {
        map.set(obj.id_service, { id: obj.id_service, name: obj.property_name });
      }
    });
    const distinctServices = Array.from(map.values());

    const list = distinctServices.map((item) => {
      const count = bookings.filter((booking) => booking.id_service === item.id)?.length ?? 0;

      return { item: item.name, item_count: count, fill: "var(--chart-2)" }
    });

    list.sort((a, b) => b.item_count - a.item_count);

    return list.slice(0, 10);
  }, [bookings]);

  console.log("Admin Bookings [0]", data);
  
  const initiateData = (userData) => {
    const formData = new FormData();

    formData.append("userId", userData.id);

    fetch(`${import.meta.env.VITE_API_URL}/stats/allBookingsAdmin.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setBookings(data?.bookings ?? []);
      })
  }

  console.log("All Bookings", bookings);

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (!userData) return;

    const parsedData = JSON.parse(userData ?? "");

    if (!parsedData) return;

    initiateData(parsedData);
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leading Services</CardTitle>
        <CardDescription>Showing trending services across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="item"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="item_count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="item_count"
              layout="vertical"
              fill="var(--color-item_count)"
              radius={4}
            >
              <LabelList
                dataKey="item"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="item_count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TopServices;