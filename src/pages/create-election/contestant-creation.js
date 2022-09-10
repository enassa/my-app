import React, { useState } from "react";
import { useCreateElectionServices } from "./context/create-election-context";
import GridLayOut from "../../components/grid_layout/GridLayout";
import CreateContestantCard from "../../components/create-contestant-card/create-contestant-card";
import AddContestantForm from "./add-contestant-form";
import {
  generateSuperShortId,
  getAsObjectFromLocalStorage,
  saveObjectInLocalStorage,
} from "../../contants/libraries/easy";
import { useEffect } from "react";
import OverlayLoader from "../../components/overlay_loader/OverlayLoader";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";
import ImageLibrary from "../../components/image-library/image-library";
import { ORG_LIBRARY_ID } from "../../contants/urls/urls";
import { useImageLibrary } from "../../components/image-library/image-library-hook";
import { PhotoAlbum } from "@mui/icons-material";
// import { storage } from ".././../../.firebase";
// import { ref, uploadBytes } from "firebase/storage";
export default function ContestantCreation({ handleNavigation }) {
  const { loadingLocal, bluePrintState } = useCreateElectionServices();
  const { createElectionAsync, loading } = useElectionServices();
  const activePortfolioCache = getAsObjectFromLocalStorage("activePortfolio");
  const { selectedImage, showLibrary, setShowLibrary } = useImageLibrary();
  let firstPortFolio =
    !!bluePrintState?.Positions && bluePrintState?.Positions[0];
  let selectedPortfolio =
    activePortfolioCache !== undefined ? activePortfolioCache : firstPortFolio;

  const [errors, setError] = useState([]);
  const [activePortfolio, setActivePortfolio] = useState(selectedPortfolio);

  useEffect(() => {
    saveObjectInLocalStorage("activePortfolio", activePortfolio);
  }, [activePortfolio]);

  const validateForm = () => {
    let foundErrors = [];
    let allPositions = bluePrintState?.Positions;
    allPositions.map((position, index) => {
      let contestantCountForPosition = bluePrintState?.Contestants.find(
        (item) => item.PositionId === position.Id
      );
      if (!!!contestantCountForPosition) {
        if (!errors.includes(position.Id)) {
          foundErrors.push(position.Id);
        }
      }
    });
    if (foundErrors.length) {
      setError([...errors, ...foundErrors]);
      return false;
    }
    return true;
  };
  const ejectPortFolios = () => {
    return (
      Array.isArray(bluePrintState?.Positions) &&
      bluePrintState?.Positions.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              activePortfolio.Id === item.Id
                ? "bg-blue-500 text-white"
                : errors.includes(item.Id)
                ? "bg-red-200 text-red-600"
                : "hover:bg-blue-50 "
            } w-full cursor-pointer mb-1  flex justify-start items-center  h-[40px] min-h-[40px]`}
            onClick={() => {
              setActivePortfolio(item);
              if (errors.length) setError([]);
            }}
          >
            <div className="w-full text-ellipsis h-full flex justify-start items-center px-2">
              {index + 1}. {item.Title}
            </div>
            <div
              className={`${
                errors.includes(item.Id)
                  ? "bg-red-400 text-white"
                  : "bg-blue-100 text-blue-600"
              } flex justify-center items-center rounded-full ml-3 mr-3 w-[30px] min-w-[30px] min-h-[30px] `}
            >
              {
                bluePrintState?.Contestants.filter(
                  (el) => el.PositionId === item.Id
                )?.length
              }
            </div>
          </div>
        );
      })
    );
  };
  // const contestantImages = {}
  // const uploadImage = () => {
  //   const imageRef = ref(storage, `orgName/nameOfImage ${generateSuperShortId()}`)
  //   uploadBytes(imageRef, imagefile).then((res)=>{
  //     // do something
  //   })
  // }
  const handleCreateElection = () => {
    createElectionAsync(bluePrintState);
  };
  const libraryFolder = ORG_LIBRARY_ID();
  return (
    <div className="w-full h-full flex justify-start">
      {loadingLocal || loading ? (
        <div className="fixed w-full h-full flex justify-center items-center top-0 left-0 z-[999999] bg-backdrop2">
          {<OverlayLoader loaderText="Creating election..." />}
        </div>
      ) : null}
      <div
        onClick={() => {
          if (validateForm()) {
            handleCreateElection();
          }
        }}
        className="absolute bottom-[10px] z-[99] rounded-full  hover:bg-blue-400 text-white cursor-pointer px-5 py-7 right-6 bg-blue-500"
      >
        <span className="">Create</span>
      </div>
      <div className="w-full h-full flex justify-start">
        <div className="w-[300px] min-w-[300px] h-full py-3 pl-2 bg-white flex  flex-col overflow-y-auto pb-[200px] ">
          <div className="min-h-[80px] w-full flex justify-center items-center">
            {/* <SupervisedUserCircle
              style={{ fontSize: 30 }}
              className="text-gray-600 mr-2"
            /> */}
            <div
              style={{ fontSize: 30 }}
              className="flex justify-center items-center rounded-full ml-3 mr-3 w-[30px] min-w-[30px] min-h-[30px]  text-blue-600"
            >
              {bluePrintState?.Positions?.length}
            </div>
            <strong className="text-blue-600" style={{ fontSize: 20 }}>
              PORTFOLIOS
            </strong>{" "}
          </div>
          {ejectPortFolios()}
        </div>
        <div className="w-full h-full flex justify-start bg-gray-50 overflow-y-scroll flex-col pb-[200px]">
          {/* <div className="w-full h-50  flex justify-center bg-white items-center">
            <h2 style={{ fontSize: 30 }}>{activePortfolio.Title}</h2>
          </div> */}
          <GridLayOut
            style={{
              gridTemplateColumns: "repeat(4,1fr)",
              justifyContent: "center",
              padding: 40,
            }}
          >
            <AddContestantForm
              data={{
                positionId: activePortfolio?.Id,
                position: activePortfolio?.Title,
              }}
              resetErrors={() => {
                if (errors.length) setError([]);
              }}
            />
            {Array.isArray(bluePrintState?.Contestants) &&
              bluePrintState?.Contestants.filter(
                (item) => item.PositionId === activePortfolio?.Id
              )
                .sort((a, b) => a.BallotNumber - b.BallotNumber)
                .map((contestant, count) => {
                  return (
                    <CreateContestantCard
                      editing={false}
                      key={count}
                      data={contestant}
                    />
                  );
                })}
          </GridLayOut>
        </div>
      </div>
      <div
        className={`${
          showLibrary ? "right-[0px]" : "right-[-323px]"
        } transform transition-all fixed right-0 bg-white w-[320px] h-full z-[999] top-0 shadow-blend pb-16`}
      >
        {/* <div className="w-full h-[50px] bg-[#e0e0e0] mb-3">
          <span className="text-gray-500 text-2xl w-full items-center flex justify-center">
            {" "}
            <PhotoAlbum className="" />
            <span>Image Library</span>
          </span>
        </div> */}
        {showLibrary && (
          <ImageLibrary
            small={true}
            square={true}
            libraryFolder={libraryFolder}
            enableSelection={true}
          />
        )}
      </div>
    </div>
  );
}
