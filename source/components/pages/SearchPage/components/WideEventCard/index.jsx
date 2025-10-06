import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, Heart, MapPin, MapPinned, PhilippinePeso, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

function formatCurrencyWithoutSymbol(locale, currency, value) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'code'
  })
    .format(value)
    .replace(currency, '')
    .trim();
}

const WideEventCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card className="p-0 my-5 w-[95%]">
      <CardContent className="flex aspect-square gap-5 p-4 h-[15rem] w-full">
        <div className="rounded-md overflow-hidden h-full w-[20rem]">
          <img src={item.image} className="h-full w-full" />
        </div>

        <div className="flex flex-col w-[50%]">
          <p className="font-title text-[1.2rem] font-bold pb-3 whitespace-nowrap max-w-[90%] overflow-hidden text-ellipsis">{item.name}</p>
          <div className="text-[1rem] mb-2 flex gap-2 items-center">
            <MapPinned strokeWidth={1} size={16} />
            <span title={item.location} className="whitespace-nowrap max-w-[85%] overflow-hidden text-ellipsis">{item.location}</span>
          </div>
          <div className="text-[1rem] flex gap-2 items-center mb-2"><PhilippinePeso strokeWidth={1} size={16} /> {formatCurrencyWithoutSymbol("en-US", "PHP", item.price)}</div>
          <div className="text-[1rem] flex gap-2 items-center"><Users strokeWidth={1} size={16} />{item.pax} {item.paxMax && item.paxMax !== item.pax ? `- ${item.paxMax}` : ""} Pax</div>

          <div className="flex items-center gap-3 py-3 text-orange-300">
            <Star size={16} fill={item.rate >= 1 ? "#ffb86a" : "transparent"} />
            <Star size={16} fill={item.rate >= 2 ? "#ffb86a" : "transparent"} />
            <Star size={16} fill={item.rate >= 3 ? "#ffb86a" : "transparent"} />
            <Star size={16} fill={item.rate >= 4 ? "#ffb86a" : "transparent"} />
            <Star size={16} fill={item.rate === 5 ? "#ffb86a" : "transparent"} />

            <span className="text-black text-[0.85rem]">37 reviews</span>
          </div>

          <div className="flex mt-auto justify-between">
            <Button variant="outline" className="rounded-full w-[2.3rem] h-[2.3rem]">
              <Heart strokeWidth={item.liked ? 0 : 2} fill={item.liked ? "#ff7b7b" : "transparent"} />
            </Button>
            <Button className="w-[10rem] mt-auto ml-auto" onClick={() => navigate("/servicehotel", { state: { id: item.id } })}>Book Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
};

export default WideEventCard;