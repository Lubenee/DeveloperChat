import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

interface Props {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  available?: number;
  onChange: (value: string) => void;
}

const BrandRadioButton = ({
  label,
  name,
  value,
  checked,
  onChange,
  available,
}: Props) => {
  return (
    <div className="shadow-md m-0.5">
      <label className="cursor-pointer flex flex-row justify-between items-center">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="hidden"
        />
        <span className="w-5 h-5 mr-3 flex items-center justify-center">
          {checked && <RadioButtonCheckedIcon fontSize="small" />}
          {!checked && <RadioButtonUncheckedIcon fontSize="small" />}
        </span>
        <div className="flex-1 flex items-center">
          <span className="font-medium text-gray-400 text-left">{label}</span>
        </div>
        <div className="text-gray-400 font-medium">{available}</div>
      </label>
    </div>
  );
};

interface RadioButtonGroupProps {
  title: string;
  options: { label: string; value: string; available: number }[];
  name: string;
  onChange: (value: string) => void;
  selectedValue: string;
}

const RadioButtonGroup = ({
  title,
  options,
  name,
  onChange,
  selectedValue,
}: RadioButtonGroupProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="mb-4 border rounded-lg shadow-md p-1 min-w-48">
      <div
        className="flex justify-between align-middle items-center"
        onClick={handleToggleCollapse}>
        <h3 className="font-semibold text-lg text-gray-300 mh-2">{title}</h3>
        <button type="button" className=" mh-2">
          {isCollapsed ? (
            <ExpandMoreIcon fontSize="small" />
          ) : (
            <ExpandLessIcon fontSize="small" />
          )}
        </button>
      </div>
      {!isCollapsed &&
        options.map((option) => (
          <BrandRadioButton
            key={option.value}
            label={option.label}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            available={option.available}
          />
        ))}
    </div>
  );
};

export default RadioButtonGroup;
