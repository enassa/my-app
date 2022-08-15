import { Add, Delete, Photo, Upload } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import OverlayLoader from "../../components/overlay_loader/OverlayLoader";
import { firebaseConfig } from "../../config/firebase";
import { bytesToSize } from "../../contants/libraries/easy";
import { useFireStorageUploader } from "../../hooks/fileupload-hook";
export default function ImagetManager() {
  const {
    loading,
    justUploadedImage,
    uploadedImageList,
    multipleUploaded,
    getImageList,
    uploadAndGetUrl,
    uploadMultiple,
    uploadAndAddToImageList,
    uploadMultipleAndAddToList,
  } = useFireStorageUploader(firebaseConfig);
  const [imagesTuPload, setImages] = useState([]);

  const imageInput = React.createRef();

  const uploadImages = (index) => {
    uploadMultiple(uploadImages, "image/");
  };

  const addToSelected = (files) => {
    let filelistToArr = Array.from(files);
    setImages([...filelistToArr, ...imagesTuPload]);
  };
  const deleteFromList = (index) => {
    let allImages = imagesTuPload;
    allImages.splice(index, 1);
    setImages([...allImages]);
  };
  //   const maxImageSize = 1100000;
  const maxImageSize = 210000;
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
          addToSelected(e.target.files);
        }}
      />
      {loading && (
        <div className="top-0 bg-backdrop2 fixed right-0 h-full w-full flex justify-center items-center">
          <OverlayLoader />
        </div>
      )}

      <div className="relative w-full   justify-between ">
        {imagesTuPload.length ? (
          <div className="w-full max-h-[400px]  overflow-y-scroll flex justify-start flex-wrap ">
            {imagesTuPload.map((image, index) => {
              let imageSizeCheck = image.size > maxImageSize;
              return (
                <div key={index} className="flex flex-col   mb-6 items-center">
                  <div
                    className={`w-[200px]  overflow-hidden relative ${
                      imageSizeCheck ? "border-red-200 border-4" : ""
                    }  h-[200px] rounded-full shadow-lg overflow-hidden mr-5 flex justify-center items-center`}
                  >
                    <div className="absolute transition-all text-red-300  w-full h-full top-0 right-0 flex justify-center items-center bg-backdrop opacity-0 hover:opacity-100">
                      <span
                        onClick={() => {
                          deleteFromList(index);
                        }}
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Delete className="text-xl hover:text-3xl cursor-pointer" />
                        <span>Remove</span>
                      </span>
                    </div>
                    <img alt="" src={URL.createObjectURL(image)} />
                  </div>
                  <span className="w-[200px] text-sm text-gray-400 text-ellipsis overflow-hidden">
                    {image?.name}
                  </span>
                  <span
                    className={`w-[200px] text-sm ${
                      imageSizeCheck ? "text-red-400" : "text-gray-400 "
                    } text-ellipsis flex overflow-hidden`}
                  >
                    {bytesToSize(image?.size)}{" "}
                    {imageSizeCheck && (
                      <span className=" ml-2">
                        exceeds {bytesToSize(maxImageSize)}
                      </span>
                    )}
                  </span>
                </div>
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
              Clickt to upload or drag and drop images to add to your library
            </span>
          </div>
        )}
        {imagesTuPload.length !== 0 && (
          <div className="absolute right-5 w-[60px] h-[300px]flex flex-col items-center top-0">
            <div className=" w-[50px] h-[50px] hover:bg-blue-400 text-blue-300 hover:text-white flex justify-center items-center bg-white rounded-full shadow-lg">
              <div className="h-full w-full rounded-full flex justify-center   items-center ">
                <Upload
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
        )}
      </div>
    </div>
  );
}
