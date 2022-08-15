import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { generateSuperShortId, recursion } from "../contants/libraries/easy";

export const useFireStorageUploader = (firebaseConfig) => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const analytics = getAnalytics(app);

  const [imageUpload, setImageUpload] = useState();
  const [uploadedImageList, setUploadeImageList] = useState([]);
  const [justUploadedImage, setJustUploadedImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [multipleUploaded, setMultipleUploadTracker] = useState({
    count: 0,
    maxCount: 0,
    uploadedFiles: [],
  });

  const uploadAndGetUrl = async (imageToUpload, folderPath = "") => {
    setLoading(true);
    if (imageToUpload === null) return null;
    const imageRef = ref(
      storage,
      `${folderPath}/${imageToUpload?.name + generateSuperShortId()}`
    );
    return uploadBytes(imageRef, imageToUpload).then((snapshort) => {
      return getDownloadURL(snapshort.ref)
        .then((url) => {
          setJustUploadedImage(url);
          return {
            data: { url },
            success: true,
            message: "File has been uploaded",
          };
        })
        .catch((err) => {
          return {
            error: err,
            success: false,
            message: "File upload was not successull",
          };
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const uploadAndAddToImageList = async (imageToUpload, folderPath = "") => {
    setLoading(true);
    if (imageToUpload === null) return null;
    const imageRef = ref(
      storage,
      `${folderPath}/${imageToUpload?.name + generateSuperShortId()}`
    );
    return uploadBytes(imageRef, imageToUpload).then((snapshort) => {
      return getDownloadURL(snapshort.ref)
        .then((url) => {
          setUploadeImageList((prev) => [...prev, url]);
          return {
            data: { url },
            success: true,
            message: "File has been uploaded",
          };
        })
        .catch((err) => {
          return {
            error: err,
            success: false,
            message: "File upload was not successull",
          };
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };
  const getImageList = async (folderPath = "/") => {
    const imageListRef = ref(storage, folderPath);
    setLoading(true);
    if (folderPath === undefined)
      return { error: "path of bucket directory required" };
    return listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item)
          .then((url) => {
            setUploadeImageList((prev) => [...prev, url]);
            return {
              data: { url },
              success: true,
              message: "File has been uploaded",
            };
          })
          .catch((err) => {
            console.log(err);
            return {
              error: err,
              success: false,
              message: "File upload was not successull",
            };
          })
          .finally(() => {
            setLoading(false);
          });
      });
    });
  };

  const uploadMultiple = (imagesToUpload, folderPath = "") => {
    setLoading(true);
    const fileListToArr = Array.from(imagesToUpload);
    const totalCount = fileListToArr?.length;
    if (imagesToUpload === undefined) return;
    if (!totalCount) return;
    setMultipleUploadTracker({
      count: 0,
      maxCount: totalCount,
      uploadedFiles: [],
    });

    const uploadOneByOne = (remainingFilesCount) => {
      let currentFileIndex = totalCount - remainingFilesCount;
      let currentFile = fileListToArr[totalCount - remainingFilesCount];
      const imageRef = ref(
        storage,
        `${folderPath}/${currentFile?.name + generateSuperShortId()}`
      );
      return uploadBytes(imageRef, currentFile).then((snapshort) => {
        return getDownloadURL(snapshort.ref)
          .then((url) => {
            let list = multipleUploaded.uploadedFiles;
            list.push(url);
            setMultipleUploadTracker({
              count: currentFileIndex + 1,
              maxCount: totalCount,
              uploadedFiles: list,
            });

            if (remainingFilesCount > 1) {
              uploadOneByOne(remainingFilesCount - 1);
            } else {
              setLoading(false);
              return {
                data: { url: multipleUploaded.uploadedFiles },
                success: true,
                message: "File has been uploaded",
              };
            }
          })
          .catch((err) => {
            setLoading(false);
            return {
              error: err,
              success: false,
              message:
                remainingFilesCount === totalCount
                  ? "File upload was not successull"
                  : "Sme files were not uploaded",
            };
          });
      });
    };
    uploadOneByOne(totalCount);
  };

  return {
    loading,
    justUploadedImage,
    uploadedImageList,
    multipleUploaded,
    getImageList,
    uploadAndGetUrl,
    uploadAndAddToImageList,
    uploadMultiple,
  };
};
