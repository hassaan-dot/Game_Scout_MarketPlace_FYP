import React, { useState, useEffect } from 'react'

import { DisplayContent } from '../../Components/index';
// import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  // const { address, contract, getUserCampaigns } = useStateContext();

  // const fetchCampaigns = async () => {
  //   setIsLoading(true);
  //   const data = await getUserCampaigns();
  //   setCampaigns(data);
  //   setIsLoading(false);
  // }

  // useEffect(() => {
  //   if(contract) fetchCampaigns();
  // }, [address, contract]);

  return (
    <DisplayContent 
      title="All Posts"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile