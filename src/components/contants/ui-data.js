import { PictureAsPdf, TextDecrease } from "@mui/icons-material";
import { getAsObjectFromLocalStorage } from "../../contants/libraries/easy";
import { ORG_CODE, ORG_NAME } from "../../contants/urls/urls";
export const randomImages = "https://source.unsplash.com/random";
export const dummyImage = "../../assets/images/nice.jpeg";
export const User = () => {
  let userData = getAsObjectFromLocalStorage("userData");
  if (!!userData) {
    return userData;
  }
  return { name: "", orgCode: "", role: "" };
};
export const electionBluePrint = {
  Id: "",
  OrganizationId: "",
  OrganizationName: "",
  OrganizationEmail: "",
  DateCreated: "",
  CreatedBy: "",
  Title: "",
  Password: "",
  NumberOfVoters: 4,
  TotalVoted: 0,
  GeneralInfo: {
    Title: "",
    Start_Date: "",
    End_Date: "",
    End_Time: "",
    Start_Time: "",
    Time_Zone: "UTC",
    Starting: "",
    Ending: "",
  },
  ContestantDefinition: [
    // { Title: "ImageInfo", Id: 0, Type: "Image", Show: false, Invisible: true },
    // { Title: "ImageUrl", Id: 1, Type: "Image", Show: false, Invisible: true },
    { Title: "Name", Id: 0, Type: "Text", Show: true, Invisible: false },
  ],
  Positions: [],
  Contestants: [],
  VoterIds: [],
  Categories: [
    {
      Id: 0,
      Title: "Gender",
      Options: [
        { Id: 0, Title: "Male", disabled: false },
        { Id: 1, Title: "Female", disabled: false },
      ],
      MultipleSelect: false,
      disabled: false,
    },
    {
      Id: 1,
      Title: "Houses",
      Options: [
        { Id: 0, Title: "Kwapong House", disabled: false },
        { Id: 1, Title: "Some House", disabled: false },
      ],
      MultipleSelect: true,
      disabled: false,
    },
  ],
};
export const voterIdBluePrint = {
  Id: "",
  Used: true,
  Votes: [], // all the votes the use casted
  UsedBy: {},
  Time: "",
  Compromised: false,
};
export const contestantBluePrint = {
  Id: null,
  Name: "",
  Ballot_Number: 0,
  Info: {},
  Position: "",
  PositionId: null,
  VotesCount: 0,
  Votes: [],
};
export const extraInfoBluePrint = {
  Title: "",
  Value: "",
  Show: false,
  Invisible: true,
};
export const positionBluePrint = {
  Id: 1,
  Title: "",
  ContestantCount: "",
  Contestants: [],
  VoteCount: null,
  Categories: [],
};
export const generalBlueInfoPrint = {
  Title: "",
  Start_Date: "",
  End_Date: "",
  End_Time: "",
  Start_Time: "",
  Time_Zone: "UTC",
  Starting: "",
  Ending: "",
  Password: "",
  NumberOfVoters: 0,
};
export const contestDefBluePrint = {
  Id: 1,
  Title: "",
  Type: "Text",
  Show: false,
  Invisible: false,
};
export const defFieldsOption = [
  {
    title: "Text",
    icon: <TextDecrease />,
  },
  {
    title: "Image",
    icon: <PictureAsPdf />,
  },
];
export const categoryOptionsBluePrint = {
  Id: 0,
  Title: "",
  disabled: false,
  selected: false,
};
export const categoryBluePrint = {
  Id: 0,
  Name: "",
  Options: [{ ...categoryOptionsBluePrint }],
  MultipleSelect: false,
  disabled: false,
  Selected: false,
};
export const positionCategoryBluePrint = {
  Id: 0,
  Selected: [],
  MultipleSelect: false,
  CategoryId: 0,
};
