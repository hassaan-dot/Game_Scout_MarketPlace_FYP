import React from "react";
import { icons } from "../../Resources/Icons/icons"; // Adjust path based on your project structure

const InformationContainer = ({
  profile = true,
  style = "",
  titleIcon = false,
  titleStyle = "",
  cardContainer = "",
  detailscreenContainer = "",

  data,
}) => {
  return (
    <div
      className={`shadow my-8 ${cardContainer}`}
      style={{ marginVertical: 0 }}
    >
      <div className="flex flex-row items-start">
        {/* {profile && (
          <div className="flex flex-row items-center h-40 border border-[#2c2f32] p-4 m-5 rounded-lg w-1/4">
            <div className="w-20 h-20 bg-black rounded-full" />
            <div className="ml-4">
              <p className="text-lg font-medium text-white">{data?.username}</p>
            </div>
          </div>
        )} */}

        <div
          className={`flex-1 border border-[#2c2f32] rounded-lg ml-4 p-6 ${detailscreenContainer}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-base font-bold text-white ${titleStyle}`}></h2>
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
                {data?.username || "N/A"}
              </p>
            </div>

            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}>
                Company Name
              </p>
              <p className={`text-sm text-[#818183] mt-1 ${style}`}>
                {data?.company_name || "Granjur Technology"}
              </p>
            </div>

            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}>
                Address
              </p>
              <p className={`text-sm text-[#818183] mt-1 ${style}`}>
                {data?.client?.address || "983 Block L sabzazar lahore"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}>Email</p>
              <p className={`text-sm text-[#818183] mt-1 ${style}`}>
                {data?.email}
              </p>
            </div>

            <div className={`flex-1 min-w-[200px]`}>
              <p className={`text-sm text-white font-medium ${style}`}>
                Phone Number
              </p>
              <p className={`text-sm text-[#818183] mt-1 ${style}`}>
                {data?.client?.phone_number || "03174431419"}
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
