import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../../Resources/assets";

export const navlinks = [
  {
    name: "Home",
    imgUrl: dashboard,
    link: "/Home",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "/CreatePosts",
    // disabled: true,
  },

  {
    name: "withdraw",
    imgUrl: withdraw,
    // link: '/',
    disabled: true,
  },
  {
    name: "Profile",
    imgUrl: profile,
    link: "/Profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: false,
  },
];
