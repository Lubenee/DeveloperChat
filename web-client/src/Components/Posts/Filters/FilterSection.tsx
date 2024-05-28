import { useState } from "react";

import RadioButtonGroup from "../../Core/BrandRadioButton";
import { city } from "../../../types/shared-types";

interface Props {
  availableCities: city[];
  setCityFilter: (newVal: city) => void;
}

const FilterSection = ({ availableCities, setCityFilter }: Props) => {
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    const newCity = availableCities.find((city) => city.value == value);
    if (!newCity) return; //todo - make an appropriate error
    setCityFilter(newCity);
  };

  return (
    <div className="flex items-center flex-col ">
      <div className="p-4">
        <RadioButtonGroup
          title="City"
          options={availableCities}
          name="city"
          selectedValue={selectedCity}
          onChange={handleCityChange}
        />
        <hr />
      </div>
      <div className="text-center">
        Jobs with payment only <br /> (Not Implemented)
      </div>
    </div>
  );
};

export default FilterSection;
