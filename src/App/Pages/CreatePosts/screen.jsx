import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { money } from "../../Resources/assets";
import { CustomButton, FormField, Loader } from "../../Components/index";
import { useCreatePost } from "../../../hooks/usePosts";
import ClipLoader from "react-spinners/ClipLoader";

const CreatePost = () => {
  const navigate = useNavigate();

  const { mutate: createPost, isPending, isLoading } = useCreatePost();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });
  console.log(form);
  const handleFormFieldChange = (fieldName, e) => {
    if (fieldName === "image") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prevForm) => ({
            ...prevForm,
            image: reader.result,
            imageFile: file,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [fieldName]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.image) {
      alert("Please fill in all fields.");
      return;
    }

    // setTimeout(() => {
    //   setIsLoading(false);
    //   console.log("Form submitted successfully:", form);
    // navigate("/");
    // }, 1500);
  };

  // const handleClick = () => {
  //   const data = {
  //     title: form.title,
  //     description: form.description,
  //     price: form.price,
  //     image: form.image,
  //   };
  //   createPost(data);
  // };
  const handleClick = () => {
    if (!form.title || !form.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image); // Ensure this is a File

    // Debug: Show FormData entries

    console.log("FormData prepared:", formData);

    // Now you can safely send it to API
    createPost(formData);
  };

  return (
    <>
      {isPending && (
        <>
          <div className="flex flex-col justify-center items-center sm:p-10 p-4 m-40">
            <ClipLoader color="#ccc" size={60} />
          </div>
        </>
      )}
      {!isPending && (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
              Create Post
            </h1>
          </div>

          <div className="w-full mt-[65px] flex flex-col gap-[30px]">
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Content Title *"
                placeholder="Write a title"
                inputType="text"
                value={form.title}
                handleChange={(e) => handleFormFieldChange("title", e)}
              />
            </div>

            <FormField
              labelName="Description"
              placeholder="Write your content description"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange("description", e)}
            />

            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Price"
                placeholder="Enter Price"
                inputType="text"
                value={form.target}
                handleChange={(e) => handleFormFieldChange("price", e)}
              />
            </div>

            <div>
              <label className="text-white block mb-2">Upload Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFormFieldChange("image", e)}
                className="text-white p-2 rounded w-full "
              />
            </div>

            {form.image && (
              <div className="flex justify-center items-center mt-4">
                <img
                  src={form?.image}
                  alt="preview"
                  className="w-[200px] h-[150px] object-cover rounded"
                />
              </div>
            )}

            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Create new post"
                styles="bg-[#1dc071]"
                handleClick={handleClick}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
