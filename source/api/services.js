const getPublishedServices = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/services/publishServices.php`);

  const json = await res.json();

  const { data } = json;

  if (!data) return [];

  const parsedServices = data.services.map((service) => ({
    ...service,
    amenities: JSON.parse(service.amenities ?? "[]"),
    highlights: JSON.parse(service.highlights ?? "[]"),
    images_url: JSON.parse(service.images_url ?? "[]"),
    packages_list: JSON.parse(service.packages_list ?? "[]"),
    location: JSON.parse(service.location ?? "{}"),
    skills: JSON.parse(service.skills ?? "[]"),
    experiences: JSON.parse(service.experiences ?? "[]"),
    independent_locations: JSON.parse(service.independent_locations ?? "[]"),
  }));

  return parsedServices ?? [];
};

const getServiceData = async (id) => {
  const formData = new FormData();

  formData.append("id", id);

  const res = await fetch(`${import.meta.env.VITE_API_URL}/services/service.php`, {
    method: "POST",
    body: formData,
  });

  const json = await res.json();

  const { data = {} } = json;

  if (!data.service) return {};

  const { service = {} } = data;

  const parsedService = {
    ...service,
    amenities: JSON.parse(service.amenities ?? "[]"),
    highlights: JSON.parse(service.highlights ?? "[]"),
    images_url: JSON.parse(service.images_url ?? "[]"),
    packages_list: JSON.parse(service.packages_list ?? "[]"),
    location: JSON.parse(service.location ?? "{}"),
    skills: JSON.parse(service.skills ?? "[]"),
    experiences: JSON.parse(service.experiences ?? "[]"),
    independent_locations: JSON.parse(service.independent_locations ?? "[]"),
    contacts: JSON.parse(service.contacts ?? "[]"),
    required_documents: JSON.parse(service.required_documents ?? "[]"),
  }

  return parsedService;
};

export { getPublishedServices, getServiceData };