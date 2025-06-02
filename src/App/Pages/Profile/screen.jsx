import React, { useState, useEffect } from "react";

import { DisplayContent } from "../../Components/index";
import InformationContainer from "../../Components/userDetails/component";
// import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  return (
    <>
      <InformationContainer />
      <DisplayContent
        title="All Posts"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </>
  );
};

export default Profile;
