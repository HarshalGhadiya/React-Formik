import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Reactcaptch from "../component/Reactcaptch";

function XifiDemo() {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [FormValue, setFormValue] = useState();
  const [activeState, setActiveState] = useState(1);
  const [showModel, setshowModel] = useState(false);
  const [position, setPosition] = useState("center");

  //PopUp Code
  const dialogFuncMap = {
    showModel: setshowModel,
  };
  //PopUp Position
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  //PopUp Hide Function
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  //Next Button Validation Number 1
  var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const validation1 =
    FormValue?.firstname.trim().length &&
    FormValue?.lastname.trim().length &&
    FormValue?.middlename.trim().length &&
    FormValue?.password.trim().length &&
    FormValue?.email.trim().length &&
    FormValue?.email.includes("@") &&
    FormValue?.password === FormValue?.confirm_password &&
    FormValue?.confirm_password.trim().length &&
    FormValue?.phone.trim().length === 10 &&
    phoneNum.test(FormValue?.phone);

  //Next Button Validation Number 2
  const validation2 =
    FormValue?.companyname.trim().length &&
    FormValue?.address_line_1.trim().length &&
    FormValue?.address_line_2.trim().length &&
    FormValue?.city.trim().length &&
    FormValue?.state.trim().length &&
    FormValue?.pincode.trim().length === 6;

  //Next Button Validation Number 3
  const validation3 = checked && checked1 && checked2 && checked3 && checked4;

  //Next Button Validation Number 4
  const Adharcard_validate_regex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  const GST_validate_regex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const validation4 =
    Adharcard_validate_regex.test(FormValue?.aadhar_number) &&
    GST_validate_regex.test(FormValue?.gst_number);

  // Show Form Componenet Step Wise
  var isDisabled = true;
  if (activeState === 1 && validation1) {
    isDisabled = false;
  } else if (activeState === 2 && validation2 > 0) {
    isDisabled = false;
  } else if (activeState === 3 && validation3) {
    isDisabled = false;
  } else if (activeState === 4 && validation4) {
    isDisabled = false;
  }

  const NextHandler = (e) => {
    e.preventDefault();
    setActiveState((prevCount) => prevCount + 1);
  };
  const PriviousHandler = (e) => {
    e.preventDefault();
    setActiveState((prevCount) => prevCount - 1);
  };

  //Formik State DropDown
  const dropdownOptions = [
    { key: "Select an State", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];

  //Formik IntialValue
  const initialValues = {
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    companyname: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    aadhar_number: "",
    gst_number: "",
  };

  const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const pincodeRegExp = /^[0-9]{6}$/;

  //Formik Validation Scheema
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required("Required")
      .min(3, "Atleast 3 Character Required  ")
      .max(20, "Enter A Small Name (< 20)"),
    middlename: Yup.string()
      .required("Required")
      .min(3, "Atleast 3 Character Required  ")
      .max(20, "Enter A Small Name (< 20)"),
    lastname: Yup.string()
      .required("Required")
      .min(3, "Atleast 3 Character Required  ")
      .max(20, "Enter A Small Name (< 20)"),
    email: Yup.string().email("Invalid email address").required("Required!"),
    password: Yup.string().required("Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
    phone: Yup.string()
      .required("Please Enter A Number")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Please enter 10 Digit Number")
      .max(10, "Please enter 10 Digit Number"),
    companyname: Yup.string().required("Required"),
    address_line_1: Yup.string().required("Required"),
    address_line_2: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    pincode: Yup.string()
      .required("Please Enter A Number")
      .matches(pincodeRegExp, "pincode number is not valid")
      .min(6, "Please enter 6 Digit Number")
      .max(6, "Please enter 6 Digit Number"),
    aadhar_number: Yup.string()
      .required("Please Enter A Number")
      .matches(Adharcard_validate_regex, "Adhar Card number is not valid")
      .min(12, "Please enter 12 Digit Number")
      .max(12, "Please enter 12 Digit Number"),
    gst_number: Yup.string()
      .required("Please Enter A Number")
      .matches(GST_validate_regex, "Gst number is not valid")
      .min(15, "Please enter 15 Digit Number")
      .max(15, "Please enter 15 Digit Number"),
  });

  //Formik Onsubmit Function
  const onSubmit = (values, onSubmitProps) => {
    values.PDO_Distributor = checked;
    values.Terms_Conditions = checked1;
    values.Pricing_Policy = checked2;
    values.Privacy_Policy = checked3;
    values.Refund_Policy = checked4;
    console.log("Form data", values);

    setChecked(false);
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
    setChecked4(false);
    console.log("Saved data", JSON.parse(JSON.stringify(values)));
    onSubmitProps.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          // console.log("Formik props", formik);
          setFormValue(formik.values);

          return (
            <Form>
              {/* Part 1 */}
              {activeState === 1 && (
                <div>
                  <FormikControl
                    control="input"
                    maxlength="20"
                    type="text"
                    label="Firstname"
                    name="firstname"
                    placeholder="Firstname"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    maxlength="20"
                    label="Middlename"
                    name="middlename"
                    placeholder="Middlename"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    maxlength="20"
                    label="Lastname"
                    name="lastname"
                    placeholder="Lastname"
                  />
                  <FormikControl
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Email"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Password"
                    name="password"
                    placeholder="Password"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Confirm Password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                  />

                  <FormikControl
                    control="input"
                    maxlength="10"
                    type="tel"
                    label="Phone"
                    name="phone"
                    placeholder="Phone"
                  />
                </div>
              )}
              {/* Part 2 */}

              {activeState === 2 && (
                <div>
                  <FormikControl
                    control="input"
                    type="text"
                    label="CompanyName"
                    name="companyname"
                    placeholder="Company Name"
                  />
                  <FormikControl
                    control="textarea"
                    label="Address line 1"
                    name="address_line_1"
                    placeholder="Address line 1"
                  />
                  <FormikControl
                    control="textarea"
                    label="Address line 2"
                    name="address_line_2"
                    placeholder="Address line 2"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="City"
                    name="city"
                    placeholder="City"
                  />
                  <FormikControl
                    control="select"
                    label="Select a State"
                    name="state"
                    options={dropdownOptions}
                  />
                  <FormikControl
                    control="input"
                    maxlength="6"
                    type="tel"
                    label="Pincode"
                    name="pincode"
                    placeholder="Pincode"
                  />
                </div>
              )}

              {/* part 3 */}
              {activeState === 3 && (
                <div>
                  <div className="card">
                    <Button
                      label="Click Here To view Content"
                      onClick={() => onClick("showModel")}
                    />
                    <div onClick={() => onHide("showModel")}>
                      <Dialog
                        header="Header"
                        visible={showModel}
                        style={{ width: "50vw" }}
                        onHide={() => onHide("showModel")}
                      >
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                        <br />
                        <br />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                        <br />
                        <br />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                        <br />
                        <br />
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                        <br />
                        <br />
                      </Dialog>
                    </div>
                  </div>
                  <div className="field-checkbox">
                    <Checkbox
                      inputId="binary"
                      checked={checked}
                      onChange={(e) => setChecked(e.checked)}
                    />
                    <label htmlFor="binary">
                      XiFi PDO Distributor Franchise Contract{" "}
                    </label>
                  </div>
                  <div className="field-checkbox">
                    <Checkbox
                      inputId="binary"
                      checked={checked1}
                      onChange={(e) => setChecked1(e.checked)}
                    />
                    <label htmlFor="binary">Terms & Conditions</label>
                  </div>
                  <div className="field-checkbox">
                    <Checkbox
                      inputId="binary"
                      checked={checked2}
                      onChange={(e) => setChecked2(e.checked)}
                    />
                    <label htmlFor="binary">Pricing Policy</label>
                  </div>
                  <div className="field-checkbox">
                    <Checkbox
                      inputId="binary"
                      checked={checked3}
                      onChange={(e) => setChecked3(e.checked)}
                    />
                    <label htmlFor="binary">Privacy Policy</label>
                  </div>
                  <div className="field-checkbox">
                    <Checkbox
                      inputId="binary"
                      checked={checked4}
                      onChange={(e) => setChecked4(e.checked)}
                    />
                    <label htmlFor="binary">Refund Policy</label>
                  </div>
                </div>
              )}

              {/* part 4 */}

              {activeState === 4 && (
                <div>
                  <FormikControl
                    control="input"
                    type="tel"
                    maxlength="12"
                    label="Aadhar Number"
                    name="aadhar_number"
                    placeholder="Aadhar Number"
                  />

                  <FormikControl
                    control="input"
                    type="tel"
                    maxlength="15"
                    label="Gst Number"
                    name="gst_number"
                    placeholder="Gst Number"
                  />
                </div>
              )}

              {activeState > 1 && (
                <button type="button" onClick={PriviousHandler}>
                  Previous
                </button>
              )}

              {activeState > 0 && activeState < 5 && (
                <button
                  disabled={isDisabled}
                  type="button"
                  onClick={NextHandler}
                >
                  next
                </button>
              )}

              {activeState === 5 && (
                <div>
                  <p>{FormValue?.firstname}</p>
                  <p>{FormValue?.middlename}</p>
                  <p>{FormValue?.lastname}</p>
                  <p>{FormValue?.email}</p>
                  <p>{FormValue?.password}</p>
                  <p>{FormValue?.confirm_password}</p>
                  <p>{FormValue?.companyname}</p>
                  <p>{FormValue?.address_line_1}</p>
                  <p>{FormValue?.address_line_2}</p>
                  <p>{FormValue?.city}</p>
                  <p>{FormValue?.state}</p>
                  <p>{FormValue?.pincode}</p>
                  <p>{FormValue?.aadhar_number}</p>
                  <p>{FormValue?.gst_number}</p>

                  <Reactcaptch />
                  <button
                    type="submit"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    Submit
                  </button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default XifiDemo;
