import React from "react";
import { icons } from "../../../assets/Icons/icons"; // Adjust path based on your project structure

const InformationContainer = ({
  name = "Ahmed",
  email = "Ahmed@gmail.com",
  contact = "923174431419",
  country = "Saudia Arabia",
  profile = false,
  style = "",
  Data,
  title = "Details",
  titleIcon = false,
  titleStyle = "",
  cardContainer = "",
  detailscreenContainer = "",
  horizontalwidth = "50%",
  colorProp = "#D0D5DD",
}) => {
  return (
    <div
      className={`shadow my-8 ${cardContainer}`}
      style={{ marginVertical: 0 }}
    >
      <div className="flex flex-row items-start">
        {profile && (
          <div className="flex flex-row items-center border border-gray-300 p-4 rounded-lg w-1/4">
            <div className="w-20 h-20 bg-black rounded-full"></div>
            <div className="ml-4">
              <p className="text-lg font-medium text-white">{name}</p>
            </div>
          </div>
        )}

        <div
          className={`flex-1 border border-[#2c2f32] rounded-lg ml-4 p-6 ${detailscreenContainer}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-base font-bold text-white ${titleStyle}`}>
              {title}
            </h2>
            {titleIcon && (
              <img
                src={icons.tableStatusIcon}
                alt="status icon"
                className="w-5 h-5"
              />
            )}
          </div>

          <div className="border-b border-[#2c2f32] mb-6"></div>

          <div className="flex flex-wrap gap-6 mb-6">
            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}>
                Contact Person Name
              </p>
              <p className={`text-sm text-[#818183] mt-1 ${style}`}>
                {Data?.data?.client?.contact_person_name || "N/A"}
              </p>
            </div>

            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}>
                Company Name
              </p>
              <p className={`text-sm text-[#818183] mt-1 ${style}`}>
                {Data?.data?.client?.company_name || "N/A"}
              </p>
            </div>

            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}>
                Address
              </p>
              <p className={`text-sm text-[#818183] mt-1 ${style}`}>
                {Data?.data?.client?.address || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}>Email</p>
              <p className={`text-sm text-[#818183] mt-1 ${style}`}>
                {Data?.data?.client?.email || email}
              </p>
            </div>

            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}>
                Phone Number
              </p>
              <p className={`text-sm text-[#818183] mt-1 ${style}`}>
                {Data?.data?.client?.phone_number || contact}
              </p>
            </div>

            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}></p>
              <p className={`text-sm text-white mt-1 ${style}`}>
                {/* {Data?.data?.client?.phone_number || contact} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationContainer;
