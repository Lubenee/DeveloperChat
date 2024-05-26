interface Props {
  value: any;
  setValue: (newValue: any) => void;
  [key: string]: any;
}

export const BrandInput = ({ value, setValue, ...props }: Props) => {
  return (
    <input
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:border-indigo-600"
      {...props}
    />
  );
};

export const BrandSearchInput = ({ value, setValue, ...props }: Props) => {
  return (
    <input
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
      className="w-full border-none rounded-md px-4 py-3 focus:outline-none bg-gray-100"
      {...props}
    />
  );
};
