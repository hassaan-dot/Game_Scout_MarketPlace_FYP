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
    disabled: false,
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/UserPosts",
    disabled: false,
  },
  {
    name: "CreatePosts",
    imgUrl: payment,
    link: "/CreatePosts/:edit",
    disabled: false,
  },

  // {
  //   name: "withdraw",
  //   imgUrl: withdraw,
  //   // link: '/',
  //   disabled: true,
  // },
  {
    name: "Profile",
    imgUrl: profile,
    link: "/Profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    // link: "/",
    disabled: false,
  },
];
