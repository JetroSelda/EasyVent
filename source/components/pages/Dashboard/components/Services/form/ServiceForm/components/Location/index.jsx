import { Card, CardContent } from "@/components/ui/card";
import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/styles';
import "./styles.css";

import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";

import MapPin from "@/assets/images/map_pin.png";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterableSelect from "@/components/ui/FilterableInput";
import { MapPinCheck, Pin } from "lucide-react";

const DeteckClick = ({ onClick }) => {
  useMapEvents({
    click: (e) => {
      onClick([e.latlng.lat, e.latlng.lng]);
    }
  })
}

const MiniMap = ({ name, geocode, zoom = 12 }) => {
  const customIcon = new Icon({
    iconUrl: MapPin,
    iconSize: [38, 38],
  });

  const defaultGeocode = [9.794839,118.7132215]

  return (
    <MapContainer center={geocode ?? defaultGeocode} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        {geocode && (
          <Marker position={geocode} icon={customIcon}>
          </Marker>
        )}
    </MapContainer>
  )
}

const MapLocationSelector = ({ geocode, zoom = 15, onChange }) => {
  const customIcon = new Icon({
    iconUrl: MapPin,
    iconSize: [38, 38],
  });

  const defaultGeocode = [9.794839,118.7132215];

  return (
    <MapContainer center={geocode ?? defaultGeocode} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        {geocode && (
          <Marker position={geocode} icon={customIcon}>
          </Marker>
        )}

        <DeteckClick onClick={onChange} />
    </MapContainer>
  )
}

const LocationForm = ({ defaultValues = {}, updateFormState }) => {
  const [enabledForm, setEnabledForm] = useState(false);
  const [locationState, setLocationState] = useState(defaultValues);
  const [provincesList, setProvcesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

  useEffect(() => {
    setLocationState(defaultValues);
  }, [defaultValues]);

  const { province, city, barangay, street, building_no, zip_code, geocode } = locationState;

  const fetchProvinces = async () => {
    const res = await fetch('https://psgc.cloud/api/provinces');

    const json = await res.json();

    setProvcesList(json);
  }

  const fetchCities = async (code) => {
    if (!code) return;

    const res = await fetch(`https://psgc.cloud/api/provinces/${code}/cities-municipalities`);

    const json = await res.json();
    setCitiesList(json);
  }

  const fetchBarangays = async (code) => {
    if (!code) return;

    const res = await fetch(`https://psgc.cloud/api/cities-municipalities/${code}/barangays`);

    const json = await res.json();
    setBarangayList(json);
  }

  const handleSelectProvince = (code, name) => {
    fetchCities(code);
    setLocationState((prev) => {
      const updated = ({ ...prev, province: name });

      updateFormState("location", updated);

      return updated;
    });
  };

  const handleSelectCity = (code, name) => {
    fetchBarangays(code);
    setLocationState((prev) => {
      const updated = ({ ...prev, city: name });

      updateFormState("location", updated);

      return updated;
    });
  };

  const handleSelectBarangay = (code, name) => {
    setLocationState((prev) => {
      const updated = ({ ...prev, barangay: name });

      updateFormState("location", updated);

      return updated;
    });
  };

  const handleGeocodeChange = (geocode) => {
    setLocationState((prev) => {
      const updated = ({ ...prev, geocode: geocode });

      updateFormState("location", updated);

      return updated;
    });
  }

  useEffect(() => {
    fetchProvinces();
  }, []);

  const formattedProvinces = provincesList.map((item) => {
    return { value: item.code, label: item.name };
  });

  const formattedCities = citiesList.map((item) => ({
    value: item.code, label: item.name,
  }));

  const formattedBarangays = barangayList.map((item) => ({
    value: item.code, label: item.name,
  }));

  const address = ["Philippines", province, city, barangay, street, building_no, zip_code].filter(Boolean);

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5 text-[1.15rem]">Location</p>

        <div className=" relative rounded-sm overflow-hidden h-[15rem] mb-5">
          <MiniMap geocode={geocode} />

          <div onClick={() => setEnabledForm(true)} className="opacity-0 cursor-pointer hover:opacity-100 absolute top-0 left-0 w-full h-full z-[4] bg-[#000000AA] text-white flex items-center justify-center">
            Update Current Location
          </div>
        </div>

        {address.length > 1 && <p className="flex items-center gap-5"><MapPinCheck size={40} /> {address.join(", ")}</p>}
      </CardContent>

      {enabledForm && (
        <div onClick={() => setEnabledForm(false)} className="fixed top-0 left-0 w-[100vw] h-[100vh] px-[10rem] py-10 bg-[#000000AA] backdrop-blur-xs z-[20]">
          <div onClick={(event) => event.stopPropagation()} className="h-full bg-white rounded-sm flex">
            <div className="w-[30%] h-full py-5 px-5 overflow-auto">
              <p className="mb-1 font-semibold text-[1.2rem]">Location Form</p>
              <p className="mb-5 text-gray-500 text-[0.9rem]">Please fill in your address and navigate your pin location through the map.</p>

              <form>
                <div className="grid gap-3 mb-4">
                  <Label htmlFor="country">
                    Country
                  </Label>
                  <Input defaultValue="Philippines" readOnly />
                </div>

                <div className="grid gap-3 mb-4">
                  <Label htmlFor="province">
                    Province
                  </Label>
                  <FilterableSelect defaultValue={province} placeholder="Select Provice" onChange={handleSelectProvince} list={formattedProvinces} />
                </div>

                <div className="grid gap-3 mb-4">
                  <Label htmlFor="city">
                    City
                  </Label>
                  <FilterableSelect defaultValue={city} placeholder="Select City" onChange={handleSelectCity} list={formattedCities} />
                </div>

                <div className="grid gap-3 mb-4">
                  <Label htmlFor="barangay">
                    Barangay
                  </Label>
                  <FilterableSelect defaultValue={barangay} placeholder="Select Barangay" onChange={handleSelectBarangay} list={formattedBarangays} />
                </div>
                
                <div className="grid gap-3 mb-4">
                  <Label htmlFor="street">
                    Street
                  </Label>
                  <Input
                    id="street"
                    defaultValue={street}
                    onChange={(event) => {
                      setLocationState((prev) => {
                        const updated = ({ ...prev, street: event.target.value });

                        updateFormState("location", updated);

                        return updated;
                      })
                    }} />
                </div>
                
                <div className="grid gap-3 mb-4">
                  <Label htmlFor="building">
                    Building/floor/unit number (optional)
                  </Label>
                  <Input
                    id="building"
                    defaultValue={building_no}
                    onChange={(event) => {
                      setLocationState((prev) => {
                        const updated = ({ ...prev, building_no: event.target.value });

                        updateFormState("location", updated);

                        return updated;
                      })
                    }} />
                </div>
                
                <div className="grid gap-3 mb-4">
                  <Label htmlFor="zip_code">
                    Zip/Postal Code
                  </Label>
                  <Input
                    id="zip_code"
                    defaultValue={zip_code}
                    onChange={(event) => {
                      setLocationState((prev) => {
                        const updated = ({ ...prev, zip_code: event.target.value });

                        updateFormState("location", updated);

                        return updated;
                      });
                    }}
                  />
                </div>

                <Button type="button" onClick={() => setEnabledForm(false)}>Save Location</Button>
              </form>
            </div>
            <div className="w-[70%] h-full">
              <MapLocationSelector onChange={handleGeocodeChange} geocode={geocode} />
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default LocationForm;