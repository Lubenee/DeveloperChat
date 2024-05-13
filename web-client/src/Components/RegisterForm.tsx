import React, { useState } from "react";

interface DynamicFormProps {
  fields: string[];
  onSubmit: (data: { [key: string]: string }) => void;
}

const DynamicForm = ({ fields, onSubmit }: DynamicFormProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = ev.target;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((fieldName, index) => (
        <div key={index} className="mb-4">
          <label
            htmlFor={fieldName}
            className="block text-sm font-medium text-gray-700">
            {fieldName}
          </label>
          <input
            id={fieldName}
            name={fieldName}
            type="text"
            value={formData[fieldName] || ""}
            onChange={(e) => handleChange(e, fieldName)}
            className="mt-1 p-2 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md"
          />
        </div>
      ))}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
