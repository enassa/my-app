import React, { useEffect, useState } from "react";
import { useFireStorageUploader } from "../../hooks/fileupload-hook";
import { User } from "./../contants/ui-data";
import { firebaseConfig } from "../../config/firebase";
import { generateSuperShortId } from "./../../contants/libraries/easy";

const ImageLibraryContext = React.createContext(undefined);
function ImageLibraryProvider({ children }) {
  const {
    loading,
    multipleUploaded,
    deleting,
    getImageList,
    uploadMultiple,
    deleteFile,
    uploadedImageList,
  } = useFireStorageUploader(firebaseConfig);
  const [selectedImage, setSelected] = useState();
  const [showLibrary, setShowLibrary] = useState(false);
  const [imagesToUpload, setImages] = useState([]);

  useEffect(() => {
    console.log(imagesToUpload);
  }, [imagesToUpload]);

  const addToImages = (files) => {
    let modifiedFiles = [];
    console.log(files.length);
    var formdata = new FormData();
    Array(files.length)
      .fill()
      .map((item, index) => {
        console.log(files[index]);
        formdata.append(
          "files",
          files[index],
          `${files[index].name}_${generateSuperShortId()}`
        );
      });

    let filelistToArr = Array.from(formdata).flat(1);
    let newFileList = filelistToArr.filter((item) => item !== "files");

    setImages([...newFileList, ...imagesToUpload]);
  };

  const deleteFromList = (index) => {
    let allImages = imagesToUpload;
    allImages.splice(index, 1);
    setImages([...allImages]);
  };
  const libraryFolder = User().orgName;
  const handleSelectedImage = (image, callBack) => {
    setSelected(image);
    // callBack(image);
  };
  const updateImagesToUpload = (images) => {
    setImages([...images]);
  };

  return (
    <ImageLibraryContext.Provider
      value={{
        selectedImage,
        showLibrary,
        selectedImage,
        deleting,
        addToImages,
        handleSelectedImage,
        uploadMultiple,
        imagesToUpload,
        multipleUploaded,
        deleteFromList,
        deleteFile,
        loading,
        setShowLibrary,
        updateImagesToUpload,
        getImageList,
        uploadedImageList,
      }}
    >
      {children}
    </ImageLibraryContext.Provider>
  );
}
export const useImageLibrary = () => React.useContext(ImageLibraryContext);
export default ImageLibraryProvider;
