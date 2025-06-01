// import React, { useContext, createContext } from 'react';

// import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';
// import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

// const StateContext = createContext();

// export const StateContextProvider = ({ children }) => {
//   const { contract } = useContract('0xf59A1f8251864e1c5a6bD64020e3569be27e6AA9');
//   const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

//   const address = useAddress();
//   const connect = useMetamask();

//   const publishCampaign = async (form) => {
//     try {
//       const data = await createCampaign({
// 				args: [
// 					address, // owner
// 					form.title, // title
// 					form.description, // description
// 					form.target,
// 					new Date(form.deadline).getTime(), // deadline,
// 					form.image,
// 				],
// 			});

//       console.log("contract call success", data)
//     } catch (error) {
//       console.log("contract call failure", error)
//     }
//   }

//   const getCampaigns = async () => {
//     const campaigns = await contract.call('getCampaigns');

//     const parsedCampaings = campaigns.map((campaign, i) => ({
//       owner: campaign.owner,
//       title: campaign.title,
//       description: campaign.description,
//       target: ethers.utils.formatEther(campaign.target.toString()),
//       deadline: campaign.deadline.toNumber(),
//       amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
//       image: campaign.image,
//       pId: i
//     }));

//     return parsedCampaings;
//   }

//   const getUserCampaigns = async () => {
//     const allCampaigns = await getCampaigns();

//     const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

//     return filteredCampaigns;
//   }

//   const donate = async (pId, amount) => {
//     const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

//     return data;
//   }

//   const getDonations = async (pId) => {
//     const donations = await contract.call('getDonators', [pId]);
//     const numberOfDonations = donations[0].length;

//     const parsedDonations = [];

//     for(let i = 0; i < numberOfDonations; i++) {
//       parsedDonations.push({
//         donator: donations[0][i],
//         donation: ethers.utils.formatEther(donations[1][i].toString())
//       })
//     }

//     return parsedDonations;
//   }


//   return (
//     <StateContext.Provider
//       value={{ 
//         address,
//         contract,
//         connect,
//         createCampaign: publishCampaign,
//         getCampaigns,
//         getUserCampaigns,
//         donate,
//         getDonations
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   )
// }

// export const useStateContext = () => useContext(StateContext);
import React, { useContext, createContext, useState } from 'react';

// Create the context
const StateContext = createContext();

// StateContextProvider
export const StateContextProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState({}); // { campaignId: [{ donator, amount }] }

  // Create a new campaign
  const createCampaign = (form) => {
    const newCampaign = {
      id: campaigns.length + 1,
      title: form.title,
      description: form.description,
      target: parseFloat(form.target),
      deadline: new Date(form.deadline).getTime(),
      image: form.image,
      amountCollected: 0,
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  // Get all campaigns
  const getCampaigns = () => campaigns;

  // Get user-specific campaigns (placeholder for user filtering)
  const getUserCampaigns = (userId) => campaigns.filter((campaign) => campaign.owner === userId);

  // Donate to a campaign
  const donate = (campaignId, donator, amount) => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          amountCollected: campaign.amountCollected + parseFloat(amount),
        };
      }
      return campaign;
    });

    setCampaigns(updatedCampaigns);

    const campaignDonations = donations[campaignId] || [];
    setDonations({
      ...donations,
      [campaignId]: [...campaignDonations, { donator, amount: parseFloat(amount) }],
    });
  };

  // Get donations for a specific campaign
  const getDonations = (campaignId) => donations[campaignId] || [];

  return (
    <StateContext.Provider
      value={{
        campaigns,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context
export const useStateContext = () => useContext(StateContext);
