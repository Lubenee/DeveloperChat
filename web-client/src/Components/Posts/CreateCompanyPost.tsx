import { ChangeEvent, useEffect, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../Core/BrandButton";
import { PostCreateDto } from "../../types/posts/post-model";
import CustomError from "../Core/CustomError";

interface StepProps {
  formData: PostCreateDto;
  setFormData: React.Dispatch<React.SetStateAction<PostCreateDto>>;
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  onSubmit?: () => void;
  disablePostButton?: (newVal: boolean) => void;
  setNewPost?: (newVal: PostCreateDto) => void;
}

const Step1 = ({ formData, setFormData, onNextStep }: StepProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // Destructure the event object to get the name and value of the input field
    const { name, value } = event.target;
    // ex: ['title'] = value;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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

const Step3 = ({ setFormData, onNextStep, onPreviousStep }: StepProps) => {
  const [disableNext] = useState(false);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);

  const handleRequirementChange = (index: number, value: string) => {
    if (value == "") {
      setError("Can't have empty requirement.");
      return;
    }
    setError(null); // Clear error if value is not empty
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const handleAddRequirement = () => {
    if (requirements[requirements.length - 1] == "") {
      setError("Can't have empty requirements.");
      return;
    }
    setError(null); // Clear error if adding a new advantage
    setRequirements([...requirements, ""]);
  };

  const handleNextStep = () => {
    setFormData((prevForm: PostCreateDto) => ({
      ...prevForm,
      requirements: requirements,
    }));

    if (onNextStep) onNextStep();
  };

  return (
    <div className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4 flex justify-start flex-col">
      <h2 className="text-xl font-semibold mb-4">Step 3: Requirements</h2>
      <form>
        {requirements.map((requirement, index) => (
          <div key={index} className="mb-2 flex">
            <input
              type="text"
              value={requirement}
              onChange={(e) => handleRequirementChange(index, e.target.value)}
              className="flex-grow border border-gray-300 rounded-md py-2 px-3 mr-2"
              placeholder={`Requirement ${index + 1}`}
            />
            {index === requirements.length - 1 && (
              <PrimaryButton type="button" onClick={handleAddRequirement}>
                Add
              </PrimaryButton>
            )}
          </div>
        ))}
      </form>
      {error && <CustomError message={error} />}
      <div className="flex items-center justify-between">
        <SecondaryButton onClick={onPreviousStep}>Previous</SecondaryButton>
        <PrimaryButton
          type="button"
          onClick={handleNextStep}
          disabled={disableNext}>
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

const Step4 = ({ setFormData, onNextStep, onPreviousStep }: StepProps) => {
  const [disableNext] = useState(false);
  const [advantages, setAdvantages] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);

  const handleAdvantageChange = (index: number, value: string) => {
    if (value == "") {
      setError("Can't have empty advantage.");
      return;
    }
    setError(null); // Clear error if value is not empty
    const newAdvantages = [...advantages];
    newAdvantages[index] = value;
    setAdvantages(newAdvantages);
  };

  const handleAddAdvantage = () => {
    if (advantages[advantages.length - 1] == "") {
      setError("Can't have empty advantage.");
      return;
    }
    setError(null); // Clear error if adding a new advantage
    setAdvantages([...advantages, ""]);
  };

  const handleNextStep = () => {
    setFormData((prevForm: PostCreateDto) => ({
      ...prevForm,
      advantages: advantages.filter((adv) => adv != ""),
    }));

    if (onNextStep) onNextStep();
  };

  return (
    <div className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4 flex justify-start flex-col">
      <h2 className="text-xl font-semibold mb-4">Step 4: Advantages</h2>
      <form>
        {advantages.map((advantage, index) => (
          <div key={index} className="mb-2 flex">
            <input
              type="text"
              value={advantage}
              onChange={(e) => handleAdvantageChange(index, e.target.value)}
              className="flex-grow border border-gray-300 rounded-md py-2 px-3 mr-2"
              placeholder={`Advantage ${index + 1}`}
            />
            {index === advantages.length - 1 && (
              <PrimaryButton type="button" onClick={handleAddAdvantage}>
                Add
              </PrimaryButton>
            )}
          </div>
        ))}
      </form>
      {error && <CustomError message={error} />}
      <div className="flex items-center justify-between">
        <SecondaryButton onClick={onPreviousStep}>Previous</SecondaryButton>
        <PrimaryButton
          type="button"
          onClick={handleNextStep}
          disabled={disableNext}>
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

const Step5 = ({
  formData,
  setFormData,
  onPreviousStep,
  disablePostButton,
  setNewPost,
}: StepProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the first selected file
    if (file) {
      // Process the selected file (e.g., upload to server, display preview, etc.)
      setFormData({ ...formData, image: file });
    }
  };

  useEffect(() => {
    if (!disablePostButton || !setNewPost) return;
    if (formData.location == "" || formData.image == null) {
      disablePostButton(true);
    } else {
      disablePostButton(false);
      setNewPost(formData);
    }
  }, [formData.location, formData.image]);

  return (
    <div className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4  flex justify-start flex-col">
      <h2 className="text-xl font-semibold mb-4">
        Step 5: Specify Location and Set Company Image
      </h2>
      <form encType="multipart/form-data" method="post">
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
          accept="image/*" // Spe cify accepted file types (in this case, any image type)
          className="mt-2 mb-4 p-2 rounded"
        />
      </form>
      {formData.image && (
        <img
          className="h-auto w-128 mb-2"
          src={URL.createObjectURL(formData.image)}
          alt="Uploaded"
        />
      )}

      <div className="flex items-center justify-between">
        <SecondaryButton onClick={onPreviousStep}>Previous</SecondaryButton>
      </div>
    </div>
  );
};
interface Props {
  setNewPost: (newPost: PostCreateDto) => void;
  disablePostButton: (newVal: boolean) => void;
}

const CreateCompanyPostWizard = ({ setNewPost, disablePostButton }: Props) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PostCreateDto>({
    title: "",
    description: "",
    company: "",
    date: new Date(),
    location: "",
    image: null,
    advantages: [],
    requirements: [],
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
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )}
      {step === 4 && (
        <Step4
          formData={formData}
          setFormData={setFormData}
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
        />
      )}
      {step === 5 && (
        <Step5
          formData={formData}
          setFormData={setFormData}
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
          disablePostButton={disablePostButton}
          setNewPost={setNewPost}
        />
      )}
    </div>
  );
};

export default CreateCompanyPostWizard;
