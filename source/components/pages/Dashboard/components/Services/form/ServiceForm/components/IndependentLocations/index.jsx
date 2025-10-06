import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FilterableSelect from "@/components/ui/FilterableInput";
import MapPin from "@/assets/images/map_pin.png";

import { MapPinCheck, Pin } from "lucide-react";
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/styles';
import "./styles.css";

const DeteckClick = ({ onClick }) => {
  useMapEvents({
    click: (e) => {
      onClick([e.latlng.lat, e.latlng.lng]);
    }
  })
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

const LocationForm = ({ index, defaultValues = {}, onCreate, onUpdate, setEnabledForm, setSelectedIndex }) => {
  const [locationState, setLocationState] = useState(defaultValues);
  const [provincesList, setProvcesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [barangayList, setBarangayList] = useState([]);

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

      return updated;
    });
  };

  const handleSelectCity = (code, name) => {
    fetchBarangays(code);
    setLocationState((prev) => {
      const updated = ({ ...prev, city: name });

      return updated;
    });
  };

  const handleSelectBarangay = (code, name) => {
    setLocationState((prev) => {
      const updated = ({ ...prev, barangay: name });

      return updated;
    });
  };

  const handleGeocodeChange = (geocode) => {
    setLocationState((prev) => {
      const updated = ({ ...prev, geocode: geocode });

      return updated;
    });
  }

  const handleSubmit = () => {
    if (onCreate) {
      onCreate(locationState);
    }

    if (onUpdate) {
      onUpdate(index, locationState)
    }

    closeForm();
  }

  const closeForm = () => {
    setEnabledForm(false);
    setSelectedIndex(null);
  }

  useEffect(() => {
    if (provincesList.length > 0) return;

    fetchProvinces();
  }, [provincesList]);

  useEffect(() => {
    if (defaultValues.province && provincesList.length && citiesList.length === 0) {
      const selectedCode = provincesList.find((item) => item.name === defaultValues.province)?.code;

      if (!selectedCode) return;

      fetchCities(selectedCode);
    }
  }, [defaultValues, provincesList, citiesList]);

  useEffect(() => {
    if (defaultValues.city && citiesList.length && barangayList.length === 0) {
      const selectedCode = citiesList.find((item) => item.name === defaultValues.city)?.code;

      if (!selectedCode) return;

      fetchBarangays(selectedCode);
    }
  }, [defaultValues, citiesList, barangayList]);

  const formattedProvinces = provincesList.map((item) => {
    return { value: item.code, label: item.name };
  });

  const formattedCities = citiesList.map((item) => ({
    value: item.code, label: item.name,
  }));

  const formattedBarangays = barangayList.map((item) => ({
    value: item.code, label: item.name,
  }));

  return (
    <div onClick={closeForm} className="fixed top-0 left-0 w-[100vw] h-[100vh] px-[10rem] py-10 bg-[#000000AA] backdrop-blur-xs z-[20]">
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

                    return updated;
                  });
                }}
              />
            </div>

            <Button type="button" onClick={handleSubmit}>Save Location</Button>
          </form>
        </div>
        <div className="w-[70%] h-full">
          <MapLocationSelector onChange={handleGeocodeChange} geocode={geocode} />
        </div>
      </div>
    </div>
  )
}

const IndependentLocations = ({ defaultValues = [], updateFormState }) => {
  const [locationsState, setLocationState] = useState([]);
  const [enabledForm, setEnabledForm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const hasSelectedItem = typeof selectedIndex === "number";

  useEffect(() => {
    if (JSON.stringify(defaultValues) === JSON.stringify(locationsState)) return;

    setLocationState(defaultValues);
  }, [defaultValues]);

  const openLocationForm = () => {
    setEnabledForm(true);
  }

  const createLocation = (location) => {
    setLocationState((prev) => {
      const updated = [...prev, location];

      updateFormState("independent_locations", updated);

      return updated;
    });
  };

  const deleteLocation = (index, event) => {
    event.stopPropagation();
    setLocationState((prev) => {
      const copy = [...prev];

      copy.splice(index, 1);

      return copy;
    });
  }

  const updateLocation = (index, location) => {
    setLocationState((prev) => {
      const copy = [...prev];

      copy.splice(index, 1, location);

      return copy;
    });
  }

  const formatLocation = (locationItem) => {
    const { building_no, street, barangay, city, province, zip_code } = locationItem;

    return `${[building_no, street, barangay, city, province].filter(Boolean).join(", ")} ${zip_code ?? ""}`;
  }

  console.log("Current Locations", locationsState)

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5  text-[1.15rem] flex justify-between">
          <span>
            Covered Locations
          </span>

          <Button variant="ghost" onClick={openLocationForm} type="button"><CirclePlus /></Button>
        </p>

        {locationsState.map((locationItem, index) => (
          <div className="flex gap-2 items-center p-2 cursor-pointer" key={index} onClick={() => setSelectedIndex(index)}>
            <MapPinCheck />

            <Input readOnly defaultValue={formatLocation(locationItem)} />

            <Button variant="icon" type="button" onClick={(event) => deleteLocation(index, event)}><Trash /></Button>
          </div>
        ))}

        {(enabledForm || hasSelectedItem) && (
          <LocationForm
            onCreate={enabledForm ? createLocation : undefined}
            index={selectedIndex}
            defaultValues={hasSelectedItem ? locationsState[selectedIndex] : undefined}
            onUpdate={hasSelectedItem ? updateLocation : undefined}
            setEnabledForm={setEnabledForm}
            setSelectedIndex={setSelectedIndex}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default IndependentLocations;