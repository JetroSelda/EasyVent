import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EventCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Card className="p-0">
      <CardContent className="flex flex-col aspect-square p-4 h-[26rem]">
        <div className="rounded-md overflow-hidden h-[10rem]">
          <img src={item.image} className="h-full w-full" />
        </div>

        <p className="font-title text-[1.2rem] font-bold py-3">{item.name}</p>
        <div className="text-[1rem]">{item.location}</div>
        <div className="flex items-center gap-3 py-3 text-orange-300">
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />

          <span className="text-black text-[0.85rem]">0 review(s)</span>
        </div>

        <Button className="w-full mt-auto" onClick={() => {
          if (item.category !== "Independent Provider") {
            return navigate("/servicehotel", { state: { id: item.id }});
          }

          navigate("/independentservice", { state: { id: item.id }})
        }}>Book Now</Button>
      </CardContent>
    </Card>
  )
};

export default EventCard;