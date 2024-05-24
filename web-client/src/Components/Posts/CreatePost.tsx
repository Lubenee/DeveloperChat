import { ChangeEvent, useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Core/BrandButton";
import { PostCreateDto } from "../../types/posts/post-model";

interface StepProps {
  formData: PostCreateDto;
  setFormData: (newVal: PostCreateDto) => void;
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  onSubmit?: () => void;
}

const Step1 = ({ formData, setFormData, onNextStep }: StepProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // Destructure the event object to get the name and value of the input field
    const { name, value } = event.target;
    // ex: ['title'] = value;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    // Destructure the event object to get the name and value of the input field
    const { name, value } = event.target;
    // ex: ['title'] = value;
    setFormData({ ...formData, [name]: value });
  };
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (formData.title == "" || formData.description == "")
      setDisableNext(true);
    else setDisableNext(false);
  }, [formData.title, formData.description]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-start flex-col">
      <h2 className="text-xl font-semibold mb-4">
        Step 1: Choose Title and Description
      </h2>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChangeInput}
        placeholder="Enter title"
        required
        className="mb-4 p-2 rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter description"
        required
        className="mb-4 p-2 border border-gray-300 rounded"
        rows={4}
      />
      <PrimaryButton disabled={disableNext} onClick={onNextStep} type="button">
        Next
      </PrimaryButton>
    </div>
  );
};

const Step2 = ({
  formData,
  setFormData,
  onNextStep,
  onPreviousStep,
}: StepProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (formData.company == "") setDisableNext(true);
    else setDisableNext(false);
  }, [formData.company]);

  return (
    <div className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4 flex justify-start flex-col">
      <h2 className="text-xl font-semibold mb-4">
        Step 2: Provide Company Information
      </h2>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Enter company name"
        required
        className="mb-4 p-2 rounded"
      />
      <div className="flex items-center justify-between">
        <SecondaryButton onClick={onPreviousStep}>Previous</SecondaryButton>
        <PrimaryButton
          type="button"
          onClick={onNextStep}
          disabled={disableNext}>
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

const Step3 = ({
  formData,
  setFormData,
  onPreviousStep,
  onNextStep,
}: StepProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the first selected file
    if (file) {
      // Process the selected file (e.g., upload to server, display preview, etc.)
      // Here, you can update the form data with the selected image file
      setFormData({ ...formData, image: file });
    }
  };

  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (formData.location == "" || formData.image == null) setDisableNext(true);
    else setDisableNext(false);
  }, [formData.location, formData.image]);

  return (
    <div className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4  flex justify-start flex-col">
      <h2>Step 3: Specify Location and Set Company Image</h2>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Enter location"
        required
        className="mt-4 mb-2 p-2  rounded"
      />
      <input
        type="file" // Change the type to "file"
        name="image"
        onChange={handleImageChange} // Define a new handler for image change
        accept="image/*" // Specify accepted file types (in this case, any image type)
        className="mt-2 mb-4 p-2 rounded"
      />
      {formData.image && (
        <img
          className="h-auto w-128 mb-2"
          src={URL.createObjectURL(formData.image)}
          alt="Uploaded"
        />
      )}

      <div className="flex items-center justify-between">
        <SecondaryButton onClick={onPreviousStep}>Previous</SecondaryButton>
        <PrimaryButton
          type="button"
          onClick={onNextStep}
          disabled={disableNext}>
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

interface FinalProps {
  onPreviousStep: () => void;
}

const FinalStep = ({ onPreviousStep }: FinalProps) => {
  return (
    <div className="flex justify-center flex-col">
      Thank you
      <PrimaryButton onClick={onPreviousStep}>Previous</PrimaryButton>
    </div>
  );
};

interface Props {
  step: number;
  setStep: (newStep: number) => void;
  setNewPost: (newPost: PostCreateDto) => void;
}

const CreatePostWizard = ({ step, setStep, setNewPost }: Props) => {
  const [formData, setFormData] = useState<PostCreateDto>({
    title: "",
    description: "",
    company: "",
    date: new Date(),
    location: "",
    image: null,
  });

  const handleNextStep = () => {
    setStep(step + 1);
    setNewPost(formData);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          onNextStep={handleNextStep}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          setFormData={setFormData}
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
        />
      )}
      {step === 4 && <FinalStep onPreviousStep={handlePreviousStep} />}
    </div>
  );
};

export default CreatePostWizard;
