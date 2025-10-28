import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/styles';
import "./styles.css";

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import MapPin from "@/assets/images/map_pin.png";
import { Star } from "lucide-react";

const MapLocation = ({ name, geocode, rate, zoom = 12 }) => {
  const customIcon = new Icon({
    iconUrl: MapPin,
    iconSize: [38, 38],
  });

  return (
    <MapContainer center={geocode} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup>
        <Marker position={geocode} icon={customIcon}>
          <Popup>
              <p className="font-title font-bold mb-0 text-[1rem] my-0">
                {name}
              </p>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-orange-300">
                  <Star size={20} fill={rate >= 1 ? "#ffb86a" : "transparent"} />
                  <Star size={20} fill={rate >= 2 ? "#ffb86a" : "transparent"} />
                  <Star size={20} fill={rate >= 3 ? "#ffb86a" : "transparent"} />
                  <Star size={20} fill={rate >= 4 ? "#ffb86a" : "transparent"} />
                  <Star size={20} fill={rate === 5 ? "#ffb86a" : "transparent"} />
                </div>

                <span>37 Reviews</span>

              </div>
          </Popup>
        </Marker>
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default MapLocation;