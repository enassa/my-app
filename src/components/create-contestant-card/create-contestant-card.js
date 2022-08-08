import React, { useState } from "react";
import ClickAwayListener from "../click_away_listener/click-away-listener";
import {
  ArrowRightAlt,
  CheckCircle,
  Delete,
  Edit,
  HowToVote,
} from "@mui/icons-material";

import FormGenerator from "../../contants/libraries/FormGenerator/FormGenerator";
import { FIELDS } from "../../contants/libraries/FormGenerator/FormGeneratorFields";
import {
  replaceSpaceWithUnderscore,
  replaceUnderscoreWithSpace,
} from "../../contants/libraries/easy";
import { useCreateElectionServices } from "../../pages/create-election/context/create-election-context";

export default function CreateContestantCard({
  showPosition,
  data,
  position,
  voterCard,
  handleClick,
  selected,
  handleNextClick,
  isLast,
  editing,
  count,
}) {
  const imageInput = React.createRef();
  const [hovered, setHovered] = useState();
  const [tempImage, setTempImage] = useState({
    ImageUrl: data?.Info?.ImageUrl,
    ImageInfo: data?.Info?.ImageInfo,
    edited: false,
  });
  const [editMode, setEditMode] = useState(editing);

  const {
    bluePrintState,
    deleteContestant,
    addContestant,
    updateContestant,
    resetElectionPrint,
  } = useCreateElectionServices();
  const info = data?.Info;
  const infoProps = !!info ? Object.keys(info) : [];

  // Create fields for form
  const fields = [];
  infoProps.map((prop, index) => {
    if (
      prop === "ImageInfo" ||
      prop === "ImageUrl" ||
      prop === "Votes" ||
      prop === "Position" ||
      prop === "PositionId" ||
      prop === "VotesCount"
    )
      return null;
    fields.push({
      fieldType: FIELDS.input,
      name: replaceSpaceWithUnderscore(prop),
      label: prop,
      placeholder: prop,
      required: true,
      defaultValue: info[prop],
    });
    return null;
  });
  const closeForm = () => {
    setTempImage({
      ImageUrl: data?.Info.ImageUrl,
      ImageInfo: data?.Info.ImageInfo,
    });
    setEditMode(false);
  };
  const handleFormSubmit = (formData, resetFunc, completed) => {
    let editedContestdantData = {
      ...data,
      Info: {
        ...data.Info,
        ...formData,
        ImageUrl: tempImage.ImageUrl,
        ImageInfo: tempImage.ImageInfo,
        Position: data?.position,
        PositionId: data?.positionId,
        VotesCount: null,
        Votes: [],
      },
    };
    updateContestant(editedContestdantData);
    closeForm();
  };
  const processFiles = (field, files) => {
    const ImageInfo = files[0];
    const ImageUrl = ImageInfo ? URL.createObjectURL(ImageInfo) : "";
    if (tempImage.ImageUrl === ImageUrl) return;
    setTempImage({ ImageUrl, ImageInfo, edited: true });
  };

  const checkShowStatus = (ContestantDefTitle) => {
    let contestantDef = bluePrintState?.ContestantDefinition?.find(
      (item) => item.Title === ContestantDefTitle
    );
    if (!!contestantDef) return contestantDef?.Show;
  };
  return (
    <>
      {editMode && (
        <div
          onClick={() => closeForm()}
          className="w-full h-full fixed z-[5] left-0 top-0 bg-backdrop2"
        ></div>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          editMode &&
          "fixed left-0 pointer-events-none top-0 w-full h-full flex justify-center items-center z-[30]"
        }`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          // style={{ transition: "all 0.2s linear" }}
          className={`${
            editMode
              ? "absolute z-[6] animate-zoomIn top-0 bg-white h-auto "
              : "w-[200px min-h-[200px] mb-[20px] bg-yellow-100  animate-zoomOut "
          }
           w-[200px] pointer-events-auto  hover:shadow-2xl rounded-2xl  shadow  py-3 px-2 cursor-pointer flex items-center flex-col relative`}
        >
          {!editMode && (
            <span className="absolute w-6 h-6 bg-blue-600 top-[-10px] left-[-10px] rounded-full flex justify-center items-center text-white">
              {data?.Info.Ballot_Number}
            </span>
          )}

          {editMode && (
            <div className="absolute top-[-10px] right-[-35px] bg-blue-500 text-white rounded-full h-10 min-w-[120px] flex justify-center items-center shadow-lg">
              Ballot No. &nbsp; <strong>{data?.Info.Ballot_Number}</strong>
            </div>
          )}
          <div
            // style={{ backgroundImage: `url(${data.Image})` }}
            style={{
              backgroundImage: `url(${
                editMode ? tempImage.ImageUrl : data?.Info.ImageUrl
              })`,
            }}
            className="w-[100px] h-[100px] min-h-[100px] relative min-w-[100px] bg-yellow-50 rounded-full fit-bg mb-2"
          >
            {editMode && (
              <div
                onClick={() => {
                  imageInput?.current?.click();
                }}
                className="absolute animate-rise bottom-2 bg-backdrop hover:bg-backdrop2 p-1 text-white rounded-lg right-0"
              >
                <Edit />
                <input
                  ref={imageInput}
                  onChange={(e) => processFiles("Image", e.target.files)}
                  style={{ display: "none" }}
                  accept={`file_extension|${
                    false ? null : ".jpg, .png,.jpeg,.JPEG,.JPG"
                  }`}
                  type="file"
                  id="files"
                  name="files"
                />
              </div>
            )}
          </div>

          {/* Basic info field -> show if editMode is off*/}
          {!editMode && (
            <div className="flex flex-col  justify-start items-center">
              <div>
                {/* <strong className="mb-2">Name: </strong> */}
                <div className="text-center overflow-hidden  text-ellipsis ">
                  {data.Name}
                </div>
              </div>
              {infoProps?.map((prop, index) => {
                if (prop === "ImageInfo" || prop === "ImageUrl") return;
                if (!checkShowStatus(prop)) return;
                return (
                  <div className="w-full" key={index}>
                    <strong className="mb-2 ">
                      {replaceUnderscoreWithSpace(prop)}:{" "}
                    </strong>
                    <span>{info[prop]}</span>
                  </div>
                );
              })}
            </div>
          )}
          {/* Extra info fields -> show if editMode is on */}
          {editMode && (
            <div className="w-full h-full flex flex-col items-center px-4">
              <FormGenerator
                fields={fields}
                handleOnSubmit={(data, resetFunc, completed) => {
                  handleFormSubmit(data, resetFunc, completed);
                }}
                buttonStyles={{
                  backgroundColor: "#5E71E4",
                  borderRadius: "5px",
                  backgroundColor: "black",
                }}
                buttonText="Save"
                // serverReport={this.props.authError}
                // reportState={this.props.errorState}
              />
            </div>
          )}

          {/* Delete and Edit buttons -> show if not in edit mode */}
          <div className="w-[200px] h-[50px] items-center flex justify-center absolute bottom-[-50px] ">
            {!editMode && (
              <>
                <Edit
                  style={{ fontSize: 30 }}
                  className={`text-blue-500 hover:text-blue-300 mr-2  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditMode(true);
                  }}
                />
                <Delete
                  style={{ fontSize: 30 }}
                  onClick={() => {
                    deleteContestant(data);
                  }}
                  className={`text-red-300 hover:text-red-600 mr-2  `}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
