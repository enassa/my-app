import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAccountsServices } from "../../context/accounts-provider";
import { branches, roles, User } from "../contants/ui-data";
import { successToast } from "../toast/toastify";
import { useKitchenSetupServices } from "../../context/kitchen-setup-context";
import { ORG_NAME } from "../../constants/urls";

export default function EditForm({ changeFormState, handleFormAction, data }) {
  const [isChef, setIsChef] = useState(false);
  const [rows, setRows] = useState([]);
  const { getKitchenList } = useKitchenSetupServices();
  useEffect(() => {
    if (!rows?.length && !loading) {
      getKitchenList(ORG_NAME()).then((res) => {
        if (!!res) {
          setRows(res.data);
        }
      });
    }
  }, []);
  const initialValues = !!data
    ? data
    : {
        name: "",
        email: "",
        role: "",
        phone: "",
        password: "hello",
        createdBy: "",
        branch: "",
      };
  const AddFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().required("Required"),
    role: Yup.string(),
    phone: Yup.number().required("Required"),
  });
  const { updateUserByData, loading } = useAccountsServices();
  const handleSubmit = (newData) => {
    const data = {
      ...newData,
      email: newData?.email.toLowerCase(),
      organizationCode: User()?.organizationCode,
    };
    updateUserByData(data).then((res) => {
      if (!!res) {
        successToast("User updated successfully");
        changeFormState(false);
        handleFormAction(res.data);
      }
      console.log(res);
    });
  };

  return (
    <>
      <Formik
        validationSchema={AddFormSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, values, isSubmitting }) => {
          if (values.role === "Chef") {
            setIsChef(true);
          } else {
            setIsChef(false);
          }
          return (
            <Form className="w-full min-w-[460px] pointer-events-auto animate-rise">
              <div className="w-full h-3/4 flex flex-col justify-center p-10 ">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 px-12 animate-rise shadow sm:rounded-lg">
                    <div className=" space-y-6" action="#" method="POST">
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <div className="mt-1">
                          <Field
                            id="role"
                            name="role"
                            type="input"
                            as="select"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {roles.map((item, index) => {
                              return <option key={index}>{item}</option>;
                            })}
                          </Field>
                        </div>
                      </div>
                      <div className="pointer-events-auto">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        {!isChef ? (
                          <div className="mt-1 ">
                            <Field
                              id="name"
                              name="name"
                              type="name"
                              as="input"
                              autoComplete="name"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        ) : (
                          <div className="mt-1">
                            <Field
                              id="name"
                              name="name"
                              type="input"
                              as="select"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              {rows?.map((item, index) => {
                                return (
                                  <option key={index}>{item.kitchen}</option>
                                );
                              })}
                            </Field>
                          </div>
                        )}
                      </div>

                      <div className="pointer-events-auto">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="mt-1">
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            as="input"
                            autoComplete="email"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <div className="mt-1">
                          <Field
                            id="phone"
                            name="phone"
                            as="input"
                            type="text"
                            autoComplete="phone"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Branch
                        </label>
                        <div className="mt-1">
                          <Field
                            id="branch"
                            disabled={User().role !== "Super"}
                            name="branch"
                            type="input"
                            as="select"
                            className={`appearance-none ${
                              User().role !== "Super" ? "bg-gray-100" : ""
                            } block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          >
                            {branches.map((item, index) => {
                              return <option key={index}>{item}</option>;
                            })}
                          </Field>
                        </div>
                      </div>
                      <div className="">
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-900  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {loading ? (
                            <span className="border-2 w-6 h-6 animate-spin rounded-full mr-2 border-r-black"></span>
                          ) : null}
                          <span>Update account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
