import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/styles';
import "./styles.css";

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import MapPin from "@/assets/images/map_pin.png";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NearByMap = ({ eventList = [], zoom = 12 }) => {
  const navigate = useNavigate();
  const markers = eventList.map((item) => ({ ...item, popUp: item.name }));

  const customIcon = new Icon({
    iconUrl: MapPin,
    iconSize: [38, 38],
  });

  console.log("Event List", eventList)

  return (
    <MapContainer center={[9.7721484,118.7521077]} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup>
        {markers.map((item) => (
          <Marker position={item.geocode} icon={customIcon}>
            <Popup>
              <p className="font-title font-bold mb-0 text-[1rem] my-0">
                {item.popUp}
              </p>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-orange-300">
                  <Star size={20} fill={item.rate >= 1 ? "#ffb86a" : "transparent"} />
                  <Star size={20} fill={item.rate >= 2 ? "#ffb86a" : "transparent"} />
                  <Star size={20} fill={item.rate >= 3 ? "#ffb86a" : "transparent"} />
                  <Star size={20} fill={item.rate >= 4 ? "#ffb86a" : "transparent"} />
                  <Star size={20} fill={item.rate === 5 ? "#ffb86a" : "transparent"} />
                </div>

                <Button onClick={() => navigate("/servicehotel", { state: item })} className="bg-[#183B4E]">View Details</Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default NearByMap;