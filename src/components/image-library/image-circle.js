import { CheckCircle, Delete } from "@mui/icons-material";
import React from "react";
import { bytesToSize } from "../../contants/libraries/easy";
import CircleProgress from "./../cirle-progress/circle-progress";
import CircularProgressBar from "./../circular progress bar/CircularProgressBar";
import { useImageLibrary } from "./image-library-hook";
import { Tooltip } from "@mui/material";

export default function ImageCircle({
  index,
  deleteImage,
  image,
  info,
  uploading,
  uploaded,
  link,
  enableSelection,
  small,
  square,
  origin,
}) {
  const {
    handleSelectedImage,
    imagesToUpload,
    deleteFile,
    removeFromImageList,
    deleting,
    enableDelete,
    setEnableDelete,
    setShowLibrary,
  } = useImageLibrary();

  const imageSize = bytesToSize(image?.size);
  return (
    <div key={index} className="flex flex-col mb-6 items-center relative mr-3">
      {uploading?.state && (
        <div
          className={`${
            small ? "w-[50px] h-[50px]" : "w-[100px]  h-[100px]"
          }  absolute animate-ping top-0 rigth-0 bg-blue-600 rounded-full overflow-hidden  flex justify-center items-center`}
        ></div>
      )}
      <Tooltip title={image?.name}>
        <div
          className={`${
            small ? "w-[50px] h-[50px]" : "w-[100px]  h-[100px] "
          }  overflow-hidden relative ${
            info?.imageSizeCheck ? "border-red-100 border-4" : ""
          }  rounded-full shadow-md overflow-hidden flex justify-center items-center`}
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
            onClick={() => {
              if (!enableDelete) {
                enableSelection && handleSelectedImage(image.name, origin);
              }
            }}
            className={`${
              deleting === image.name || enableDelete
                ? "opacity-1 animate-rise"
                : "opacity-0"
            } ${
              enableSelection && "cursor-pointer"
            } absolute transition-all  z-[2]  w-full h-full top-[5px] right-0 flex justify-center items-center bg-backdrop hover:opacity-100 hover:animate-rise`}
          >
            <span className="cursor-pointer flex flex-col items-center">
              <div className="cursor-pointer  bg-white rounded-full flex flex-row justify-center items-center">
                {enableDelete || !uploaded ? (
                  <Delete
                    onClick={() => {
                      if (uploaded) {
                        deleteFile(
                          info?.libraryFolder,
                          image.name,
                          (deletedImageName) => {
                            removeFromImageList(deletedImageName, origin);
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
                ) : enableSelection ? (
                  <CheckCircle
                    onClick={() => {
                      handleSelectedImage(image.name);
                    }}
                    className="text-xl text-blue-400 cursor-pointer hover:scale-85"
                  />
                ) : null}

                {/* <span>Remove</span> */}
              </div>
            </span>
          </div>
          <img alt="" src={link} />
        </div>
      </Tooltip>
      <span
        className={`${
          small ? "w-[50px] text-xs" : " w-[100px] text-sm"
        }  text-gray-400 text-ellipsis overflow-hidden`}
      >
        {image?.name}
      </span>
      {imageSize !== "n/a" && (
        <span
          className={`${small ? "w-[50px] text-xs" : "w-[100px] text-sm"} ${
            info?.imageSizeCheck ? "text-red-400" : "text-gray-400 "
          } text-ellipsis flex overflow-hidden`}
        >
          {imageSize === "n/a" ? null : imageSize}{" "}
          {info?.imageSizeCheck && (
            <span className=" ml-2">
              exceeds {info?.maxImageSize && bytesToSize(info?.maxImageSize)}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
