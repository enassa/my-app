import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { generateSuperShortId, recursion } from "../contants/libraries/easy";
import { errorToast, successToast } from "./../components/toast/toastify";
import { useEffect } from "react";

export const useFireStorageUploader = (firebaseConfig, folder = "/") => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const analytics = getAnalytics(app);

  const [uploadedImageList, setUploadeImageList] = useState([]);
  const [justUploadedImage, setJustUploadedImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [multipleUploaded, setMultipleUploadTracker] = useState({
    count: 0,
    maxCount: 0,
    uploadedFiles: [],
    uploadedFileNames: [],
    uploadProgress: {},
  });
  const [deleting, setDeleting] = useState();

  const uploadAndGetUrl = async (imageToUpload, folderPath = folder) => {
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

  const uploadAndAddToImageList = async (
    imageToUpload,
    folderPath = folder
  ) => {
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
  const getImageList = async (folderPath = folder, callBack) => {
    const imageListRef = ref(storage, folderPath);
    setLoading(true);
    if (folderPath === undefined)
      return { error: "path of bucket directory required" };
    return listAll(imageListRef)
      .then((response) => {
        response.items.forEach((item, index) => {
          const nameOfFile = response.items[index]._location.path.split("/")[1];
          getDownloadURL(item)
            .then((url) => {
              setUploadeImageList((prev) => [
                ...prev,
                { url, name: nameOfFile },
              ]);
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
                message: "Could not get file url",
              };
            })
            .finally(() => {
              setLoading(false);
            });
        });
      })
      .catch((err) => {
        console.log(err);
        return {
          error: err,
          success: false,
          message: "Could not fetch files from library",
        };
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const uploadMultiple = (imagesToUpload, folderPath = folder) => {
    setLoading(true);
    const fileListToArr = Array.from(imagesToUpload);
    const totalCount = fileListToArr?.length;
    if (imagesToUpload === undefined) return;
    if (!totalCount) return;
    // setMultipleUploadTracker({
    //   count: 0,
    //   maxCount: totalCount,
    //   uploadedFiles: [],
    // });

    const uploadOneByOne = (remainingFilesCount) => {
      let currentFileIndex = totalCount - remainingFilesCount;
      let currentFile = fileListToArr[totalCount - remainingFilesCount];
      const imageRef = ref(storage, `${folderPath}/${currentFile?.name}`);
      // const imageRef = ref(
      //   storage,
      //   `${folderPath}/${currentFile?.name + generateSuperShortId()}`
      // );
      // check if file is already uploaded
      if (multipleUploaded.uploadedFileNames.includes(currentFile.name)) {
        setLoading(false);
        return;
      }

      const uploadTask = uploadBytesResumable(imageRef, currentFile);
      uploadTask.on(
        "state_changed",
        // Track progress
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setMultipleUploadTracker({
            ...multipleUploaded,
            uploadProgress: {
              fileName: currentFile.name,
              progress: progress,
            },
          });
          // console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
            default:
          }
        },
        // THandle error
        (err) => {
          setLoading(false);
          return {
            error: err,
            success: false,
            message:
              remainingFilesCount === totalCount
                ? "File upload was not successull"
                : "Sme files were not uploaded",
          };
        },
        // Handle successfull upload
        (snapshot) => {
          return getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              let list = multipleUploaded.uploadedFiles;
              let fileNames = multipleUploaded.uploadedFileNames;
              list.push({ url, name: currentFile.name });
              fileNames.push(currentFile?.name);
              setMultipleUploadTracker({
                ...multipleUploaded,
                count: currentFileIndex + 1,
                maxCount: totalCount,
                uploadedFiles: list,
                uploadedFileNames: fileNames,
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
            .catch((error) => {
              // console.log("faliled", err);
              setLoading(false);
              errorToast(
                remainingFilesCount === totalCount
                  ? "File upload was not successull"
                  : "Some files were not uploaded"
              );
              console.log(error);
              return {
                error,
                success: false,
                message:
                  remainingFilesCount === totalCount
                    ? "File upload was not successull"
                    : "Some files were not uploaded",
              };
            });
        }
      );
    };
    uploadOneByOne(totalCount);
  };
  const deleteFile = (folder, fileName, callBack) => {
    setLoading(true);
    setDeleting(fileName);
    // Create a reference to the file to delete
    const desertRef = ref(storage, `${folder}/${fileName}`);
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        successToast("File deleted Succesfully");
        setLoading(false);
        setDeleting(null);
        callBack(fileName);
        let newuploadedFileNames = multipleUploaded.uploadedFileNames.filter(
          (item) => item !== fileName
        );
        setMultipleUploadTracker({
          ...multipleUploaded,
          uploadedFileNames: newuploadedFileNames,
        });
        // File deleted successfully
      })
      .catch((error) => {
        setLoading(false);
        setDeleting(null);
        errorToast("Deletion was not succesfull, The file was not found");
        // Uh-oh, an error occurred!
      });
  };

  return {
    loading,
    justUploadedImage,
    uploadedImageList,
    multipleUploaded,
    deleting,
    getImageList,
    uploadAndGetUrl,
    uploadAndAddToImageList,
    uploadMultiple,
    deleteFile,
    setUploadeImageList,
  };
};
