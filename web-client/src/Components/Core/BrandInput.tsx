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
      className="w-full px-4 py-2 border rounded-md focus:border-indigo-500"
      {...props}
    />
  );
};
