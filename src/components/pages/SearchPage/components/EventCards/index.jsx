import WideEventCard from "../WideEventCard";

const EventCards = ({ list, handleBookmark }) => {
  return (
    <div className="w-full md:w-[65%]">
      {list.map((item) => <WideEventCard handleBookmark={handleBookmark} key={item.name} item={item} />)}
    </div>
  )
};

export default EventCards;