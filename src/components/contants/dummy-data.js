import img from "../../assets/images/nice.jpeg";
import img2 from "../../assets/images/vote.jpeg";
import img3 from "../../assets/images/yearh.png";
import img4 from "../../assets/images/nice.jpeg";
import img5 from "../../assets/images/nice.jpeg";

export const electionData = {
  VoterInfo: {
    Id: 1111,
    Used: true,
    Votes: [],
    UsedBy: {},
    Election_Id: "",
    Org_id: "",
    Time: "",
  },
  Positions: [
    {
      Id: 1,
      title: "Boys prefect",
    },
    {
      Id: 2,
      title: "Girls prefect",
    },
    {
      Id: 3,
      title: "House prefect",
    },
    {
      Id: 4,
      title: "Compound prefect",
    },
  ],
  Contestants: [
    {
      Id: 1,
      Name: "Assan Ewudzi Nathaniel",
      Image: img,
      Info: [
        {
          Title: "House",
          Value: "Slessor House",
        },
      ],
      BallotNumber: 1,
      Position: "Boys prefect",
      PositionId: 1,
      VotesCount: 80,
    },
    {
      Id: 2,
      Name: "Kusi William",
      Image: img,
      BallotNumber: 2,
      Info: [
        {
          Title: "House",
          Value: "Slessor House",
        },
      ],
      Position: "Boys prefect",
      PositionId: 1,
      VotesCount: 7,
    },
    {
      Id: 3,
      Name: "Eyram Assan",
      Image: img,
      BallotNumber: 5,
      Info: [
        {
          Title: "House",
          Value: "Slessor House",
        },
      ],
      Position: "House prefect",
      PositionId: 3,
      VotesCount: 15,
    },
    {
      Id: 4,
      Name: "Assan Ewudzi Nathaniel",
      Image: img,
      BallotNumber: 4,
      Info: [
        {
          Title: "House",
          Value: "Slessor House",
        },
      ],
      Position: "House prefect",
      PositionId: 3,
      VotesCount: 9,
    },
    {
      Id: 5,
      Name: "Assan Ewudzi Nathaniel",
      Image: img,
      BallotNumber: 3,
      Info: [
        {
          Title: "House",
          Value: "Slessor House",
        },
      ],
      Position: "Boys prefect",
      PositionId: 1,
      VotesCount: 40,
    },
    {
      Id: 6,
      Name: "Assan Ewudzi Nathaniel",
      Image: "image_data",
      Info: [
        {
          Title: "House",
          Value: "Slessor House",
        },
      ],
      Position: "Girls prefect",
      PositionId: 2,
      VotesCount: 30,
    },
    {
      Id: 7,
      Name: "Assan Ewudzi Nathaniel",
      Image: "image_data",
      Info: [
        {
          Title: "House",
          Value: "Slessor House",
        },
      ],
      Position: "Girls prefect",
      PositionId: 2,
      VotesCount: 6,
    },
    {
      Id: 8,
      Name: "Assan Ewudzi Nathaniel",
      Image: "image_data",
      Info: [
        {
          Title: "House",
          Value: "Slessor House",
        },
      ],
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 60,
    },
    {
      Id: 9,
      Name: "Assan Ewudzi Nathaniel",
      Image: "image_data",
      Info: [
        {
          Title: "House",
          Value: "Slessor House",
        },
      ],
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 0,
    },
  ],
};
export const organizations = [
  {
    Id: "23DGF34J",
    Name: "Achimota senior High School",
    Email: "",
    Contact: "",
    Password: "2423423",
  },
  {
    Id: "23RTG34J",
    Name: "Adenta School",
    Email: "",
    Contact: "",
    Password: "2423423",
  },
];
export const elections = [
  {
    Id: "U7T8U5YX",
    OrganizationId: "23DGF34J",
    OrganizationName: "Achimota senior High School",
    DateCreated: "20-07-2022",
    CreatedBy: "Assan Ewudzi Nathaniel",
    Title: "2023 Elections for prefertship",
    NumberOfVoters: 9000,
    TotalVoted: 4000,
    VoterIds: [
      {
        Id: "IH65DFG",
        Used: true,
        Votes: [],
        UsedBy: {},
        Election_Id: "U7T8U5YX",
        Org_Id: "23DGF34J",
        Time: "",
      },
      {
        Id: 2222,
        Used: true,
        Votes: [],
        UsedBy: {},
        Election_Id: "",
        Org_id: "",
        Time: "",
      },
      {
        Id: 3333,
        Used: true,
        Votes: [],
        UsedBy: {},
        Election_Id: "",
        Org_id: "",
        Time: "",
      },
      {
        Id: 4444,
        Used: true,
        Votes: [],
        UsedBy: {},
        Election_Id: "",
        Org_id: "",
        Time: "",
      },
    ],
    GeneralInfo: {
      Title: "2023 Elections for prefertship",
      StartDate: "23-07-2022",
      EndDate: "24-07-2022",
      EndTime: "18:00",
      StartTime: "9:00",
      TimeZone: "UTC",
    },
    ContestantDefinition: [
      {
        Id: 1,
        Title: "Name",
        Type: "text",
      },
      {
        Id: 2,
        Title: "Image",
        Type: "image",
      },
      {
        Id: 3,
        Title: "House_name",
        Type: "text",
      },
    ],
    Positions: [
      {
        Id: 1,
        title: "Boys prefect",
      },
      {
        Id: 2,
        title: "Girls prefect",
      },
      {
        Id: 3,
        title: "House prefect",
      },
      {
        Id: 4,
        title: "Compound prefect",
      },
    ],
    Contestants: [
      {
        Id: 1,
        Name: "Assan Ewudzi Nathaniel",
        Image: img,
        BallotNumber: 1,
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Boys prefect",
        PositionId: 1,
        VotesCount: 80,
      },
      {
        Id: 2,
        Name: "Kusi William",
        Image: img,
        BallotNumber: 2,
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Boys prefect",
        PositionId: 1,
        VotesCount: 7,
      },
      {
        Id: 3,
        Name: "Eyram Assan",
        Image: img,
        BallotNumber: 5,
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "House prefect",
        PositionId: 3,
        VotesCount: 15,
      },
      {
        Id: 4,
        Name: "Assan Ewudzi Nathaniel",
        Image: img,
        BallotNumber: 4,
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "House prefect",
        PositionId: 3,
        VotesCount: 9,
      },
      {
        Id: 5,
        Name: "Assan Ewudzi Nathaniel",
        Image: img,
        BallotNumber: 3,
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Boys prefect",
        PositionId: 1,
        VotesCount: 40,
      },
      {
        Id: 6,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Girls prefect",
        PositionId: 2,
        VotesCount: 30,
      },
      {
        Id: 7,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Girls prefect",
        PositionId: 2,
        VotesCount: 6,
      },
      {
        Id: 8,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Compound prefect",
        PositionId: 4,
        VotesCount: 60,
      },
      {
        Id: 9,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Compound prefect",
        PositionId: 4,
        VotesCount: 0,
      },
      {
        Id: 10,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Compound prefect",
        PositionId: 4,
        VotesCount: 0,
      },
      {
        Id: 11,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Compound prefect",
        PositionId: 4,
        VotesCount: 0,
      },
      {
        Id: 12,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Compound prefect",
        PositionId: 4,
        VotesCount: 0,
      },
      {
        Id: 13,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Compound prefect",
        PositionId: 4,
        VotesCount: 0,
      },
      {
        Id: 14,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Compound prefect",
        PositionId: 4,
        VotesCount: 0,
      },
      {
        Id: 15,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        Info: [
          {
            Title: "House",
            Value: "Slessor House",
          },
        ],
        Position: "Compound prefect",
        PositionId: 4,
        VotesCount: 0,
      },
    ],
  },
  {
    Id: 2,
    OrganizationId: "23DGF34J",
    OrganizationName: "Achimota senior High School",
    DateCreated: "20-07-2022",
    CreatedBy: "Assan Ewudzi Nathaniel",
    GeneralInfo: {
      Title: "2023 Elections for prefertship",
      StartDate: "23-07-2022",
      EndDate: "",
      EndTime: "18",
      TimeZone: "UTC",
    },
    ContestantDefinition: [
      {
        Id: 1,
        Title: "Name",
        Type: "text",
      },
      {
        Id: 2,
        Title: "Image",
        Type: "image",
      },
      {
        Id: 3,
        Title: "House_name",
        Type: "text",
      },
    ],
    Positions: [
      {
        Id: 1,
        title: "Boys prefect",
      },
      {
        Id: 1,
        title: "Girls prefect",
      },
      {
        Id: 1,
        title: "House prefect",
      },
      {
        Id: 1,
        title: "Compound prefect",
      },
    ],
    Contestants: [
      {
        Id: 20,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        House_name: "Slessor House",
        Position: "Boys prefect",
        VotesCount: 0,
      },
    ],
  },
  {
    Id: 3,
    OrganizationId: "23DGF34J",
    OrganizationName: "Achimota senior High School",
    DateCreated: "20-07-2022",
    CreatedBy: "Assan Ewudzi Nathaniel",
    GeneralInfo: {
      Title: "2023 Elections for prefertship",
      StartDate: "23-07-2022",
      EndDate: "",
      EndTime: "18",
      TimeZone: "UTC",
    },
    ContestantDefinition: [
      {
        Id: 1,
        Title: "Name",
        Type: "text",
      },
      {
        Id: 2,
        Title: "Image",
        Type: "image",
      },
      {
        Id: 3,
        Title: "House_name",
        Type: "text",
      },
    ],
    Positions: [
      {
        Id: 1,
        title: "Boys prefect",
      },
      {
        Id: 1,
        title: "Girls prefect",
      },
      {
        Id: 1,
        title: "House prefect",
      },
      {
        Id: 1,
        title: "Compound prefect",
      },
    ],
    Contestants: [
      {
        Id: 20,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        House_name: "Slessor House",
        Position: "School prefect",
        VotesCount: 0,
      },
    ],
  },
  {
    Id: 4,
    OrganizationId: "23DGF34J",
    OrganizationName: "Achimota senior High School",
    DateCreated: "20-07-2022",
    CreatedBy: "Assan Ewudzi Nathaniel",
    GeneralInfo: {
      Title: "2023 Elections for prefertship",
      StartDate: "23-07-2022",
      EndDate: "",
      EndTime: "18",
      TimeZone: "UTC",
    },
    ContestantDefinition: [
      {
        Id: 2,
        Title: "Image",
        Type: "image",
      },
      {
        Id: 1,
        Title: "Name",
        Type: "text",
      },
      {
        Id: 3,
        Title: "House_name",
        Type: "text",
      },
    ],
    Positions: [
      {
        Id: 1,
        title: "Boys prefect",
      },
      {
        Id: 1,
        title: "Girls prefect",
      },
      {
        Id: 1,
        title: "House prefect",
      },
      {
        Id: 1,
        title: "Compound prefect",
      },
    ],
    Contestants: [
      {
        Id: 20,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        House_name: "Slessor House",
        Position: "School prefect",
        VotesCount: 0,
      },
    ],
  },
  {
    Id: 5,
    OrganizationId: "23DGF34J",
    OrganizationName: "Achimota senior High School",
    DateCreated: "20-07-2022",
    CreatedBy: "Assan Ewudzi Nathaniel",
    GeneralInfo: {
      Title: "2023 Elections for prefertship",
      StartDate: "23-07-2022",
      EndDate: "",
      EndTime: "18",
      TimeZone: "UTC",
    },
    ContestantDefinition: [
      {
        Id: 1,
        Title: "Name",
        Type: "text",
      },
      {
        Id: 2,
        Title: "Image",
        Type: "image",
      },
      {
        Id: 3,
        Title: "House_name",
        Type: "text",
      },
    ],
    Positions: [
      {
        Id: 1,
        title: "Boys prefect",
      },
      {
        Id: 1,
        title: "Girls prefect",
      },
      {
        Id: 1,
        title: "House prefect",
      },
      {
        Id: 1,
        title: "Compound prefect",
      },
    ],
    Contestants: [
      {
        Id: 20,
        Name: "Assan Ewudzi Nathaniel",
        Image: "image_data",
        House_name: "Slessor House",
        Position: "School prefect",
        VotesCount: 0,
      },
    ],
  },
];
export const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const dummyElection = {
  Id: "",
  OrganizationId: "",
  OrganizationName: "",
  DateCreated: "",
  CreatedBy: "",
  Title: "",
  NumberOfVoters: 9000,
  TotalVoted: 4000,
  GeneralInfo: {
    Title: "",
    Start_Date: "",
    End_Date: "",
    End_Time: "",
    Start_Time: "",
    Time_Zone: "UTC",
  },
  ContestantDefinition: [
    {
      Id: 0,
      Title: "ImageUrl",
      Type: "Text",
      Show: false,
      Invisible: true,
    },
    {
      Id: 1,
      Title: "ImageInfo",
      Type: "Image",
      Show: false,
      Invisible: true,
    },

    {
      Id: 2,
      Title: "Name",
      Type: "Text",
      Show: true,
    },

    {
      Id: 3,
      Title: "Definition 3",
      Type: "Text",
      Show: false,
    },
    {
      Id: 4,
      Title: "Definition 4",
      Type: "Text",
      Show: false,
    },
    {
      Id: 5,
      Title: "Definition 5",
      Type: "Text",
      Show: false,
    },
  ],
  Positions: [
    {
      Id: 0,
      Title: "Portfolio 1",
    },
    {
      Id: 1,
      Title: "Portfolio 2",
    },
    {
      Id: 2,
      Title: "Portfolio 3",
    },
    {
      Id: 3,
      Title: "Portfolio 4",
    },
    {
      Id: 4,
      Title: "Portfolio 5",
    },
  ],
  Contestants: [
    {
      Id: 1,
      BallotNumber: 1,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Boys prefect",
      PositionId: 1,
      VotesCount: 80,
    },
    {
      Id: 2,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Boys prefect",
      PositionId: 1,
      VotesCount: 7,
    },
    {
      Id: 3,
      BallotNumber: 5,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "House prefect",
      PositionId: 3,
      VotesCount: 15,
    },
    {
      Id: 4,
      BallotNumber: 4,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "House prefect",
      PositionId: 3,
      VotesCount: 9,
    },
    {
      Id: 5,
      BallotNumber: 3,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Boys prefect",
      PositionId: 1,
      VotesCount: 40,
    },
    {
      Id: 6,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Girls prefect",
      PositionId: 2,
      VotesCount: 30,
    },
    {
      Id: 7,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Girls prefect",
      PositionId: 2,
      VotesCount: 6,
    },
    {
      Id: 8,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 60,
    },
    {
      Id: 9,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 0,
    },
    {
      Id: 10,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 0,
    },
    {
      Id: 11,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 0,
    },
    {
      Id: 12,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 0,
    },
    {
      Id: 13,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 0,
    },
    {
      Id: 14,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 0,
    },
    {
      Id: 15,
      Info: {
        BallotNumber: null,
        ImageUrl: img,
        ImageInfo: "",
        Name: "Assan Ewudzi Nathaniel",
        House: "Slessor House",
      },
      Position: "Compound prefect",
      PositionId: 4,
      VotesCount: 0,
    },
  ],
  VoterIds: [],
};
