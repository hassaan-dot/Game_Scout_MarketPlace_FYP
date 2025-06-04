import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { money } from "../../Resources/assets";
import { CustomButton, FormField, Loader } from "../../Components/index";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   checkIfImage(form.image, async (exists) => {
  //     if(exists) {
  //       setIsLoading(true)
  //       // await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
  //       setIsLoading(false);
  //       navigate('/');
  //     } else {
  //       alert('Provide valid image URL')
  //       setForm({ ...form, image: '' });
  //     }
  //   })
  // }
  // const pickDocument = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: [
  //         "image/*", // All image types (jpeg, png, etc.)
  //         "application/pdf", // PDF files
  //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  //         "application/msword", // .doc
  //         "application/vnd.ms-excel", // .xls
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  //         "text/csv", // .csv
  //       ],
  //       multiple: true,
  //     });

  //     if (!result.canceled) {
  //       const newDocsPromises = result.assets.map(async (file) => {
  //         const response = await fetch(file.uri);
  //         const blob = await response.blob();

  //         return {
  //           uri: file.uri,
  //           name: file.name,
  //           type: file.mimeType || "application/octet-stream",
  //           blob: blob,
  //         };
  //       });

  //       const newDocs = await Promise.all(newDocsPromises);
  //       setDocuments((prev) => [...prev, ...newDocs]);
  //     }
  //   } catch (err) {
  //     console.log("Document picker error:", err);
  //   }
  // };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Create Post
        </h1>
      </div>

      <form
        //  onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) =>
              //  handleFormFieldChange('name', e)
              {}
            }
          />
          <FormField
            labelName="Content Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            // handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Description"
          placeholder="Write your content description"
          isTextArea
          value={form.description}
          // handleChange={(e) => handleFormFieldChange('description', e)}
        />

        {/* <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div> */}

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Price"
            placeholder="Enter Price "
            inputType="text"
            value={form.target}
            // handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            // handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          labelName="Content image"
          placeholder="Select the image of your content"
          inputType="url"
          value={form.image}
          // handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Create new post"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
