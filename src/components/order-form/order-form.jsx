import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useKitchenServices } from "../../context/kitchen-body-context";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { LocationMarkerIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import { errorToast, successToast } from "../toast/toastify";
import InfoModal from "../info-modal/info-modal";
import { usePaymentServices } from "../../context/payment-context";
import { CloseSvg } from "./../info-modal/info-modal";
import OverlayLoader from "../overlay_loader/OverlayLoader";
import Places from "../maps/places";
import { ORG_CODE, ORG_NAME, USERNAME } from "../../constants/urls";
import MenuSelectionTable from "./MenuSelectionTable";
import { useConfigurationServices } from "../../context/configurations-context";
import { useDeliveryCostServices } from "../../context/delivery-context";
import { getDistanceBetweenTwoPoints } from "../../libraries/easy";

const OrderForm = ({ handleClose }) => {
  const branches = ["Adjiringanor", "Osu", "Amrahia"];
  const deliveryForms = ["Customer Pick up", "Delivery"];
  const paymentOptions = ["Cash", "Electronic"];
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [finalOrder, setFinalOrder] = useState({});
  const [menuData, setMenuData] = useState([]);
  const { createOrder, loading, count, setCount } = useKitchenServices();
  const [showMenuList, setShowMenuList] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [cordinates, setCordinates] = useState(undefined);
  const [cordinatesError, setCordinatesError] = useState(false);
  const [menuDataError, setMenuDataError] = useState(false);
  const [paymentRes, setPaymentRes] = useState("");
  const [branchData, setBranchData] = useState("");
  const [deliveryCostData, setDeliveryCostData] = useState(undefined);
  const [locationError, setlocationError] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [otherCharges, setOtherCharges] = useState({
    serviceCharge: 0,
    deliveryCost: 0,
    deliveryDistance: 0,
  });
  const [deliveryType, setDeliveryType] = useState("");
  const {
    paymentStatus,
    isModalOn,
    controller,
    setPaymentStatus,
    setIsModalOn,
    checkPaymentStatus,
  } = usePaymentServices();
  const { getDeliveryCost, getBranchDeliveryCost, deleteDeliveryCost } =
    useDeliveryCostServices();

  const { configurations, configurationsList } = useConfigurationServices();
  const checkBoxRef = useRef(false);

  let resetPresForm = {};

  // Fetch delivery cost list
  useEffect(() => {
    !!!deliveryCostData &&
      getDeliveryCost().then((response) => {
        setDeliveryCostData(response?.data);
      });
  }, []);

  useEffect(() => {
    if (deliveryType !== "Delivery") {
      setCordinates(undefined);
      setlocationError(false);
    }
  }, [deliveryType]);

  // maxDistance: 45
  // minDistance
  const ResettingForm = () => {
    const { resetForm } = useFormikContext();
    resetPresForm = resetForm;
    return null;
  };
  const getTotalSum = () => {
    let sum = 0;
    menuData.map((item) => {
      sum += item?.total;
    });
    return parseInt(sum.toFixed(2));
  };
  const getTotalCount = () => {
    let count = 0;
    menuData.map((item) => {
      count += item?.quantity;
    });
    return count;
  };
  const getAbsoluteTotalCharge = () => {
    let itemCost = getTotalSum();
    let otherCost = getAllOtherCharges();
    if (getAllOtherCharges()) {
      return itemCost + otherCost;
    }
    return itemCost;
  };
  const computeDeliveryCost = () => {
    const deliveryLocation = { lat: cordinates?.lat, lng: cordinates?.lng };
    const branchLocation = {
      lat: configurations?.latitude,
      lng: configurations?.longitude,
    };

    let distanceDifference = getDistanceBetweenTwoPoints(
      deliveryLocation,
      branchLocation
    );

    const deliveryCostObj = deliveryCostData?.filter(
      (item) =>
        distanceDifference >= item.minDistance &&
        distanceDifference <= item.maxDistance
    );
    return deliveryCostObj;
  };

  const getAllOtherCharges = () => {
    const getSum = () => {
      return otherCharges.deliveryCost + otherCharges.serviceCharge;
    };
    return !!computeDeliveryCost() ? getSum() : 0;
  };
  // console.log("", configurations);
  useEffect(() => {
    let value = !!computeDeliveryCost() ? computeDeliveryCost()[0]?.cost : 0;
    setOtherCharges({
      ...otherCharges,
      deliveryCost: value,
      serviceCharge: configurations?.serviceCharge
        ? configurations?.serviceCharge
        : 0,
    });
    setlocationError(false);
  }, [cordinates?.lat]);

  // const makePayment = () => {
  //   setIsModalOn(true);
  //   paymentRequest({
  //     "organizationCode": "POTBELLY",
  //     "organizationName": "Potbelly",
  //     "branchCode": finalOrder.orderBranch,
  //     "branchName": finalOrder.orderBranch,
  //     "description": "Payment for order",
  //     "name": finalOrder.orderBy,
  //     "phone": finalOrder.orderPhone,
  //     "email": finalOrder.orderEmail,
  //     "billAmount": 0.1,
  //     "debitAmount": 0.1,
  //     "sendCheckoutUrl": checkBoxRef.current.checked ? 1 : 0,
  //   }).then((response) => {
  //     const checkStatus = setInterval(() => {
  //       setCount(count + 5);
  //       if(count !== 60) {
  //         checkPaymentStatus(response.clientReference).then((response) => {
  //           if(response?.status.toLowerCase() === "success") {
  //             setPaymentStatus('success');
  //             handleConfirm(checkStatus);
  //           }
  //         });
  //       }
  //     }, 5000);
  //   });
  // }

  const handleConfirm = () => {
    if (!menuData.length) return;

    let locationForPickup =
      deliveryType === "Delivery"
        ? {}
        : {
            orderLat: configurations?.latitude,
            orderLon: configurations?.longitude,
            orderAddress: configurations?.address,
          };
    let newData = {
      ...finalOrder,
      orderDetail: menuData,
      orderTotalAmount: getAbsoluteTotalCharge(),
      orderAddress: cordinates?.address,
      orderLon: cordinates?.lng,
      orderLat: cordinates?.lat,
      sendCheckoutUrl: checkBoxRef.current.checked ? 1 : 1,
      organizationName: ORG_NAME(),
      organizationCode: ORG_CODE(),
      ...locationForPickup,
      orderTakenBy: USERNAME(),
      orderItemCost: getTotalSum(),
      ...otherCharges,
    };
    setFormLoading(true);
    createOrder(newData).then((res) => {
      setFormLoading(false);
      if (!!res) {
        let checkStatus = "";
        if (newData.paymentMode !== "Cash") {
          setIsModalOn(true);
          checkStatus = setInterval(() => {
            checkPaymentStatus(res?.clientReference).then((response) => {
              if (response?.paymentStatus?.toLowerCase() === "success") {
                setPaymentStatus("success");
                clearCheckInterval();
                setIsModalOn(false);
                controller.abort();
                setCount(count + 1);
                clearTimeout(timeOut);
                setPaymentRes("success");
                successToast("Payment confirmed");
              }
            });
          }, 5000);

          function clearCheckInterval() {
            clearInterval(checkStatus);
          }
          var timeOut = setTimeout(() => {
            clearInterval(checkStatus);
            setIsModalOn(false);
            setCount(count + 1);
            if (paymentRes !== "success") {
              errorToast("Payment not confirmed");
              handleClose();
              // errorToast("Payment not confirmed");
            } else if (paymentRes === "success") {
              successToast("Payment confirmed");
              handleClose();
              window.location.reload();
            }
          }, 180000);
        } else {
          successToast("Order created succesfully");
          handleClose();
          window.location.reload();
        }
      } else {
        setIsModalOn(false);
        errorToast("Error creating order");
      }
      setShowConfirmation(false);
      resetPresForm();
    });
  };

  const removeMenuItem = (itemToRemove) => {
    const newData = menuData.filter((item) => item.id !== itemToRemove.id);
    setMenuData(newData);
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const modalHandler = () => {
    switch (paymentStatus) {
      case "initiate":
        setIsModalOn(false);
        break;
      case "fail":
        setPaymentStatus("initiate");
        //RE-INITIALIZE PAYMENT CODE HERE !
        break;
      default:
        errorToast("Something went wrong");
    }
  };

  const initialValues = {
    orderBy: "",
    orderPhone: "",
    // orderLat: 0,
    // orderLon: 0,
    orderAddress: "",
    orderEmail: "",
    orderDetail: "",
    orderAdditionalInfo: "",
    orderTotalAmount: 0,
    orderBranch: "",
    paymentAmount: 0,
    paymentMode: "Electronic",
    allergyNote: "",
    orderQuantity: 1,
    channel: "walk-in",
    deliveryOption: "",
    deliveryCharge: 0,
    serviceCharge: 0,
  };

  const postOrder = (data) => {
    // setPaymentStatus("initiate");
    // setIsModalOn(true);
    if (deliveryType === "Delivery" && cordinates === undefined) {
      setlocationError(true);
      return;
    } else {
      setlocationError(false);
    }
    if (menuData.length) {
      setMenuDataError(false);
    } else {
      setMenuDataError(true);
      return;
    }

    setFinalOrder(data);
    setShowConfirmation(true);
  };

  const Schema = Yup.object().shape({
    orderBy: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    orderLat: Yup.number(),
    orderLon: Yup.number(),
    paymentMode: Yup.string().required("Required"),
    orderAddress: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    orderDetail: Yup.string().min(2, "Too Short!"),
    orderAdditionalInfo: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    orderBranch: Yup.string().required("Required"),
    deliveryOption: Yup.string().required("Required"),
    OrderEmail: Yup.string(),
    // orderPhone: Yup.number().required("Required"),
    orderPhone: Yup.string()
      .required("This field is Required")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "Phone number is not valid"
      ),
    paymentAmount: Yup.number(),
  });
  const handleChange = (value, row, selectState) => {
    let rowsData = menuData;
    let processedValue = value === "" ? null : parseInt(value);
    const indexOfModifiedRow = rowsData.findIndex((item) => item.id === row.id);

    if (indexOfModifiedRow !== -1) {
      let rowToModify = rowsData[indexOfModifiedRow];
      let total = rowToModify.price * value;
      let newRowData = {
        ...rowToModify,
        quantity: processedValue,
        total,
        selected: selectState,
      };
      rowsData.splice(indexOfModifiedRow, 1, newRowData);
      setMenuData([...rowsData]);
    }
  };
  return (
    <div className="w-full h-full">
      {showMenuList ? (
        <div
          onClick={() => {
            setShowMenuList(false);
          }}
          className="fixed animate-rise flex flex-wrap justify-center cursor-pointer items-center top-0 left-0 w-full h-full overflow-x-hidden md:inset-0 md:h-full z-[200] bg-backdrop"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-[95%] h-[95%] bg-white  rounded-md overflow-y-auto"
          >
            {/* <MenuListTable
              branchData={branchData}
              onAddSelected={(selectedData) => {
                setMenuData(selectedData);
                setShowMenuList(false);
              }}
              closeMenuList={() => {
                setShowMenuList(false);
              }}
            /> */}
            <MenuSelectionTable
              branchData={branchData}
              onAddSelected={(selectedData) => {
                setMenuData(selectedData);
                setShowMenuList(false);
                setMenuDataError(false);
              }}
              handleClose={() => {
                setShowMenuList(false);
              }}
            />
          </div>
        </div>
      ) : null}
      {showMap ? (
        <div
          onClick={() => {
            setShowMap(false);
          }}
          className="fixed animate-rise flex flex-wrap justify-center cursor-pointer items-center top-0 left-0 w-full h-full overflow-x-hidden md:inset-0 md:h-full z-[200] bg-backdrop"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-3/4 h-3/4 bg-white overflow-y-auto rounded-md"
          >
            <Places
              getLongitudeLatitude={(value) => {
                setCordinates(value);
                setCordinatesError(false);
                if (value?.address !== undefined) {
                  setShowMap(false);
                }
              }}
            />
          </div>
        </div>
      ) : null}
      {showConfirmation && (
        <ModalOverlay
          handleConfirm={() => handleConfirm()}
          handleCancel={() => handleCancel()}
          text={"Are you sure you want to create the order"}
          mainText={"Confirm Order"}
        />
      )}
      {formLoading && (
        <div className="h-full top-0 left-0 z-[100] w-full fixed bg-backdrop flex justify-center items-center ">
          <OverlayLoader />
        </div>
      )}
      {isModalOn && <InfoModal modalHandler={() => modalHandler()} />}

      <div className="fixed animate-rise flex flex-wrap justify-center top-0 left-0 w-full h-full overflow-x-hidden md:inset-0 md:h-full z-40 bg-backdrop">
        <div className="relative w-full md:max-w-3xl md:my-5 drop-shadow-2xl bg-white  bg-blend-color-burn rounded-lg flex-col sm:justify-center items-center pt-4 sm:pt-0">
          <CloseSvg
            className="absolute top-0 right-0 my-5 mr-10 cursor-pointer"
            closeModal={() => handleClose()}
          />

          <div className="w-full sm:max-w-xl p-4 mx-auto">
            <h2 className="mb-6 text-center text-2xl font-sm font-arial-arounded text-gray-600">
              Place Order
            </h2>
            <Formik
              validationSchema={Schema}
              initialValues={initialValues}
              onSubmit={postOrder}
            >
              {({ errors, values, touched, isSubmitting, handleReset }) => {
                setBranchData(values.orderBranch);
                setDeliveryType(values.deliveryOption);
                console.log(values)
                return (
                  <Form>
                    <ResettingForm />
                    <div className="mb-4">
                      <div className="mb-1">
                        <label className="block mb-1 " htmlFor="orderBy">
                          Customer Name*
                        </label>
                        <Field
                          id="orderBy"
                          type="text"
                          as="input"
                          name="orderBy"
                          autoComplete="orderBy"
                          className="pt-2 pb-0 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                      </div>
                      {errors.orderBy && touched.orderBy && (
                        <div>
                          <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                            Please enter Customer Name
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="sm:md:flex items-center justify-between">
                      <div className="mb-4 w-full sm:mr-2">
                        <label htmlFor="orderBranch" className="block mb-1">
                          Select Branch*
                        </label>

                        <Field
                          id="orderBranch"
                          name="orderBranch"
                          as="select"
                          //   type="select"
                          className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        >
                          <option value="" label="Select Branch">
                            Select a Branch
                          </option>

                          {configurationsList.map((configuration, id) => {
                            return (
                              <option value={configuration.branch} key={id}>
                                {configuration.branch}
                              </option>
                            );
                          })}
                        </Field>
                        {errors.orderBranch && touched.orderBranch ? (
                          <div>
                            <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                              Please select branch
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-red-500  text-xs mt-0 invisible  w-full flex right-0">
                              .
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mb-4 w-full sm:mr-2">
                        <label htmlFor="deliveryOption" className="block mb-1">
                          Delivery Type*
                        </label>
                        <Field
                          id="deliveryOption"
                          name="deliveryOption"
                          as="select"
                          //   type="select"
                          className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        >
                          <option value="" label="Select service type">
                            Select service type
                          </option>
                          {deliveryForms.map((form, id) => {
                            return (
                              <option value={form} key={id}>
                                {form}
                              </option>
                            );
                          })}
                        </Field>
                        {errors.deliveryOption && touched.deliveryOption ? (
                          <div>
                            <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                              Please select service type
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-red-500  text-xs mt-0 invisible  w-full flex right-0">
                              .
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 invisible pointer-events-none absolute">
                      {/* <label className="block mb-1" htmlFor="orderAddress">
                        Order Address
                      </label> */}
                      <Field
                        id="orderAddress"
                        type="text"
                        disabled={true}
                        as="input"
                        value={cordinates?.address}
                        name="orderAddress"
                        className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                      />
                      {cordinatesError && (
                        <div>
                          <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                            Please enter Digital Address
                          </span>
                        </div>
                      )}
                    </div>
                    {deliveryType === "Delivery" && (
                      <div
                        onClick={() => {
                          setShowMap(true);
                        }}
                        className="mb-4"
                      >
                        <label className="block mb-1" htmlFor="orderAddress">
                          Delivery Address*
                        </label>
                        <div
                          id="orderAddress"
                          type="text"
                          as="input"
                          name="orderAddress"
                          className="py-2 px-3 overflow-hidden cursor-pointer border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        >
                          {cordinates?.address !== undefined ? (
                            <span className="text-green-800 flex items-center">
                              <xMarkerIcon className="h-4 w-4 mr-1" />
                              {cordinates?.address}
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <LocationMarkerIcon className="h-4 w-4 mr-1" />
                              Click to set location
                            </span>
                          )}
                        </div>
                        {locationError && (
                          <div>
                            <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                              Please set delivery Address
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="mb-1">Selected menu items*</div>
                    <div className="w-full flex flex-col justify-start items-center p-2 rounded-md min-h-[100px] bg-gray-100 mb-2 border">
                      {menuData.map((item, index) => {
                        return (
                          <div className="w-[95%] flex px-2 h-10 bg-white shadow mb-2 rounded-md items-center">
                            <div className="w-full flex">
                              <div className="mr-2 text-xs text-gray-700 h-full items-center flex">
                                {item?.tagName}
                              </div>
                              {/* <div className="mr-2 text-gray-400 h-full items-center flex">
                                {item?.menuItem}
                              </div> */}
                            </div>
                            <div className="mr-2 text-sm text-gray-500 whitespace-nowrap px-3 h-[50%] justify-center rounded-md items-center bg-orange-50 flex">
                              GHS {item?.price.toFixed(2)}
                            </div>
                            <span className="h-full items-center flex text-gray-400">
                              <XIcon className="h-3 w-3 mr-1" />
                            </span>
                            &nbsp;
                            <input
                              onChange={(e) => {
                                handleChange(e.target.value, item, true);
                              }}
                              onBlur={(e) => {
                                if (item.quantity < 1) {
                                  handleChange(1, item, true);
                                }
                              }}
                              value={item?.quantity}
                              type="number"
                              className="w-[50px] text-center mr-2 appearance text-gray-500  h-[25px] bg-blue-50 focus:bg-blue-100 outline-none rounded-lg pl-2 pr-2"
                            />
                            <span className="h-full items-center flex text-red-400">
                              <TrashIcon
                                onClick={() => {
                                  removeMenuItem(item);
                                }}
                                className="h-3 w-3 cursor-pointer hover:text-red-800"
                              />
                            </span>
                            {/* </div> */}
                          </div>
                        );
                      })}
                    </div>
                    {menuDataError && (
                      <div>
                        <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                          Please select menu items
                        </span>
                      </div>
                    )}
                    <div className="w-full flex justify-end cursor-pointer">
                      <div className="flex text-gray-500 items-center">
                        <div className="flex justify-start mr-4">
                          <strong className="">Number of items: &nbsp; </strong>
                          <span>{getTotalCount()}</span>
                          {/* <span>{computeDeliveryCost()}</span> */}
                        </div>
                        <div className="flex justify-start mr-4">
                          <strong>Total Item Cost: &nbsp; </strong>
                          <span>GHS {getTotalSum().toFixed(2)}</span>
                        </div>
                      </div>

                      <div
                        onClick={() => {
                          setShowMenuList(!showMenuList);
                        }}
                        className="rounded-md h-10 px-3  text-gray-100 flex justify-center items-center bg-black hover:bg-gray-700"
                      >
                        Add Menu
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block mb-1"
                        htmlFor="orderAdditionalInfo"
                      >
                        Additional Info
                      </label>
                      <Field
                        id="orderAdditionalInfo"
                        type="text"
                        as="input"
                        name="orderAdditionalInfo"
                        className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-1"
                        htmlFor="orderAdditionalInfo"
                      >
                        Allergy Notes
                      </label>
                      <Field
                        id="allergyNote"
                        type="text"
                        as="input"
                        name="allergyNote"
                        className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                      />
                    </div>
                    {/* <div className="mb-4">
                      <label className="block mb-1" htmlFor="orderDetail">
                        Extra Info
                      </label>
                      <Field
                        id="orderDetail"
                        type="textarea"
                        as="textarea"
                        name="orderDetail"
                        disabled={true}
                        className="resize-none overflow-auto py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                      />
                      {errors.digitalAddress && touched.digitalAddress && (
                        <div>
                          <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                            Please enter Digital Address
                          </span>
                        </div>
                      )}
                    </div> */}

                    <div className=""></div>
                    {/* <div className="md:flex items-center justify-between">
                      <div className="mb-4 w-full mr-4">
                        <label className="block mb-1" htmlFor="orderLat">
                          Latitude
                        </label>
                        <Field
                          id="orderLat"
                          type="number"
                          as="input"
                          name="orderLat"
                          className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                      </div>
                      <div className="mb-4 w-full md:ml-4">
                        <label className="block mb-1" htmlFor="orderLon">
                          Longitude
                        </label>
                        <Field
                          id="orderLon"
                          type="number"
                          as="input"
                          name="orderLon"
                          className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                      </div>
                    </div> */}
                    <div className="md:flex items-center justify-between">
                      <div className="mb-4 w-full mr-4">
                        <label className="block mb-1" htmlFor="orderPhone">
                          Phone*
                        </label>
                        <Field
                          id="orderPhone"
                          type="tel"
                          name="orderPhone"
                          className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                        {errors.orderPhone && touched.orderPhone && (
                          <div>
                            <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                              Please enter Phone number
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mb-4 w-full md:ml-4">
                        <label className="block mb-1" htmlFor="orderEmail">
                          Email
                        </label>
                        <Field
                          id="orderEmail"
                          type="email"
                          as="input"
                          name="orderEmail"
                          className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1" htmlFor="paymentMode">
                        Payment mode
                      </label>
                      <Field
                        id="paymentMode"
                        name="paymentMode"
                        as="select"
                        //   type="select"
                        className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                      >
                        <option value="" label="Select service type">
                          Select payment mode
                        </option>
                        {paymentOptions.map((option, id) => {
                          return (
                            <option value={option} key={id}>
                              {option}
                            </option>
                          );
                        })}
                      </Field>
                    </div>
                    <div className="mb-1">Price Summary</div>
                    <div className="w-full flex flex-col justify-start items-center p-2 rounded-md bg-slate-50 mb-2 ">
                      {
                        // menuData.map((item, index) => {
                        //   return (
                        <>
                          <div className="w-[95%] flex px-2 h-10 bg-white mb-2 rounded-md items-center">
                            <div className="w-full flex">
                              <div className="mr-2 text-gray-700 h-full items-center flex">
                                Items Cost
                              </div>
                            </div>
                            <div className="mr-2 text-sm text-gray-500 whitespace-nowrap px-3 h-[50%] justify-center rounded-md items-center bg-orange-50 flex">
                              GHS {getTotalSum()}
                              {/* {item?.price.toFixed(2)} */}
                            </div>
                            &nbsp;
                            {/* </div> */}
                          </div>
                          {deliveryType === "Delivery" ? (
                            <div className="w-[95%] flex px-2 h-10 bg-white mb-2 rounded-md items-center">
                              <div className="w-full flex">
                                <div className="mr-2 text-gray-700 h-full items-center flex">
                                  Delivery Charge
                                </div>
                              </div>
                              <div className="mr-2 text-sm text-gray-500 whitespace-nowrap px-3 h-[50%] justify-center rounded-md items-center bg-orange-50 flex">
                                GHS {otherCharges?.deliveryCost?.toFixed(2)}
                              </div>
                              &nbsp;
                              {/* </div> */}
                            </div>
                          ) : null}
                          <div className="w-[95%] flex px-2 h-10 bg-white mb-2 rounded-md items-center">
                            <div className="w-full flex">
                              <div className="mr-2 text-gray-700 h-full items-center flex">
                                Service Charge
                              </div>
                            </div>
                            <div className="mr-2 text-sm text-gray-500 whitespace-nowrap px-3 h-[50%] justify-center rounded-md items-center bg-orange-50 flex">
                              {parseFloat(otherCharges?.serviceCharge?.toFixed(2)) * (parseFloat(otherCharges?.deliveryCost?.toFixed(2)) + parseFloat(getTotalSum()))}
                            </div>
                            &nbsp;
                            {/* </div> */}
                          </div>
                          <div className="w-[95%] flex px-2 h-10 bg-orange-100 mb-2 rounded-md items-center">
                            <div className="w-full flex">
                              <div className="mr-2 text-gray-700 h-full items-center flex">
                                Total Charge
                              </div>
                            </div>
                            <div className="mr-2 text-sm text-gray-500 whitespace-nowrap px-3 h-[50%] justify-center rounded-md items-center bg-orange-50 flex">
                              GHS {""}
                              {parseFloat(otherCharges?.serviceCharge?.toFixed(2)) * (parseFloat(otherCharges?.deliveryCost?.toFixed(2)) + parseFloat(getTotalSum())) + parseFloat(otherCharges?.deliveryCost?.toFixed(2)) + parseFloat(getTotalSum())}                            </div>
                            &nbsp;
                            {/* </div> */}
                          </div>
                        </>

                        // )})
                      }
                    </div>
                    {/* <div className="mb-2 flex items-center">
                      <label>Payment by customer</label>
                      <input
                        ref={checkBoxRef}
                        type="checkbox"
                        className="ml-2"
                      />
                    </div> */}
                    <div className="flex items-center justify-center cursor-pointer">
                      {/* <div className="mb-4 w-full mr-4">
                        <label
                          className="block mb-1"
                          htmlFor="orderTotalAmount"
                        >
                          Total Amount (GH₵)
                        </label>
                        <Field
                          id="orderTotalAmount"
                          type="number"
                          as="input"
                          name="orderTotalAmount"
                          className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                        {errors.orderTotalAmount && touched.orderTotalAmount && (
                          <div>
                            <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                              Please enter Total Amount
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mb-4 w-full md:ml-4">
                        <label className="block mb-1" htmlFor="paymentAmount">
                          Payment Amount (GH₵)
                        </label>
                        <Field
                          id="paymentAmount"
                          type="number"
                          as="input"
                          name="paymentAmount"
                          className="py-2 px-3 border border-gray-300 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        />
                        {errors.paymentAmount && touched.paymentAmount && (
                          <div>
                            <span className="text-red-500  text-xs mt-0   w-full flex right-0">
                              Please enter Payment Amount
                            </span>
                          </div>
                        )}
                      </div> */}
                      <button className="rounded-md h-10 px-3  text-gray-100 flex w-full justify-center items-center bg-bodyBrown hover:bg-gray-700">
                        {/* {perStatusOutput(
                          "Payment Complete",
                          "Initiate Payment Again",
                          "Place Order"
                        )}
                        {perStatusOutput(
                          <SuccessSvg2 />,
                          <FailSvg2 />,
                          <InitiateSvg2 />
                        )} */}
                        Place Order
                      </button>
                    </div>
                    {/* <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-4 py-2 flex transition-all duration-300 ease-in-out bg-bodyBrown hover:bg-gray-800 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-blue-200 disabled:opacity-25 transition"
                      >
                        {loading ? (
                          <span className="border border-2 w-6 h-6 animate-spin rounded-full mr-2 border-r-brown-500"></span>
                        ) : null}
                        <span> Place order</span>
                      </button>
                    </div> */}
                    <div className="mt-6 text-center"></div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
