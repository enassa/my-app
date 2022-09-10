import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAccountsServices } from "../../context/accounts-provider";
import { branches, roles, User } from "../contants/ui-data";
import { errorToast, successToast } from "../../components/toast/toastify";
import { useEffect, useState } from "react";
import { BRANCH, IS_SUPER_ACCOUNT, ORG_NAME } from "../../constants/urls";
import { useKitchenSetupServices } from "../../context/kitchen-setup-context";

export default function AddForm({ changeFormState, handleFormAction }) {
  const [rows, setRows] = useState([]);
  const [isChef, setIsChef] = useState(false);
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
  const initialValues = {
    name: "",
    email: "",
    role: "Manager",
    phone: "",
    password: "hello",
    createdBy: User().name,
    branch: BRANCH(),
  };

  const AddFormSchema = Yup.object().shape({
    // name: Yup.string()
    //   .min(2, "Too Short!")
    //   .max(50, "Too Long!")
    //   .required("Required"),
    email: Yup.string().required("Required"),
    role: Yup.string(),
    phone: Yup.number().required("Required"),
  });
  const { createUser, loading, trial } = useAccountsServices();

  const handleSubmit = (newData) => {
    const data = {
      ...newData,
      email: newData.email.toLowerCase(),
      organizationCode: User()?.organizationCode,
      organizationName: User()?.organizationName,
    };
    createUser(data).then((res) => {
      if (!!res) {
        changeFormState(false);
        if (res?.data) {
          handleFormAction(res.data);
          successToast("User was created successfully");
        }
        // handleFormAction(res.data);
      } else {
        errorToast("User creation was not successful");
      }
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
                  <div className="bg-white w-full py-8 px-12 shadow sm:rounded-lg">
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
                              <option>Select Kitchen</option>
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
                            name="branch"
                            type="input"
                            as="select"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {IS_SUPER_ACCOUNT() ? (
                              branches.map((item, index) => {
                                return <option key={index}>{item}</option>;
                              })
                            ) : (
                              <option>{BRANCH()}</option>
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className="">
                        <button
                          disabled={loading}
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-900  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {loading ? (
                            <span className="border-2 w-6 h-6 animate-spin rounded-full mr-2 border-r-black"></span>
                          ) : null}
                          Create user
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
