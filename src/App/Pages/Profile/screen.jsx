import React, { useState, useEffect } from "react";

import { DisplayContent } from "../../Components/index";
import InformationContainer from "../../Components/userDetails/component";
import LocalStorage from "../../../services/local-storage";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const User = LocalStorage.get("user");

  return (
    <>
      <InformationContainer data={User} />
      <DisplayContent
        title="All Posts"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </>
  );
};

export default Profile;
