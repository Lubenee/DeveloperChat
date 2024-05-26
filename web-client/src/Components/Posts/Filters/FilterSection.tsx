import { useState } from "react";

import RadioButtonGroup from "../../Core/BrandRadioButton";

const FilterSection = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  const cityOptions = [
    { label: "All", value: "all", available: 30 },
    { label: "New York", value: "new-york", available: 3 },
    { label: "Los Angeles", value: "los-angeles", available: 17 },
    { label: "Chicago", value: "chicago", available: 8 },
    { label: "Houston", value: "houston", available: 2 },
  ];
  return (
    <div className="flex items-center flex-col ">
      <div className="p-4">
        <RadioButtonGroup
          title="City"
          options={cityOptions}
          name="city"
          selectedValue={selectedCity}
          onChange={handleCityChange}
        />
      </div>
      <div>Jobs with payment only</div>
    </div>
  );
};

export default FilterSection;
