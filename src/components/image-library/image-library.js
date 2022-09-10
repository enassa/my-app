import {
  Add,
  AddCircle,
  Delete,
  Photo,
  Upload,
  UploadFile,
} from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import OverlayLoader from "../../components/overlay_loader/OverlayLoader";
import { bytesToSize } from "../../contants/libraries/easy";
import { useFireStorageUploader } from "../../hooks/fileupload-hook";
import CircularProgressBar from "./../circular progress bar/CircularProgressBar";
import CircleProgress from "../cirle-progress/circle-progress";
import ImageCircle from "./image-circle";
import { LinearProgress, Switch, Tooltip } from "@mui/material";
import { useImageLibrary } from "./image-library-hook";
import { User } from "./../contants/ui-data";
import { useLayoutEffect } from "react";
import GridLayOut from "../grid_layout/GridLayout";
import LinearProgressBar from "../linear progressBar/LinearProgressBar";

export default function ImageLibrary({
  libraryFolder,
  small,
  square,
  enableSelection,
}) {
  const {
    selectedImage,
    addToImages,
    handleSelectedImage,
    uploadMultiple,
    imagesToUpload,
    multipleUploaded,
    deleteFromList,
    deleteFile,
    uploadedImageList,
    loading,
    getImageList,
    enableDelete,
    setEnableDelete,
  } = useImageLibrary();
  const imageInput = React.createRef();
  const maxImageSize = 210000;
  let value = React.createRef();
  value = 0;
  let refValue = useRef(0);
  useLayoutEffect(() => {
    if (value === 0 && !uploadedImageList.length) {
      getImageList(libraryFolder);
    }
    value++;
  }, []);

  const [readyForUpload, setReadyForUpload] = useState(false);
  return (
    <div className="w-full h-full flex flex-col px-2">
      <input
        className="w-0 h-0 invisible"
        type="file"
        multiple
        ref={imageInput}
        onChange={(e) => {
          // uploadAndAddToImageList(e.target.files[0], "image/").then((resp) => {
          //   console.log(resp);
          // });
          // uploadAndGetUrl(e.target.files[0], "image/").then((res) => {
          //   console.log("=====", res);
          // });
          setReadyForUpload(true);
          addToImages(e.target.files);
        }}
      />
      {/* {loading && (
        <div className="top-0 bg-backdrop2 fixed right-0 h-full w-full flex justify-center items-center">
          <OverlayLoader />
        </div>
      )} */}

      <div className="relative w-full h-full flex flex-col mt-3">
        <div className="w-full min-h-[55px] h-[55px] bg-white-500 bg-blue-50 mb-3 overflow-hidden  rounded-lg items-center flex-col flex">
          <div className="w-full bg-white-500 h-[5px]">
            {loading && <LinearProgress className="w-full" />}
          </div>
          <div className="w-full h-full   bg-blue-50 flex items-center px-2 justify-between">
            <div className="w-full h-full flex items-center">
              <Tooltip title="Add files">
                <div
                  onClick={() => {
                    uploadMultiple(imagesToUpload, libraryFolder);
                    setReadyForUpload(false);
                  }}
                  className="relative rounded-full w-[30px] h-[30px] mr-3"
                >
                  <span className="h-[30px]  absolute  top-0 right-0  w-[30px]  cursor-pointer bg-white hover:bg-blue-100 hover:text-blue-600 text-blue-500 flex justify-center items-center rounded-full ">
                    <UploadFile style={{ fontSize: 15 }} className="text-sm" />
                  </span>
                  {readyForUpload && (
                    <span className="h-[30px] w-[30px] cursor-pointer animate-ping bg-blue-100 flex justify-center items-center rounded-full p-3"></span>
                  )}
                </div>
              </Tooltip>
              <Tooltip title="Upload files">
                <div
                  onClick={() => {
                    imageInput.current.click();
                  }}
                  className="relative rounded-full w-[30px] h-[30px]"
                >
                  <span className="h-[30px]  absolute  top-0 right-0  w-[30px]  cursor-pointer bg-white hover:bg-blue-100 hover:text-blue-600 text-blue-500 flex justify-center items-center rounded-full p-3">
                    <AddCircle style={{ fontSize: 15 }} className="text-sm" />
                  </span>
                </div>
              </Tooltip>
            </div>
            <>
              <div className="whitespace-nowrap">
                <Delete className="text-red-300" />
                <Switch
                  checked={enableDelete}
                  onChange={(e) => {
                    setEnableDelete(e.target.checked);
                  }}
                />
              </div>
            </>
          </div>
        </div>

        {imagesToUpload.length || uploadedImageList.length ? (
          <div className="w-full  overflow-y-auto flex justify-start flex-wrap ">
            <GridLayOut
              style={{
                gridTemplateColumns: `repeat(${small ? "4" : "5"},1fr)`,
                justifyContent: "start",
                padding: 10,
                rowGap: 10,
              }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`${
                    small ? "w-[50px] h-[50px]" : "w-[100px] h-[100px]"
                  } bg-gray-100 text-blue-500   hover:text-blue-600 flex cursor-pointer justify-center text-xs flex-col items-center  shadow-md rounded-full overflow-hidden"
                `}
                >
                  <AddCircle
                    onClick={() => {
                      imageInput.current.click();
                    }}
                  />
                </div>
                <span
                  className={`${
                    small
                      ? "w-[50px] text-xs text-center"
                      : " w-[100px] text-sm"
                  }  text-gray-400 text-ellipsis overflow-hidden`}
                >
                  Add
                </span>
                {/* <span>Add</span> */}
              </div>

              {imagesToUpload.map((image, index) => {
                let imageSizeCheck = image.size > maxImageSize;

                const isUploaded =
                  multipleUploaded?.uploadedFileNames?.includes(image.name);

                const isCurrentlyUploading =
                  multipleUploaded?.uploadProgress?.fileName === image.name;

                const uploadProgress = isCurrentlyUploading
                  ? multipleUploaded.uploadProgress.progress
                  : 0;

                return (
                  <ImageCircle
                    key={index}
                    deleteImage={(id) => {
                      deleteFromList(id);
                    }}
                    uploading={{
                      state: isCurrentlyUploading,
                      percentage: uploadProgress,
                    }}
                    image={image}
                    info={{
                      index,
                      imageSizeCheck,
                      maxImageSize,
                      libraryFolder,
                    }}
                    uploaded={isUploaded}
                    link={URL.createObjectURL(image)}
                    enableSelection={enableSelection}
                    small={small}
                    square={square}
                    origin="local"
                  />
                );
                // return <img alt="" src={url} />;
              })}
              {uploadedImageList.map((item, index) => {
                return (
                  <ImageCircle
                    key={index}
                    deleteImage={(id) => {
                      deleteFromList(id);
                    }}
                    uploading={{
                      state: false,
                      percentage: 0,
                    }}
                    image={{
                      name: item.name,
                      size: 0,
                    }}
                    info={{
                      index,
                      imageSizeCheck: false,
                      maxImageSize,
                      libraryFolder,
                    }}
                    uploaded={true}
                    link={item.url}
                    enableSelection={enableSelection}
                    small={small}
                    square={square}
                  />
                );
              })}
            </GridLayOut>
          </div>
        ) : (
          <div className="w-full cursor-pointer p-3 flex justify-center flex-col items-center h-[200px] rounded-md border overflow-hidden ">
            <Photo
              onClick={() => {
                imageInput.current.click();
              }}
              style={{ fontSize: 60 }}
              className=" w-8 text-gray-400 hover:text-gray-700 cursor-pointer"
            />
            <span className="text-gray-400 p-3">
              {" "}
              Click to upload or drag and drop images to add to your library
            </span>
          </div>
        )}
        {/* {imagesToUpload.length !== 0 && !loading ? (
          <div className="absolute right-5 w-[60px] h-[300px]flex flex-col items-center top-0">
            <div className=" w-[50px] h-[50px] hover:bg-blue-400 text-blue-300 hover:text-white flex justify-center items-center bg-white rounded-full shadow-lg">
              <div className="h-full w-full rounded-full flex justify-center   items-center ">
                <Upload
                  onClick={() => {
                    uploadMultiple(imagesToUpload, libraryFolder);
                  }}
                  style={{ fontSize: 30 }}
                  className="  cursor-pointer rounded-full  "
                />
              </div>
            </div>
            <div className=" w-[50px] mt-3 h-[50px] flex justify-center hover:bg-blue-400 text-blue-300 hover:text-white items-center bg-white rounded-full shadow-lg">
              <div className="h-full w-full rounded-full flex justify-center  items-center">
                <Add
                  onClick={() => {
                    imageInput.current.click();
                  }}
                  style={{ fontSize: 30 }}
                  className="cursor-pointer rounded-full  "
                />
              </div>
            </div>
          </div>
        ) : null} */}
      </div>
    </div>
  );
}
