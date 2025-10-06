import FooterSection from "../../custom-ui/Footer";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import EventCards from "./components/EventCards";

import Filters from "./components/Filters";
import SearchSection from "./components/SearchSection";
import { useEffect, useState } from "react";
import NearByMap from "./components/NearyByMap";
import { getPublishedServices } from "../../../api/services";

const getTime = (date) => (new Date(date)).getTime();

const filterList = (list, searchState) => {
  const filteredList = [];
   const { date_range = {}, location = "", pax = "", time, budget_range } = searchState;

  if (!date_range?.to && !location && !pax && !budget_range) return list;

  list.forEach((item) => {
   let searchPoints = 0;
   
   const [minPax, maxPax] = pax.split("-") || [0, 0];

   if (location && item.location.toLowerCase().includes(location.toLowerCase())) searchPoints += 1;

   if (item.pax >= minPax && item.pax <= maxPax) searchPoints += 1;

    if (date_range.from && date_range.to && item.date_availability.some((avail) => {
      const startDate = date_range.from.getTime();
      const endDate = date_range.to.getTime();

      const availTime = getTime(avail);

      return availTime >= startDate && availTime <= endDate;
    })) searchPoints += 1;

    
    if (budget_range) {
      const [minBudget, maxBudget] = budget_range;

      searchPoints += item.price >= minBudget && item.price <= maxBudget ? 1 : 0;
    }

    if (searchPoints === 0) return;

    filteredList.push({...item, searchPoints });
  });

  filteredList.sort((a, b) => b.searchPoints - a.searchPoints);

  return filteredList;
};

const sortList = (list, sortBy) => {
  const copy = [...list];

  copy.sort((a, b) => {
    if (sortBy === "price") return a[sortBy] - b[sortBy];

    return b[sortBy] - a[sortBy]
  });

  console.log("Sorted", copy, sortBy, copy.sort((item) => item.price - item.price))

  return copy;
}

const SearchPage = () => {
  const [searchState, setSearchState] = useState({
    location: "",
    date_range: {},
    time: "",
    pax: ""
  });
  const [serviceTypes, setServiceTypes] = useState(["Hotel/Resort", "Restaurant", "Function Hall"]);

  const [servicesState, setServicesState] = useState([]);
  const maxPrices = [50000];

  const mappedServices = servicesState.map((item) => {
    const { property_name, images_url = [], packages_list = [], location = {}  } = item;
    const { geocode, province, city, barangay, street, building_no, zip_code } = location;

    const formattedLoc = [building_no, street, barangay, city, province].filter(Boolean).join(", ");

    const prices = packages_list.map((item) => item.price);
    const pax = packages_list.map((item) => item.no_guest);

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const paxMin = Math.min(...pax);
    const paxMax = Math.max(...pax);
    maxPrices.push(maxPrice);

    return ({
      name: property_name,
      image: `${import.meta.env.VITE_API_URL}/uploads/${images_url[0]}`,
      price: minPrice,
      location: `${formattedLoc} ${zip_code}`,
      rate: 0,
      pax: paxMin,
      paxMax,
      date_availability: [],
      geocode,
      id: item.id,
      minPrice,
      maxPrice,
      category: item.category,
    });
  });

  const toggleType = (type) => {
    setServiceTypes((prev) => prev.includes(type) ? prev.filter(item => item !== type) : [...prev, type]);
  }

  const initiateServices = async () => {
    const list = await getPublishedServices();
    setServicesState(list);
  }

  useEffect(() => {
    initiateServices();
  }, []);

  const [sortBy, setSortBy] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const [mapEnabled, setMapEnabled] = useState();

  const filteredList = filterList(mappedServices, searchState)
    .filter((item) => serviceTypes.includes(item.category))
    .filter(item => item.name.toLowerCase().includes(nameFilter.toLowerCase()));

  const sortedList = sortBy ? sortList(filteredList, sortBy) : filteredList;

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />
      
      <SearchSection setSearchState={setSearchState} sortBy={sortBy} setSortBy={setSortBy} />
      <div className="flex gap-[1rem] px-2 md:px-[10rem]">
        <EventCards list={[...sortedList]} />

        <Filters toggleType={toggleType} serviceTypes={serviceTypes} maxPrice={Math.max(...maxPrices)} setNameFilter={setNameFilter} setMapEnabled={setMapEnabled} eventList={sortedList} setSearchState={setSearchState} />
      </div>
      <FooterSection />

      {mapEnabled && (
        <div onClick={() => setMapEnabled(false)} className="fixed top-0 left-0 w-[100vw] h-[100vh] px-[10rem] py-10 bg-[#000000AA] backdrop-blur-xs z-[10]">
          <div onClick={(event) => event.stopPropagation()} className="h-full">
            <NearByMap eventList={sortedList} />
          </div>
        </div>)}
    </div>
  )
};

export default SearchPage;