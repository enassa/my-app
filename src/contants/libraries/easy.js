export const colors = [
  "aqua",
  "black",
  "blue",
  "fuchsia",
  "gray",
  "green",
  "lime",
  "maroon",
  "navy",
  "olive",
  "orange",
  "purple",
  "red",
  "silver",
  "teal",
  "grey",
  "yellow",
];

export const getScrollValues = (e) => {
  let scrollTop = e.target.scrollTop;
  let scrollBottom = e.target.scrollBottom;
  let scrollRight = e.target.scrollRight;
  let scrollLeft = e.target.scrollLeft;
  return {
    scrollTop,
    scrollBottom,
    scrollRight,
    scrollLeft,
  };
};

export const getWindowWidth = (e) => {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  return windowWidth;
};
export const SortWithInsertion = (arr) => {};
export const checkIfArray = (arr) => {
  let isArr = Array.isArray(arr);
  if (isArr) return true;
  return false;
};

export const cssModules = (styleObject) => (classList) => {
  const generateClassString = (list, myClass) => {
    let output = list;
    if (output) {
      output += " "; // appends a space if list is not empty
    }
    if (Array.isArray(myClass)) {
      output += myClass.reduce(generateClassString, ""); // recursion to deal with Arrays
    } else if (styleObject[myClass]) {
      output += styleObject[myClass];
      // append styleObject['myClass'] value to the list if it is defined in styleObject
    } else if (typeof myClass === "string") {
      output += myClass; // append 'myClass' directly to the list
    }
    return output;
  };
  let classArray = classList.split(" ");
  return classArray.reduce(generateClassString, "");
};

// export const localStorageGet = (index) => {
//   try {
//     const serializedData = localStorage.getItem(index);
//     if (serializedData === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedData);
//   } catch (err) {
//     return undefined;
//   }
// };

// export const localStorageSave = (data,index) => {
//   try {
//     const serializedData = JSON.stringify(data);
//     localStorage.setItem(index, serializedData);
//   }catch (err) {
//     return err;
//   }
// };

export const getAsObjectFromSession = (index) => {
  try {
    const serializedData = sessionStorage.getItem(index);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    return err;
  }
};
export const saveObjectInSession = (key, value) => {
  try {
    const serializedData = JSON.stringify(value);
    sessionStorage.setItem(key, serializedData);
  } catch (err) {
    return err;
  }
};
export const getAsObjectFromLocalStorage = (index) => {
  try {
    const serializedData = localStorage.getItem(index);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    return err;
  }
};
export const saveObjectInLocalStorage = (key, value) => {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    return err;
  }
};

export const sessionSave = (key, value) => {
  sessionStorage.setItem(key, value);
};
export const sessionGet = (key) => {
  const value = localStorage.getItem(key);
  return value;
};
export const localStorageSave = (key, value) => {
  localStorage.setItem(key, value);
};
export const localStorageGet = (key) => {
  const value = localStorage.getItem(key);
  return value;
};
export const checkIfLoggedIn = () => {
  let userStateFromSession = localStorage.getItem("isActive");
  console.log(userStateFromSession);
  let userState = parseInt(userStateFromSession);
  if (userState === 1) {
    return true;
  } else {
    return false;
  }
};
export const CheckIfInSight = (callback, element) => {
  let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 1.0,
  };
  const callBack = (element) => {
    if (element.intersectionRatio <= 0) return 0;
    return 1;
  };
  let observer = new IntersectionObserver(callBack, options);
  observer.observe(element);
};

export const LoadMoreObserver = (callback, element) => {
  let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 1.0,
  };
  const callBack = (element) => {
    // console.log(element)
    if (element.intersectionRatio <= 0) return;
    if (typeof callback === "function") {
      callback();
      console.log("working");
    } else {
      console.log("Error: No call back function passed");
    }
    // callback===undefined||callback===null?alert("Error: No call back function passed"):callback()
  };
  let observer = new IntersectionObserver(callBack, options);
  observer.observe(element);
};

export const readyForMapping = (array) => {
  //If it's not an array, return FALSE.
  if (!Array.isArray(array)) {
    return false;
  }
  //If it is an array, check its length property
  if (array.length == 0) {
    //Return TRUE if the array is empty
    return false;
  }
  //Otherwise, return FALSE.
  return true;
};

export const sliceArrayInIntervals = (
  objectToSlice,
  lowerlimit,
  upperlimit
) => {
  let slicedData = objectToSlice.slice(lowerlimit, upperlimit);
  return slicedData;
};
// export const searchArray = function(arr, regex) {
//   let matches=[], i;
//   for (i=0; i<arr.length; i++) {
//     if (arr[i].match(regex)) matches.push(arr[i]);
//   }
//   return matches;
// };

export const checkRegex = (myString, pattern, fieldName) => {
  if (pattern === null) {
    return undefined;
  } else {
    let regex = new RegExp(pattern);
    let regexState = regex.test(myString);
    if (regexState) {
      return true;
    } else {
      return false;
    }
  }
};
export const regexCheck = (myString, pattern) => {
  let regex = new RegExp(pattern);
  let regexState = regex.test(myString);
  return regexState;
};
export const regexChecker = (value, pattern) => {
  const re = pattern;
  return re.test(value);
};
export const convertToJson = (myObj) => {
  let obj = JSON.stringify(myObj);
  return obj;
};
export const searchContains = (dataToSearchIn, searchValue, property) => {
  try {
    let reg = new RegExp("[^,]*" + searchValue + "[^,]*", "ig");
    // console.log(dataToSearchIn)
    const searchResults = dataToSearchIn.filter((item) =>
      item[property].match(reg)
    );
    return searchResults;
  } catch {
    return;
  }
};
export const ifContainsWord = (value) => {
  let reg = new RegExp("[^,]*" + value + "[^,]*", "ig");
  const regexState = value.match(reg);
  return regexState;
};
export const searchArrayWithRegex = (dataToSearchIn, regex, property) => {
  const searchResults = dataToSearchIn.filter((item) =>
    item[property].match(regex)
  );
  return searchResults;
};
export const deleteValueFromArray = (arr, value) => {
  let newArr = arr.filter((item) => item !== value);
  return newArr;
};
export const removeDuplicatesFromArray = (arr, value) => {
  var seen = {};
  return arr.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
};
export const removeDuplicatesFromArrayOfObjects = (arr, value) => {
  var prims = { boolean: {}, number: {}, string: {} },
    objs = [];
  return arr.filter(function (item) {
    var type = typeof item;
    if (type in prims)
      return prims[type].hasOwnProperty(item)
        ? false
        : (prims[type][item] = true);
    else return objs.indexOf(item) >= 0 ? false : objs.push(item);
  });
};
export const searchArrayForWord = (dataToSearchIn, searchValue, property) => {
  const searchResults = dataToSearchIn.filter((item) => {
    return item[property].includes(searchValue);
  });
  return searchResults;
};
export const getRandomStringKey = (limit = 9999999) => {
  return Math.random(limit).toString();
};
export const checkIfObjectExistInArray = (arrayOfObject, objectToCheck) => {
  let checkIfExits = arrayOfObject.indexOf(objectToCheck);
  if (checkIfExits !== -1) {
    return true;
  }
  return false;
};
export const getRandomColor = () => {
  let selectedColor = colors[Math.floor(Math.random() * colors.length)];
  return selectedColor;
};
export const getRandomFromArray = (arr) => {
  let selected = arr[Math.floor(Math.random() * arr.length)];
  return selected;
};
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
export const objectIsEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
};
// If any prop is empty return
export const noPropIsEmpty = (obj) => {
  for (var prop in obj) {
    //obj has property and non of the properties are empty, return true
    if (
      obj.hasOwnProperty(prop) &&
      (obj[prop] === null ||
        obj[prop] === undefined ||
        obj[prop] === "" ||
        obj[prop] === " ")
    ) {
      console.log("2", false);
      return true;
    } else {
      return false;
    }
  }
};
export const anyPropertyIsEmptyOrNull = (obj, property) => {
  for (var prop in obj) {
    if (obj[prop] === "" || obj[prop] === null || obj[prop] === undefined) {
      console.log(obj[prop]);
      return prop;
    } else {
      return "success";
    }
  }
};
export const clearSessionStorage = () => {
  let value = sessionStorage.clear();
  return value;
};
export const clearLocalStorage = () => {
  let value = localStorage.clear();

  return value;
};
export const removeItemFromLocalStorage = (item) => {
  let value = localStorage.removeItem(item);
  return value;
};

export const randomDate = (start, end) => {
  return new Date(+new Date() - Math.floor(Math.random() * 10000000000));
};
// export const randomMomentDat = () =>
// randomDate(new Date(2012, 0, 1), new Date())
export const randomDOB = () => {
  let dob;

  //set a range of years
  let min = 1900;
  let max = 2004;

  // Math.ceil prevents the value from being 0;
  let month = Math.ceil(Math.random() * 12);
  let day = Math.ceil(Math.random() * 28);
  let year = Math.floor(Math.random() * (max - min) + min);

  //this ensures that the format will stay mm/dd/yyyy;
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  //concatenates random dob in mm/dd/yyyy format;
  dob = month + "/" + day + "/" + year;

  return dob;
};
export const getRandomInt = (max = 20) => {
  return Math.floor(Math.random() * max);
};
const startingYear = parseInt(new Date().getFullYear());
const endYear = startingYear - 100;

export const generateYears = (
  start = startingYear,
  stop = endYear,
  step = 1
) => {
  let objects = [];
  let startYear = start + 1;

  for (let i = start; i >= stop; i--) {
    startYear -= step;
    objects.push({ year: `${startYear}` });
  }
  return objects;
};
export const generateRandomString = (
  length = 20,
  chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
) => {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  // console.log(result.toUpperCase())
  return result.toUpperCase();
};

let i = 0;
var txt = "Lorem ipsum typing effect!"; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */
var length = 0;

export const typeWriter = (text = "Some text", speed = 50, element) => {
  if (element === undefined) return;
  console.log(element);
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
};
export const makeObjectFromArrayOfObjects = (
  arrOfObjects,
  answers = undefined
) => {
  let combinedObjects = {};
  arrOfObjects.map((item, index) => {
    for (let property in item) {
      combinedObjects[property] = item[property];
    }
  });
  if (answers === undefined) return combinedObjects;
  for (let property in answers) {
    combinedObjects[property] = answers[property];
  }
  return combinedObjects;
};
export const getFirstLetter = (str) => {
  let str1 = "";
  try {
    str1 = str.charAt(0).toUpperCase();
  } catch {}
  return str1;
};
export const capitalizeFirstLetter = (str) => {
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};
export const cloneObject = (obj) => {
  let deepClone = JSON.parse(JSON.stringify(obj));
  return deepClone;
};
export const getTodaysDate = (obj, format, delimeter = "-") => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  if (format === "YYYY-MM-DD") {
    today = yyyy + delimeter + mm + delimeter + dd;
  } else if (format === "YYYY-MM-DD") {
    today = yyyy + delimeter + mm + delimeter + dd;
  } else if (format === "MM-DD-YYYY") {
    today = mm + delimeter + dd + delimeter + yyyy;
  } else {
    today = yyyy + delimeter + mm + delimeter + dd;
  }
  return today;
};
export const getTodaysDateWithoutDash = (obj, format, delimeter = "-") => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  if (format === "YYYY-MM-DD") {
    today = yyyy + mm + dd;
  } else if (format === "YYYY-MM-DD") {
    today = yyyy + mm + dd;
  } else if (format === "MM-DD-YYYY") {
    today = mm + dd + yyyy;
  } else {
    today = yyyy + mm + dd;
  }
  return today;
};
export const getTommorowsDate = (obj, format, delimeter = "-") => {
  var today = new Date();
  var day = `${parseInt(today.getDate()) + 1}`;
  var dd = String(day).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  if (format === "YYYY-MM-DD") {
    today = yyyy + delimeter + mm + delimeter + dd;
  } else if (format === "YYYY-MM-DD") {
    today = yyyy + delimeter + mm + delimeter + dd;
  } else if (format === "MM-DD-YYYY") {
    today = mm + delimeter + dd + delimeter + yyyy;
  } else {
    today = yyyy + delimeter + mm + delimeter + dd;
  }
  return today;
};

export const makeRandomId = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const getFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};
export const getFormData2 = (object) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());

export const convertToUrlEncoded = (objs) => {
  let value = new URLSearchParams(Object.entries(objs)).toString();
  return value;
};
export const getTime = () => {
  var d = new Date(); // for now
  let hours = d.getHours(); // => 9
  let minutes = d.getMinutes(); // =>  30
  let seconds = d.getSeconds(); // => 51
  let time = `${hours}:${minutes}:${seconds}`;
  return time;
};
export const getDateAndTime = () => {
  var d = new Date(); // for now
  let hours = d.getHours(); // => 9
  let minutes = d.getMinutes(); // =>  30
  let seconds = d.getSeconds(); // => 51
  let time = `${getTodaysDate()},${hours}:${minutes}:${seconds}`;
  return time;
};
export const deleteObjFromArrayOfObjects = (arr, property, value) => {
  let newArr = arr.filter((person) => person[property] != value);
  return newArr;
};
// stop all tracks
export const stopAllTracks = (stream) => {
  stream.getTracks().forEach((track) => track.stop());
};

export const convertPercentToDegree = (value) => {
  let converted = value / 100;
  converted = converted * 360;
  return converted;
};
export const convertDegreeToPercent = (value) => {
  let converted = value / 360;
  converted = converted * 100;
  return converted;
};

export const decodeFromB64 = (string) => {
  let decodedStr = "";
  try {
    decodedStr = atob(string);
  } catch {}
  return decodedStr;
};
export const encodeToB64 = (string) => {
  let encodedStr = "";
  try {
    encodedStr = atob(string);
  } catch {}
  return encodedStr;
};
export const getParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const replaceUnderscoreWithSpace = (stringToReplace) => {
  let results;
  try {
    results = stringToReplace.replace(/_/g, " ");
  } catch {}
  return results;
};
export const replaceSpaceWithUnderscore = (stringToReplace) => {
  let results;
  try {
    results = stringToReplace.replace(/ /g, "_");
  } catch {}
  return results;
};
export const convertFileToUrl = (file) => {
  let errorCount = 0;
  let src = "";
  try {
    src = URL.createObjectURL(file);
  } catch {
    errorCount++;
  }
  if (!errorCount) {
    return src;
  } else {
    return "";
  }
};
export const getRandomColors = () => {
  return (
    "rgb(" +
    (Math.floor(Math.random() * 56) + 50) +
    ", " +
    (Math.floor(Math.random() * 56) + 50) +
    ", " +
    (Math.floor(Math.random() * 56) + 50) +
    ")"
  );
};
export const deepCloneObject = (obj) => {
  let deepClone = JSON.parse(JSON.stringify(obj));
  return deepClone;
};
export const fortmatAsContact = (string, type = "foreign") => {
  let contact = string;
  if (type === "foreign") {
    let firstPart = string?.slice(0, 4);
    let secondPart = string?.slice(4, 6);
    let thirdPart = string?.slice(6, 9);
    let fourthPart = string?.slice(9, string.length - 1);
    contact = `${firstPart} ${secondPart} ${thirdPart} ${fourthPart}`;
  } else if (type === "local") {
    let firstPart = string?.slice(0, 3);
    let secondPart = string?.slice(4, 6);
    let thirdPart = string?.slice(7, string.length - 1);
    contact = `${firstPart} ${secondPart} ${thirdPart}`;
  }
  return contact;
};

export const checkPattern = (value, regex, fieldData) => {
  if (
    value !== "" ||
    value !== " " ||
    value !== null ||
    value.length !== 0 ||
    value !== undefined
  ) {
    let myArr = this.state.emptyRequiredFields;
    let index = myArr.indexOf(fieldData.name);
    if (index > -1) {
      myArr.splice(index, 1);
      this.setState({ emptyRequiredFields: myArr });
    }
  }
  let myArr = this.state.regexErrors;
  let index = myArr.indexOf(fieldData.name);
  if (index > -1) {
    myArr.splice(index, 1);
    this.setState({ regexErrors: myArr });
  }
};

export const removeIfExist = (arr, item) => {
  let items = arr;
  let indexOfItem = items.indexOf(item);
  if (indexOfItem > -1) {
    items.splice(indexOfItem, 1);
    return items;
  } else {
    return false;
  }
};
export const addIfNotExist = (arr, item) => {
  let items = arr;
  let indexOfItem = items.indexOf(item);
  if (indexOfItem === -1) {
    items.push(item);
    return items;
  } else {
    return false;
  }
};
export const replaceIfExist = (arr, item, replacer) => {
  let items = arr;
  let indexOfItem = items.indexOf(item);
  if (indexOfItem > -1) {
    items[indexOfItem] = replacer;
    return items;
  } else {
    return false;
  }
};
export const getDistanceBetweenTwoPoints = (startObj, endObj) => {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = startObj?.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = endObj?.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (endObj.lng - startObj.lng) * (Math.PI / 180); // Radian difference (longitudes)
  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
};
export const removeItemsFromLocalStorage = (itemsArr) => {
  if (!!itemsArr) {
    for (let i = 0; i < itemsArr.length; i++) {
      localStorage.removeItem(itemsArr[i]);
    }
  }
};
export const removeItemsFromSessionStorage = (itemsArr) => {
  if (!!itemsArr) {
    for (let i = 0; i < itemsArr.length; i++) {
      sessionStorage.removeItem(itemsArr[i]);
    }
  }
};
export const generateShortId = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "" + S4() + "" + S4();
};
export const generateVeryShortId = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "" + S4();
};
export const generateSuperShortId = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4();
};
export const getBase64Image = async (src, callback, outputFormat) => {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let dataURL;
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };

  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
};
function encodeImageFileAsURL() {
  var filesSelected = document.getElementById("inputFileToLoad").files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64

      var newImage = document.createElement("img");
      newImage.src = srcData;

      document.getElementById("imgTest").innerHTML = newImage.outerHTML;
      alert(
        "Converted Base64 version is " +
          document.getElementById("imgTest").innerHTML
      );
      console.log(
        "Converted Base64 version is " +
          document.getElementById("imgTest").innerHTML
      );
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}

export const getBase64Image2 = (img) => {
  // Create an empty canvas element
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  // Copy the image contents to the canvas
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
};
function encodeImageFileAsURL2(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    console.log("RESULT", reader.result);
  };
  reader.readAsDataURL(file);
}

function getBase64(file, callback) {
  const reader = new FileReader();

  reader.addEventListener("load", () => callback(reader.result));

  reader.readAsDataURL(file);
}

const uploadProfile = (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.onloadend = function () {
    console.log("RESULT", reader.result);
  };
  reader.readAsDataURL(file);
};

function encode() {
  // Get the file objects that was selected by the user from myinput - a file picker control
  var selectedfile = document.getElementById("myinput").files;
  // Check that the user actually selected file/s from the "file picker" control
  // Note - selectedfile is an array, hence we check it`s length, when length of the array
  // is bigger than 0 than it means the array containes file objects
  if (selectedfile.length > 0) {
    // Set the first file object inside the array to this variable
    // Note: if multiple files are selected we can itterate on all of the selectedfile array  using a for loop - BUT in order to not make this example complicated we only take the first file object that was selected
    var imageFile = selectedfile[0];
    // Set a filereader object to asynchronously read the contents of files (or raw data buffers) stored on the            user's computer, using File or Blob objects to specify the file or data to read.
    var fileReader = new FileReader();
    // We declare an event of the fileReader class (onload event) and we register an anonimous function that will be executed when the event is raised. it is "trick" we preapare in order for the onload event to be raised after the last line of this code will be executed (fileReader.readAsDataURL(imageFile);) - please read about events in javascript if you are not familiar with "Events"
    fileReader.onload = function (fileLoadedEvent) {
      // AT THIS STAGE THE EVENT WAS RAISED
      // Here we are getting the file contents - basiccaly the base64 mapping
      var srcData = fileLoadedEvent.target.result;
      // We create an image html element dinamically in order to display the image
      var newImage = document.createElement("img");
      // We set the source of the image we created
      newImage.src = srcData;
      // ANOTHER TRICK TO EXTRACT THE BASE64 STRING
      // We set the outer html of the new image to the div element
      document.getElementById("dummy").innerHTML = newImage.outerHTML;
      // Then we take the inner html of the div and we have the base64 string
      document.getElementById("txt").value =
        document.getElementById("dummy").innerHTML;
    };
    // This line will raise the fileReader.onload event - note we are passing the file object here as an argument to the function of the event
    fileReader.readAsDataURL(imageFile);
  }
}
export const getBase642 = (file) =>
  new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject("Error: ", error);
  });

const simpleImageConverter = (e) => {
  const fr = new FileReader();
  fr.onloadend = () => document.write(fr.result);
  fr.readAsDataURL(e.target.files[0]);
};
// usage
// getBase64(file)
//   .then((result) => {
//     encoded = result;
//   })
//   .catch((e) => console.log(e));

export function convertImageToDataurl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.responseType = "blob";
  xhr.onload = function () {
    var fr = new FileReader();
    fr.onload = function () {
      callback(this.result);
    };
    fr.readAsDataURL(xhr.response); // async call
  };
  xhr.send();
}
export const convertDataUrlToBlob = (dataUrl, callback) => {
  var req = new XMLHttpRequest();

  req.open("GET", dataUrl);
  req.responseType = "arraybuffer"; // Can't use blob directly because of https://crbug.com/412752

  req.onload = function fileLoaded(e) {
    // If you require the blob to have correct mime type
    var mime = this.getResponseHeader("content-type");

    callback(new Blob([this.response], { type: mime }));
  };

  req.send();
};
export const getSrcFromDataUrl = (dataUrl, callback) => {
  var req = new XMLHttpRequest();
  req.open("GET", dataUrl);
  req.responseType = "arraybuffer"; // Can't use blob directly because of https://crbug.com/412752

  req.onload = function fileLoaded(e) {
    // If you require the blob to have correct mime type
    var mime = this.getResponseHeader("content-type");
    let fileBlob = new Blob([this.response], { type: mime });
    // console.log(URL.createObjectURL(fileBlob));
    callback(URL.createObjectURL(fileBlob));
  };
  req.send();
};

export function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}
// export function recursion(maxCount, callBack) {
//   console.log(maxCount, callBack);
//   if (maxCount > 0) {
//     if (callBack(maxCount)) {
//       recursion(maxCount - 1);
//     }
//   }
// }
// getwater(20)
// dataURLtoBlob(
//   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
//   function (blob) {
//     console.log(blob);
//   }
// );
export const makeCall = (phoneNumber) => {
  // I want to do something here then make a call
  window.open(`tel:${phoneNumber}`, "_self");
};

export function watchForHover() {
  // lastTouchTime is used for ignoring emulated mousemove events
  let lastTouchTime = 0

  function enableHover() {
    if (new Date() - lastTouchTime < 500) return
    document.body.classList.add('hasHover')
  }

  function disableHover() {
    document.body.classList.remove('hasHover')
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date()
  }

  document.addEventListener('touchstart', updateLastTouchTime, true)
  document.addEventListener('touchstart', disableHover, true)
  document.addEventListener('mousemove', enableHover, true)

  enableHover()
}

export const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));


