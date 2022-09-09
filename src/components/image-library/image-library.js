import { Add, Delete, Photo, Upload } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import OverlayLoader from "../../components/overlay_loader/OverlayLoader";
import { bytesToSize } from "../../contants/libraries/easy";
import { useFireStorageUploader } from "../../hooks/fileupload-hook";
import CircularProgressBar from "./../circular progress bar/CircularProgressBar";
import CircleProgress from "../cirle-progress/circle-progress";
import ImageCircle from "./image-circle";
import { LinearProgress } from "@mui/material";
import { useImageLibrary } from "./image-library-hook";
import { User } from "./../contants/ui-data";
import { useLayoutEffect } from "react";

export default function ImageLibrary({ libraryFolder }) {
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
  } = useImageLibrary();
  const imageInput = React.createRef();
  //   const maxImageSize = 1100000;
  const maxImageSize = 210000;
  console.log(imagesToUpload);
  useLayoutEffect(() => {
    console.log(libraryFolder);
    getImageList(libraryFolder);
  }, []);
  return (
    <div>
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
          addToImages(e.target.files);
        }}
      />
      {/* {loading && (
        <div className="top-0 bg-backdrop2 fixed right-0 h-full w-full flex justify-center items-center">
          <OverlayLoader />
        </div>
      )} */}

      <div className="relative w-full   justify-between ">
        <div className="w-full h-[20px] bg-white-500">
          {loading && <LinearProgress />}
        </div>

        {imagesToUpload.length || uploadedImageList.length ? (
          <div className="w-full max-h-[400px]  overflow-y-scroll flex justify-start flex-wrap ">
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
                    name: "",
                    size: 200,
                  }}
                  info={{
                    index,
                    imageSizeCheck: false,
                    maxImageSize,
                    libraryFolder,
                  }}
                  uploaded={true}
                  link={item}
                  enableSelection={false}
                />
              );
            })}
            {imagesToUpload.map((image, index) => {
              let imageSizeCheck = image.size > maxImageSize;

              const isUploaded = multipleUploaded?.uploadedFileNames?.includes(
                image.name
              );

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
                  info={{ index, imageSizeCheck, maxImageSize, libraryFolder }}
                  uploaded={isUploaded}
                  link={URL.createObjectURL(image)}
                  enableSelection={false}
                />
              );
              // return <img alt="" src={url} />;
            })}
          </div>
        ) : (
          <div className="w-full cursor-pointer flex justify-center flex-col items-center h-[200px] rounded-md border overflow-hidden ">
            <Photo
              onClick={() => {
                imageInput.current.click();
              }}
              style={{ fontSize: 60 }}
              className="h-[100px] w-8 text-gray-400 hover:text-gray-700 cursor-pointer"
            />
            <span className="text-gray-400">
              {" "}
              Click to upload or drag and drop images to add to your library
            </span>
          </div>
        )}
        {imagesToUpload.length !== 0 && !loading ? (
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
        ) : null}
      </div>
    </div>
  );
}
