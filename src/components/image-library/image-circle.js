import { CheckCircle, Delete } from "@mui/icons-material";
import React from "react";
import { bytesToSize } from "../../contants/libraries/easy";
import CircleProgress from "./../cirle-progress/circle-progress";
import CircularProgressBar from "./../circular progress bar/CircularProgressBar";
import { useImageLibrary } from "./image-library-hook";

export default function ImageCircle({
  index,
  deleteImage,
  image,
  info,
  uploading,
  uploaded,
  link,
  enableSelection,
}) {
  const {
    handleSelectedImage,
    imagesToUpload,
    deleteFile,
    updateImagesToUpload,
    deleting,
  } = useImageLibrary();

  const removeFromImageList = (removedImageName) => {
    let newArr = imagesToUpload.filter(
      (image) => image.name !== removedImageName
    );
    // console.log(newArr, imagesToUpload);
    updateImagesToUpload(newArr);
  };
  imagesToUpload.length && console.log(imagesToUpload);
  return (
    <div key={index} className="flex flex-col   mb-6 items-center relative">
      {uploading?.state && (
        <div className="absolute animate-ping top-0 rigth-0 bg-blue-600 w-[200px] h-[200px] rounded-full shadow-lg overflow-hidden mr-5 flex justify-center items-center"></div>
      )}
      <div
        className={`w-[200px]  overflow-hidden relative ${
          info?.imageSizeCheck ? "border-red-200 border-4" : ""
        }  h-[200px] rounded-full shadow-lg overflow-hidden mr-5 flex justify-center items-center`}
      >
        {!uploaded && (
          <div
            className={`${
              uploading?.state ? "animate-s" : "opacity"
            } absolute  transition-all text-red-300  w-full h-full top-0 right-0 flex justify-center items-center bg-backdrop hover:opacity-100`}
          >
            <span className="cursor-pointer flex flex-col items-center">
              {
                <CircularProgressBar
                  progressColor="wheat"
                  containerColor="aliceblue"
                  radius={100}
                  progressPercentage={uploading?.percentage}
                />
              }
            </span>
          </div>
        )}

        <div
          className={`${
            deleting === image.name ? "opacity-1" : "opacity-0"
          } absolute transition-all  z-[2]  w-full h-full top-0 right-0 flex justify-center items-center bg-backdrop hover:opacity-100 hover:animate-rise`}
        >
          <span className="cursor-pointer flex flex-col items-center">
            <div className="cursor-pointer px-5 py-3 bg-white rounded-full w-[80%] h-[80%] flex flex-row justify-center items-center">
              <Delete
                onClick={() => {
                  if (uploaded) {
                    deleteFile(
                      info?.libraryFolder,
                      image.name,
                      (deletedImageName) => {
                        removeFromImageList(deletedImageName);
                      }
                    );
                  } else {
                    deleteImage(info?.index);
                  }
                }}
                className={`${
                  deleting === image.name ? "animate-bounce" : ""
                } text-xl cursor-pointer text-red-400  hover:scale-85`}
              />
              {enableSelection ? (
                <CheckCircle
                  onClick={() => {
                    handleSelectedImage(image.name);
                  }}
                  className="text-xl text-blue-400 cursor-pointer ml-2 hover:scale-85"
                />
              ) : null}
              {/* <span>Remove</span> */}
            </div>
          </span>
        </div>
        <img alt="" src={link} />
      </div>
      <span className="w-[200px] text-sm text-gray-400 text-ellipsis overflow-hidden">
        {image?.name}
      </span>
      <span
        className={`w-[200px] text-sm ${
          info?.imageSizeCheck ? "text-red-400" : "text-gray-400 "
        } text-ellipsis flex overflow-hidden`}
      >
        {bytesToSize(image?.size)}{" "}
        {info?.imageSizeCheck && (
          <span className=" ml-2">
            exceeds {info?.maxImageSize && bytesToSize(info?.maxImageSize)}
          </span>
        )}
      </span>
    </div>
  );
}
