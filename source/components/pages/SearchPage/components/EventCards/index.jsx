import WideEventCard from "../WideEventCard";

const EventCards = ({ list }) => {
  return (
    <div className="w-full md:w-[65%]">
      {list.map((item) => <WideEventCard key={item.name} item={item} />)}
    </div>
  )
};

export default EventCards;