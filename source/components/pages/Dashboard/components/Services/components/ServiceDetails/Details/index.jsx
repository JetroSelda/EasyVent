import { Card, CardContent } from "@/components/ui/card";
import { Circle, PhilippinePeso, Timer, Users } from "lucide-react";
import { formatCurrencyWithoutSymbol } from "../../../../../../../../api/util";

const Details = ({ property_description = "", highlights = [], amenities = [], packages_list = [] }) => {
  return (
  <>
    <Card className="rounded-lg mb-5">
      <CardContent>
        <p className="font-semibold mb-3">
          Description
        </p>

        <p className="text-gray-500 mb-6">
          {property_description}
        </p>

        
        <div className="flex gap-10">
          <div className={amenities.length > 0 ? "w-[50%]" : ""}>
            <p className="font-semibold mb-3">
              Key Highlights
            </p>

            <ul>
              {highlights.map((item) => (
                <li key={item.title}>
                  <p className="mb-2 flex gap-2">
                    <span className="pt-[0.375rem]"><Circle fill="#183B4E" size={12} /></span>
                    <span>
                      <span className="font-semibold text-[#183B4E]">{item.title}</span> - {item.description}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {amenities.length > 0 && (
            <div className="w-[50%]">
              <p className="font-semibold mb-3">
                Amenities
              </p>

              <ul>
                {amenities.map((item) => (
                  <li key={item}>
                    <p className="mb-2 flex gap-2">
                      <span className="pt-[0.375rem]"><Circle fill="#183B4E" size={12} /></span>
                      <span>
                        {item}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>


      </CardContent>
    </Card>

    <Card className="rounded-lg mb-5">
      <CardContent>
        <p className="font-semibold mb-3">
          Packages
        </p>

        <div className="grid grid-cols-1">
          {packages_list.map((packageItem, index) => (
            <div className="py-2 rounded-sm mb-4">
              <div className="font-semibold mb-1">
                {packageItem.package_name}
              </div>
              <div className="flex gap-10 mb-5">
                <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><PhilippinePeso size={15} /> {formatCurrencyWithoutSymbol("en-US", "PHP", packageItem.price)}</p>
                {packageItem.no_guest && (
                  <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><Users size={15} /> {packageItem.no_guest} Guests</p>
                )}

                {packageItem.duration && (
                  <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><Timer size={15} /> {packageItem.duration} hour(s)</p>
                )}
              </div>

              <p className="font-semibold mb-1">Inclusions</p>
              <ul className="mb-5">
                {packageItem.inclusions.map((inclusion) => (
                  <li className="decoration" key={inclusion}>
                    <div className="flex pl-3 gap-2 items-center">
                      <Circle size={9} fill="#183B4E" /> {inclusion}
                    </div>
                  </li>
                ))}
              </ul>

              {packageItem.meal_sets && (
                <>
                  <p className="font-semibold mb-1">Meal Sets</p>
                  <div className="grid grid-cols-2">
                    {packageItem.meal_sets.map(({ title = "", meals = [] }) => (
                      <ul key={title}>
                        <li className="decoration">
                          <div className="flex pl-3 gap-2 items-center">
                            <Circle size={9} fill="#183B4E" /> {title}
                          </div>

                          <ul>
                            {meals.map((mealItem) => (
                              <li key={mealItem}>
                                <div className="flex pl-6 gap-2 items-center">
                                  <Circle size={9} /> {mealItem}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </>
  )
}

export default Details;