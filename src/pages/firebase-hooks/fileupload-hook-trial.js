import React, { useEffect } from "react";
import { useState } from "react";
import OverlayLoader from "../../components/overlay_loader/OverlayLoader";
import { firebaseConfig } from "../../config/firebase";
import { useFireStorageUploader } from "../../hooks/fileupload-hook";
export default function Fireabasetrial() {
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
  const [imageTuPload, setImage] = useState();
  console.log(multipleUploaded);
  return (
    <div>
      {loading && (
        <div className="top-0 bg-backdrop2 fixed right-0 h-full w-full flex justify-center items-center">
          <OverlayLoader />
        </div>
      )}
      <input
        type="file"
        multiple
        onChange={(e) => {
          // uploadAndAddToImageList(e.target.files[0], "image/").then((resp) => {
          //   console.log(resp);
          // });
          // uploadAndGetUrl(e.target.files[0], "image/").then((res) => {
          //   console.log("=====", res);
          // });
          uploadMultipleAndAddToList(e.target.files, "image/");
        }}
      />
      <button
        onClick={() => {
          // uploadAndGetUrl().then((res) => {
          //   console.log(res);
          // });
          // getImageList("image").then((res) => {
          //   console.log(res);
          // });
        }}
      >
        Upload
      </button>
      {uploadedImageList.map((url) => {
        return (
          <div>
            <img alt="" src={url} />;<span>url</span>
          </div>
        );
        // return <img alt="" src={url} />;
      })}
      <div>{justUploadedImage}</div>
      <img alt="" src={justUploadedImage} />
      <div>
        <strong>
          {multipleUploaded.count} outf of {multipleUploaded.maxCount}
        </strong>
      </div>
    </div>
  );
}
