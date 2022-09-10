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
    setUploadeImageList,
  } = useFireStorageUploader(firebaseConfig);
  const [selectedImage, setSelected] = useState();
  const [showLibrary, setShowLibrary] = useState(false);
  const [imagesToUpload, setImages] = useState([]);
  const [enableDelete, setEnableDelete] = useState();

  useEffect(() => {}, [imagesToUpload]);

  const addToImages = (files) => {
    let modifiedFiles = [];
    var formdata = new FormData();
    Array(files.length)
      .fill()
      .map((item, index) => {
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
  const handleSelectedImage = (imageName, origin) => {
    let imageSelected;
    if (origin == "local") {
      imageSelected = multipleUploaded.uploadedFiles.filter(
        (item) => item.name === imageName
      );
    } else {
      imageSelected = uploadedImageList.filter(
        (item) => item.name === imageName
      );
    }

    setShowLibrary(false);
    setSelected(imageSelected[0]);
    // callBack(image);
  };
  const removeFromImageList = (imageName, origin) => {
    let newImageList;
    if (origin == "local") {
      newImageList = imagesToUpload.filter((image) => image.name !== imageName);
      setImages([...newImageList]);
    } else {
      newImageList = uploadedImageList.filter(
        (image) => image.name !== imageName
      );
      setUploadeImageList([...newImageList]);
    }
  };

  return (
    <ImageLibraryContext.Provider
      value={{
        selectedImage,
        showLibrary,
        deleting,
        addToImages,
        handleSelectedImage,
        removeFromImageList,
        uploadMultiple,
        imagesToUpload,
        multipleUploaded,
        deleteFromList,
        deleteFile,
        loading,
        setShowLibrary,
        getImageList,
        enableDelete,
        setEnableDelete,
        uploadedImageList,
      }}
    >
      {children}
    </ImageLibraryContext.Provider>
  );
}
export const useImageLibrary = (size, shape) => {
  let contextValues = React.useContext(ImageLibraryContext);
  return {
    size,
    shape,
    ...contextValues,
  };
};

export default ImageLibraryProvider;
