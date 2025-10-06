import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import EventCard from "../EventCard";

const Slider = ({ list }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[100%] min-h-[12rem]"
    >
      <CarouselContent>
        {list.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <EventCard item={item} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;